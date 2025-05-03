interface DetailedBillInfo {
  id: string | number;
  no: string; // 账单编号
  price: string; // 单价，根据示例是字符串
  status: number; // 账单项状态
  region: number; // 区域ID，根据示例是数字
  estate: number; // 票档ID
  row: number; // 行号
  seat: number; // 座位号
  realname: string; // 真实姓名
  phone: string; // 手机号
  real_card_id: string; // 身份证号
  estateName: string; // 票档名称
  name: string; // 可能是区域名称或票档分组名称，根据示例是字符串 "VIP"
  // ... 其他可能的字段
}

// 新接口：详细订单信息
interface DetailedOrderInfo {
  id: string | number; // 订单的内部ID
  order_id: string | number; // 订单号
  create_time: string; // 订单创建时间
  order_end_time: string; // 订单结束时间（支付截止时间）
  payable: string; // 应付金额，根据示例是字符串
  payed: string; // 已付金额
  count_bill: number; // 账单项数量
  status: number; // 订单状态
  refund: string; // 退款金额
  pay_type: string | null; // 支付方式
  match_id: string | number; // 匹配ID
  pay_time: string | null; // 支付时间
  useShare: boolean; // 是否使用了分享
  info: Array<{ id: number; bill_ids: number[] }>; // 订单项信息
  match: { // 比赛详情
    id: number;
    team1_name: string;
    team2_name: string;
    time_s: number; // Unix 时间戳
    address_name: string; // 场馆名称
    title: string; // 比赛标题
    address: string; // 场馆地址
    s_date: string; // 格式化后的比赛日期时间字符串 "2025年05月05日 星期一 13:35"
    // ... 其他 match 字段
  };
  isAdminOrder: boolean;
  bill: DetailedBillInfo[]; // <--- 账单项数组，使用新定义的接口
  tuiBill: any[]; // 退款账单项
  // ... 其他可能的字段
}

// 新函数：获取单个详细订单信息
export async function fetchMatchOrderInfo(
  uid: string | number, // 用户ID (对应 lid2)
  authHeader: string, // 认证头
  orderId: string | number, // 需要查询详细信息的订单ID
): Promise<DetailedOrderInfo | null> {
  console.log(
    `[Fetch] Requesting detailed info for order: ${orderId}, user: ${uid}`,
  );

  const detailOrderUrl =
    `https://fccdn1.k4n.cc/fc/wx_api/v1/MatchOrder/getMatchOrderInfo?lid2=${uid}`;

  // Headers (与 fetchMatchOrderList 相同)
  const detailOrderHeaders: HeadersInit = {
    "Host": "fccdn1.k4n.cc",
    "Connection": "keep-alive",
    "xweb_xhr": "1",
    "Authorization": authHeader, // <--- 使用传入的认证头
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 MicroMessenger/6.8.0(0x16080000) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF MacWechat/3.8.10(0x13080a11) XWEB/1227",
    "Content-Type": "application/json;charset=utf-8",
    "Accept": "*/*",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer":
      "https://servicewechat.com/wxffa42ecd6c0e693d/75/page-frame.html",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9",
  };

  // Request Body (需要订单ID，且根据示例是字符串)
  const detailOrderData = {
    id: String(orderId), // 确保是字符串
  };

  try {
    console.log(`[Fetch] Detail Request URL: ${detailOrderUrl}`);
    // console.log(`[Fetch] Detail Request Body: ${JSON.stringify(detailOrderData)}`); // 避免打印敏感数据

    const response = await fetch(detailOrderUrl, {
      method: "POST",
      headers: detailOrderHeaders,
      body: JSON.stringify(detailOrderData),
    });

    console.log(
      `[Fetch] Detail Response Status for order ${orderId}: ${response.status}`,
    );

    if (response.ok) {
      const responseJson: any = await response.json();

      // 检查 API 返回的 code 和 data 字段
      if (responseJson?.code === 1 && responseJson?.data) { // 假设 code 1 是成功
        console.log(
          `[Fetch] Successfully fetched details for order ${orderId}.`,
        );
        // 可以直接返回 data 部分，因为它符合 DetailedOrderInfo 接口（如果接口完整定义了所有字段）
        // 或者手动映射需要的字段以确保类型安全
        const detailedOrder: DetailedOrderInfo = responseJson
          .data as DetailedOrderInfo; // 简单断言，更严格可以手动映射
        return detailedOrder;
      } else {
        console.warn(
          `[Fetch] API returned error code ${responseJson?.code} or missing data for order ${orderId}. Msg: ${responseJson?.msg}`,
        );
        //console.warn("Full Response:", responseJson); // 调试时可以打印完整响应
        return null;
      }
    } else {
      const errorText = await response.text();
      console.error(
        `[Fetch] Failed to fetch detailed order info for ${orderId}: Status ${response.status}. Response Body: ${errorText}`,
      );
      return null;
    }
  } catch (error) {
    console.error(
      `[Fetch] Error requesting detailed order info for ${orderId}: ${error}`,
    );
    return null;
  }
}
