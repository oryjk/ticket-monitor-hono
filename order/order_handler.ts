import {Hono} from "hono";
import {sendOrderNotificationEmail} from "../utils/email.ts";
import {getUserInfo, getWeChatUserInfo} from "../user/user_service.ts";
import {OrderQueryStatus} from "./order_service.ts";

const order_handler = new Hono();

interface OrderInfo {
  order_id: string | number; // 根据实际API返回的类型来确定是 string 还是 number
  id: string | number;
  match_id: string | number;
  count_bill: number; // 假设是数字
  payable: number; // 假设是数字
  status: string;
  create_time: string; // 假设是字符串格式的时间
  // 如果还有其他字段，可以在这里添加
}

export async function fetchMatchOrderList(
  lid2: string | number,
  authHeader: string,
  orderQueryStatus: number, // 根据 Python 代码中的请求体结构，这里的 page 是当前页码
): Promise<OrderInfo[]> {
  console.log(
    `[Fetch] 正在请求匹配订单列表: ${lid2}，订单状态: ${
      OrderQueryStatus[orderQueryStatus]
    }`,
  );
  // 构建请求 URL
  const matchOrderUrl =
    `https://fccdn1.k4n.cc/fc/wx_api/v1/MatchOrder/matchOrderList?lid2=${lid2}`;

  // 构建请求头 Headers
  // 注意：Header 名称不区分大小写，但使用一致的命名规范是好的习惯。
  // 修复了 Python 代码中 Content-Type 的分隔符，从 ':' 改为 '='
  const matchOrderHeaders: HeadersInit = {
    "Host": "fccdn1.k4n.cc",
    "Connection": "keep-alive",
    "xweb_xhr": "1",
    "Authorization": authHeader,
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/6.8.0(0x16080000) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF MacWechat/3.8.10(0x13080a11) XWEB/1227",
    "Content-Type": "application/json;charset=utf-8",
    "Accept": "*/*", // 使用更标准的 Accept 头
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer":
      "https://servicewechat.com/wxffa42ecd6c0e693d/75/page-frame.html",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
  };

  // 构建请求体数据
  const matchOrderData = {
    page: {
      current: orderQueryStatus,
      currentPage: 1,
      pageSize: 6,
      status: "loading",
    },
  };

  try {
    console.log(
      `[Fetch] 正在请求匹配订单列表: ${matchOrderUrl}，页码: ${orderQueryStatus}`,
    );

    // 使用 Deno 的 fetch API 发送 POST 请求
    // 注意：Deno 的 fetch 默认会验证 SSL 证书。
    // Python 代码中使用了 `verify=False` (不安全)。
    // 如果需要复现该不安全行为，必须在运行 Deno 时加上 --no-check-certificate 标志：
    // `deno run --allow-net --no-check-certificate your_file.ts`
    // 我们这里默认使用安全的 SSL 验证。
    const matchOrderResponse = await fetch(matchOrderUrl, {
      method: "POST",
      headers: matchOrderHeaders,
      body: JSON.stringify(matchOrderData), // 请求体需要是 JSON 字符串
    });

    console.log(`[Fetch] 匹配订单列表响应状态码: ${matchOrderResponse.status}`);

    // 检查响应状态码是否为 2xx (OK)
    if (matchOrderResponse.ok) {
      // 解析 JSON 响应体
      const responseJson: any = await matchOrderResponse.json(); // 先用 any 方便访问未知结构

      // 检查响应中是否存在 'data' 字段且它是数组
      if (responseJson && Array.isArray(responseJson.data)) {
        // 遍历 'data' 数组，映射到 OrderInfo 结构
        const orderDataList: OrderInfo[] = responseJson.data.map((
          order: any,
        ) => ({
          order_id: order?.order_id ?? "N/A", // 使用可选链 ?. 和 空值合并 ?? 更安全地访问属性
          id: order?.id ?? "N/A",
          match_id: order?.match_id ?? "N/A",
          count_bill: order?.count_bill ?? 0, // 数字类型如果缺失，可以给默认值 0
          payable: order?.payable ?? 0,
          status: order?.status ?? "N/A",
          create_time: order?.create_time ?? "N/A",
          // 其他字段类似处理
        }));
        console.log(`[Fetch] 成功获取 ${orderDataList.length} 条订单信息.`);
        return orderDataList; // 返回处理后的列表
      } else {
        console.log("[Fetch] 响应中没有有效的 'data' 数组字段.");
        return []; // 根据 Python 示例，如果无数据或字段缺失，返回空数组
      }
    } else {
      // 处理非 2xx 的状态码
      const errorText = await matchOrderResponse.text(); // 获取响应体以便查看错误详情
      console.log(
        `[Fetch] 获取匹配订单列表失败: 状态码 ${matchOrderResponse.status}. 响应体: ${errorText}`,
      );
      return []; // 根据 Python 示例，非 2xx 状态码也返回空数组
    }
  } catch (error) {
    // 捕获网络错误或 fetch/json 解析错误
    console.error(`[Fetch] 请求匹配订单列表时发生错误: ${error}`);
    return []; // 根据 Python 示例，发生错误时返回 null
  }
}

order_handler.get("/orderList/:member_key/:status", async (c) => {
  const member_key = c.req.param("member_key");
  const status = c.req.param("status");
  if (!member_key) {
    return c.json({ msg: "输入参数不正确。" }, 200); // 500 Internal Server Error
  }

  const member_into = await getUserInfo(member_key);
  if (!member_into) {
    return c.json({ msg: "会员信息无效。" }, 200); // 500 Internal Server Error
  }

  let weChatInfos = await getWeChatUserInfo(member_into.id);
  if (!weChatInfos) {
    return c.json({ msg: "会员没有绑定任何微信用户。" }, 200); // 500 Internal Server Error
  }
  const orderPromises: Array<Promise<OrderInfo[]>> = weChatInfos.map(
    (weChatInfo) => {
      const orderList = fetchMatchOrderList(
        weChatInfo.uid,
        weChatInfo.auth_token,
        Number(status),
      );
      return orderList;
    },
  );

  const arrayOfOrderArrays: Array<OrderInfo[]> = await Promise.all(
    orderPromises,
  );

  return c.json(arrayOfOrderArrays); // Hono 默认返回 200 OK 状态码
});

order_handler.get("/sendEmail", async (c) => {
  try {
    await sendOrderNotificationEmail("oryjk@qq.com", "测试一下内容","");
    return c.json({ message: "邮件发送成功" }, 200);
  } catch (error) {
    console.error("邮件发送失败:", error);
    return c.json({ message: "邮件发送失败" }, 500);
  }
});

export default order_handler;
