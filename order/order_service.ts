import {getUserInfoById, getWeChatUserInfo, updateUserInfo, WeChatInfo,} from "../user/user_service.ts";
import {query} from "../db.ts";
import {fetchMatchOrderList} from "./order_handler.ts";
import {sendOrderNotificationEmail} from "../utils/email.ts";
import {fetchMatchOrderInfo} from "./order_detail_service.ts";

/**
 * 订单状态枚举
 * @description 定义了订单在不同生命周期的状态
 */
export enum OrderStatus {
  /**
   * 订单支付超时
   */
  PaymentTimeout = 1,

  /**
   * 已取消
   */
  Cancelled = 4,

  /**
   * 已取消
   */
  PendingPayment = 5,

  /**
   * 已完成 (订单已交付并结款)
   */
  Completed = 8,
}

export enum OrderQueryStatus {
  /**
   * 查询待付款订单
   */
  PendingPayment = 2,

  /**
   * 查询已完成的订单 (可能对应于订单状态 Completed = 8)
   */
  Completed = 4,

  /**
   * 查询已失效的订单 (可能对应于订单状态 PaymentTimeout = 1 或 Cancelled = 4)
   */
  Invalid = 1,
  Invalid2 = 3,
}

// --- 函数：获取需要进行后台检查的用户列表 ---
// 假设你需要检查所有已绑定微信的用户，并获取他们的主要邮箱作为收件人
// 注意：这个函数的实现取决于你的用户和会员数据模型
async function getEligibleUsersForBackgroundCheck(): Promise<
  Array<{ weChatInfo: WeChatInfo; recipientEmail: string }>
> {
  const usersToNotify: Array<
    { weChatInfo: WeChatInfo; recipientEmail: string }
  > = [];

  try {
    const members = await query<{ id: number; email: string | null }>(
      "SELECT id, email FROM rs_member_info WHERE email IS NOT NULL and member_status='ACTIVE' and email_count>0", // 仅获取有邮箱的会员
      // 或者 "SELECT id, email FROM rs_member_info WHERE background_check_enabled = TRUE"
    );

    if (members.length === 0) {
      console.log("没有找到符合要求的会员");
      return [];
    }

    console.log(`找到 ${members.length} 个符合发送邮件提醒要求的会员.`);

    // 2. 为每个会员获取绑定的微信信息 (rs_wechat_info)
    for (const member of members) {
      const weChatInfos = await getWeChatUserInfo(member.id);

      if (weChatInfos && weChatInfos.length > 0) {
        // 一个会员可能绑定多个微信，检查所有绑定的微信
        for (const weChatInfo of weChatInfos) {
          usersToNotify.push({
            weChatInfo: weChatInfo,
            recipientEmail: member.email!, // 使用会员的邮箱作为收件人
          });
        }
      } else {
        console.log(`Member ID ${member.id} has no bound WeChat users.`);
      }
    }

    console.log(
      `Prepared ${usersToNotify.length} WeChat users for background check.`,
    );
    return usersToNotify;
  } catch (error) {
    console.error("Error fetching eligible users for background check:", error);
    return []; // 发生错误时返回空数组
  }
}

// --- 后台定时器管理 ---
let pendingOrderCheckTimer: number | undefined;
const CHECK_INTERVAL_MS = 60000; // 1分钟
// 启动定时器
async function startPendingOrderCheckTimer() {
  if (pendingOrderCheckTimer === undefined) {
    // 立即执行一次，然后每隔指定时间执行
    await runPeriodicPendingOrderCheck(); // 第一次立即执行
    pendingOrderCheckTimer = setInterval(() => {
      runPeriodicPendingOrderCheck();
    }, CHECK_INTERVAL_MS);
    console.log(
      `Started pending order check timer (interval: ${CHECK_INTERVAL_MS}ms).`,
    );
  }
}

if (Deno.env.get("DENO_ENV") !== "test") {
  startPendingOrderCheckTimer().then((r) => console.log("启动轮训订单任务"));
} else {
  console.log(
    "Running in test environment, skipping auto pending order check timer.",
  );
}

async function runPeriodicPendingOrderCheck() {
  console.log(
    `--- Starting periodic pending order check --- ${new Date().toISOString()}`,
  );
  try {
    // 1. 获取需要检查的用户列表
    const users = await getEligibleUsersForBackgroundCheck();

    if (users.length === 0) {
      console.log("No users found to check for pending orders.");
      return;
    }

    // 2. 为每个用户执行检查和通知逻辑
    // 使用 Promise.allSettled 来并行处理，即使某个用户的检查失败，也不会中断其他用户的检查
    const checkPromises = users.map((user) =>
      checkAndSendPendingOrdersForUser(user.weChatInfo, user.recipientEmail)
      // 添加 .catch() 如果你想处理每个用户的检查失败，Promise.allSettled 已经可以处理
    );

    // 等待所有用户的检查任务完成 (无论成功或失败)
    const results = await Promise.allSettled(checkPromises);

    // 可以选择遍历 results 查看每个任务的状态 (fulfilled 或 rejected)
    // results.forEach((result, index) => {
    //     if (result.status === 'rejected') {
    //         console.error(`Check for user ${users[index].weChatInfo.uid} failed:`, result.reason);
    //     }
    // });
  } catch (error) {
    console.error(
      "Error in main periodic pending order check function:",
      error,
    );
  } finally {
    console.log("--- Periodic pending order check finished ---");
  }
}

// --- 函数：检查单个用户的待支付订单并发送邮件 ---
async function checkAndSendPendingOrdersForUser(
  weChatInfo: WeChatInfo,
  recipientEmail: string,
) {
  console.log(
    `[Task] Checking pending orders for user (UID: ${weChatInfo.uid}, Member ID: ${weChatInfo.member_id})`,
  );

  if (!weChatInfo.uid || !weChatInfo.auth_token || !recipientEmail) {
    console.error(
      `[Task] Missing info for user (Member ID: ${weChatInfo.member_id}). Skipping check.`,
    );
    return;
  }

  const authHeader = `${weChatInfo.auth_token}`; // 假设需要 Bearer token 格式

  try {
    // 1. 查询待支付订单列表 (获取订单ID等基本信息)
    const pendingOrdersList = await fetchMatchOrderList(
      weChatInfo.uid,
      authHeader,
      OrderQueryStatus.PendingPayment,
    );

    if (pendingOrdersList.length > 0) {
      console.log(
        `[Task] User (UID: ${weChatInfo.uid}) found ${pendingOrdersList.length} pending order(s).`,
      );

      // 2. 为每个待支付订单获取详细信息
      const detailedOrderPromises = pendingOrdersList.map((order) =>
        fetchMatchOrderInfo(weChatInfo.uid, authHeader, order.id) // 使用 fetchMatchOrderInfo 获取详细信息
      );

      // 使用 Promise.allSettled 等待所有详细信息获取完成
      const detailedOrderResults = await Promise.allSettled(
        detailedOrderPromises,
      );

      // 3. 遍历详细信息结果，发送邮件
      for (const result of detailedOrderResults) {
        if (result.status === "fulfilled" && result.value !== null) {
          const detailedOrder = result.value;

          // !!! 在实际应用中，需要添加逻辑判断订单是否需要发送通知 (例如，是否已发送过，订单是否确实待支付，支付截止时间是否临近等) !!!
          // 避免重复发送或发送给已经支付的订单

          console.log(
            `[Task] User (UID: ${weChatInfo.uid}) fetched details for order: ${detailedOrder.order_id}. Constructing email.`,
          );

          // 构造账单项列表的 HTML
          let billsHtml = "<ul>";
          if (detailedOrder.bill && detailedOrder.bill.length > 0) {
            detailedOrder.bill.forEach((bill) => {
              billsHtml +=
                `<li><strong>名称:</strong> ${bill.name} (${bill.estateName}), <strong>区域ID:</strong> ${bill.region}, <strong>价格:</strong> ${bill.price}, <strong>持票人:</strong> ${bill.realname}</li>`;
            });
          } else {
            billsHtml += "<li>无详细账单项信息</li>";
          }
          billsHtml += "</ul>";

          const emailSubject = `待支付订单提醒: ${detailedOrder.order_id}`;
          const emailBodyHtml = `
                 <h2>待支付订单提醒</h2>
                 <p>您有一个订单待支付，详情如下：</p>
                 <ul>
                   <li><strong>订单号:</strong> ${detailedOrder.order_id}</li>
                   <li><strong>订单金额:</strong> ${detailedOrder.payable}</li>
                   <li><strong>订单状态码:</strong> ${detailedOrder.status}</li>
                   <li><strong>创建时间:</strong> ${detailedOrder.create_time}</li>
                   <li><strong>支付截止时间:</strong> ${detailedOrder.order_end_time}</li>
                   ${
            detailedOrder.match
              ? `<li><strong>比赛:</strong> ${detailedOrder.match.title} (${detailedOrder.match.s_date})</li>`
              : ""
          }
                 </ul>
                 <h3>账单明细:</h3>
                 ${billsHtml}
                 <p>请尽快完成支付。</p>
                 <p>此邮件为系统自动发送，请勿回复。</p>
               `;

          try {
            const memberInfo = await getUserInfoById(
              Number(weChatInfo.member_id),
            );
            if (!memberInfo) {
              console.error(
                `[Task] User (UID: ${weChatInfo.uid}) failed to fetch member info for member ID: ${weChatInfo.member_id}`,
              );
              return;
            }
            if (memberInfo.email_count <= 0) {
              console.log(
                `[Task] User (UID: ${weChatInfo.uid}) has no email count for member ID: ${weChatInfo.member_id}, count ${memberInfo.email_count}`,
              );
              return;
            }

            await sendOrderNotificationEmail(
              recipientEmail,
              emailSubject,
              emailBodyHtml,
            );
            memberInfo.email_count = memberInfo.email_count - 1;
            console.log(
              `发送邮件成功，剩余次数减一 ${memberInfo.id}| ${memberInfo.member_name}`,
            );
            await updateUserInfo(memberInfo);
            console.log(
              `[Task] User (UID: ${weChatInfo.uid}) sent notification email for order: ${detailedOrder.order_id} to ${recipientEmail}`,
            );
            // !!! 在实际应用中，你可能需要在这里更新订单状态或记录通知时间，避免重复发送 !!!
          } catch (emailError) {
            console.error(
              `[Task] User (UID: ${weChatInfo.uid}) failed to send email for order ${detailedOrder.order_id} to ${recipientEmail}: ${emailError}`,
            );
            // 继续处理下一个订单的邮件发送
          }
        } else if (result.status === "rejected") {
          console.error(
            `[Task] User (UID: ${weChatInfo.uid}) failed to fetch detailed info for one order:`,
            result.reason,
          );
        } else { // status is 'fulfilled' but value is null (fetchMatchOrderInfo returned null)
          console.warn(
            `[Task] User (UID: ${weChatInfo.uid}) fetched detailed info for one order, but data was null.`,
          );
        }
      }
    } else {
      console.log(
        `[Task] User (UID: ${weChatInfo.uid}) has no pending orders.`,
      );
    }
  } catch (error) {
    console.error(
      `[Task] Error during pending order check for user (UID: ${weChatInfo.uid}): ${error}`,
    );
  }
}
