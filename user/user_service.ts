import {query} from "../db.ts";

interface MemberInfo {
  id: number;
  member_key: string;
  member_status: string;
  member_name: string;
  description: string;
  phone: string;
  email: string;
  mac_address: string;
  create_time: Date;
  email_count: number;
}

export async function bindUser(
  member_key: string,
  phone: string,
  email: string,
  member_name: any,
): Promise<MemberInfo | null> {
  const sql = `
      SELECT id, phone, member_key
      FROM rs_member_info
      WHERE member_key = $1
    `;

  const rows = await query<MemberInfo>(sql, [member_key]);
  if (rows.length != 1) {
    return null;
  }
  let memberInfo = rows[0];
  if (!memberInfo.phone) {
    const sql = `
      UPDATE rs_member_info
      SET phone = $1,
          email=$2,
          member_status=$3,
          member_name=$4
      WHERE id = $5
    `;
    await query(sql, [phone, email, "ACTIVE", member_name, memberInfo.id]);
  }

  return (await query<MemberInfo>(sql, [member_key]))[0];
}

export async function updateUserInfo(
  memberInfo: MemberInfo,
): Promise<void> {
  const sql = `
    UPDATE rs_member_info
    SET email_count = $1
    WHERE id = $2
  `;
  await query(sql, [memberInfo.email_count, memberInfo.id]);
}

export async function getUserInfo(
  member_key: string,
): Promise<MemberInfo | null> {
  const sql = `
      SELECT id, phone, member_key, email, email_count, member_name
      FROM rs_member_info
      WHERE member_key = $1
  `;

  const rows = await query<MemberInfo>(sql, [member_key]);
  if (rows.length != 1) {
    return null;
  }
  return rows[0];
}

export async function getUserInfoById(
  id: number,
): Promise<MemberInfo | null> {
  const sql = `
      SELECT id, phone, member_key, email, email_count, member_name
      FROM rs_member_info
      WHERE id = $1
  `;

  const rows = await query<MemberInfo>(sql, [id]);
  if (rows.length != 1) {
    return null;
  }
  return rows[0];
}

export interface WeChatInfo {
  uid: number;
  auth_token: string;
  member_id: number;
  realname: string;
  create_at: Date;
  update_at: Date;
}
export async function saveWeChatUser(
  uid: number,
  auth_token: string,
  member_id: number,
  realname: string,
): Promise<WeChatInfo | null> {
  const sql = `
      SELECT uid, auth_token, member_id, update_at
      FROM rs_wechat_info
      WHERE uid = $1
        and member_id = $2
  `;

  const rows = await query<WeChatInfo>(sql, [uid, member_id]);
  if (rows.length != 0) {
    console.log(`已经绑定过了，准备更新用户 ${uid} ${realname}`);
  }
  const insert_sql =
    `insert into rs_wechat_info(uid, auth_token, member_id, realname, create_at, update_at)
     values ($1, $2, $3, $4,  NOW()::TIMESTAMP(0), NOW()::TIMESTAMP(0)) ON CONFLICT (uid)
      DO
    UPDATE SET
        auth_token = EXCLUDED.auth_token, -- 使用新提供的值更新 auth_token
        realname = EXCLUDED.realname, -- 使用新提供的值更新 realname
        member_id = EXCLUDED.member_id,
        update_at = NOW()::TIMESTAMP(0)
    `;
   await query<WeChatInfo>(insert_sql, [
    uid,
    auth_token,
    member_id,
    realname
  ]);


  const newRows = await query<WeChatInfo>(sql, [uid, member_id]);
  console.log(`保存用户 ${uid} ${realname} ${newRows[0].update_at}成功`);
  return newRows[0];
}

export async function getWeChatUserInfo(
  member_id: number,
): Promise<WeChatInfo[] | null> {
  const sql = `
    SELECT uid, auth_token, member_id
    FROM rs_wechat_info
    WHERE member_id = $1
  `;

  const rows = await query<WeChatInfo>(sql, [member_id]);
  if (rows.length != 1) {
    return null;
  }
  return rows;
}
