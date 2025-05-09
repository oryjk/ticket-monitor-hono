import {Hono} from "hono";
import {bindUser, getUserInfo, saveWeChatUser} from "./user_service.ts";

const user_handler = new Hono();

user_handler.post("/bind", async (c) => {
  const body = await c.req.json();
  const { member_key, phone, email, member_name } = body;
  try {
    const memberInfo = await bindUser(member_key, phone, email, member_name);

    if (memberInfo) {
      return c.json(memberInfo); // Hono 默认返回 200 OK 状态码
    } else {
      return c.json({ msg: "绑定用户信息失败。" }, 200); // 500 Internal Server Error
    }
  } catch (error) {
    console.error("绑定用户信息失败:", error);
    console.error("[API] 处理 /member/bind 请求时发生内部错误:", error);
    return c.json({ error: "内部服务器错误处理请求。" }, 500); // 500 Internal Server Error
  }
});

user_handler.post("/info", async (c) => {
  const body = await c.req.json();
  const { uid, auth_token, member_id, realname } = body;
  try {
    const weChatInfo = await saveWeChatUser(
      uid,
      auth_token,
      member_id,
      realname,
    );

    if (weChatInfo) {
      return c.json(weChatInfo); // Hono 默认返回 200 OK 状态码
    } else {
      return c.json({ msg: "录入用户信息失败，无效的member_id。" }, 200); // 500 Internal Server Error
    }
  } catch (error) {
    console.error("绑定用户信息失败:", error);
    console.error("[API] 处理 /member/bind 请求时发生内部错误:", error);
    return c.json({ error: "内部服务器错误处理请求。" }, 500); // 500 Internal Server Error
  }
});

user_handler.get("/info/:member_key", async (c) => {
  const member_key = c.req.param("member_key");
  if (!member_key) {
    return c.json({ msg: "输入参数不正确。" }, 200); // 500 Internal Server Error
  }

  const member_into = await getUserInfo(member_key);
  if (!member_into) {
    return c.json({ msg: "会员信息无效。" }, 200); // 500 Internal Server Error
  }
  try {
    return c.json(member_into); // Hono 默认返回 200 OK 状态码
  } catch (error) {
    console.error("查询用户信息失败:", error);
    console.error(
      "[API] 处理 /member/info/:member_key 请求时发生内部错误:",
      error,
    );
    return c.json({ error: "内部服务器错误处理请求。" }, 500); // 500 Internal Server Error
  }
});

export default user_handler;
