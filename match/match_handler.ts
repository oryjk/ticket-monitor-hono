import {Hono} from "hono";
import {query} from "../db.ts";
import {match_info_json, match_list_json, region_json,} from "./match_default_data.ts";

interface MemberBinding {
  id: number;
  license: string;
  mac_address: string;
  created_at: Date;
}

interface Match {
  id: number;
  home_name: string;
  away_home: string;
  begin_date: Date;
  date: Date;
  is_current: boolean;
  match_id: string;
  round: number;
}

// 验证会员key是否存在
async function validateMemberKey(key: string): Promise<boolean> {
  const sql = `
      SELECT COUNT(*) as count
      FROM rs_member_info
      WHERE member_key = $1
    `;

  const rows = await query<{ count: number }>(sql, [key]);
  return rows[0]?.count > 0;
}

// 获取当前比赛
async function getCurrentMatch(): Promise<Match | null> {
  const sql = `
      SELECT *
      FROM rs_match
      WHERE is_current = true
      ORDER BY begin_date DESC 
      LIMIT 1
    `;

  const rows = await query<Match>(sql);
  return rows[0] || null;
}

// 获取当前比赛
async function getMatchList(): Promise<Match[] | null> {
  const sql = `
      SELECT *
      FROM rs_match
      ORDER BY begin_date DESC 
    `;

  const rows = await query<Match>(sql);
  return rows || null;
}

// 获取指定ID的比赛
async function getMatchById(id: number): Promise<Match | null> {
  const sql = `
      SELECT id, away_name, date, home_name, is_current, match_id, round, begin_date
      FROM rs_match
      WHERE id = $1
    `;

  const rows = await query<Match>(sql, [id]);
  return rows[0] || null;
}

const match = new Hono();

function customJSONStringify(obj: any): string {
  return JSON.stringify(
    obj,
    (key, value) => typeof value === "bigint" ? value.toString() : value,
  );
}

// 获取当前比赛
match.get("/current/:key", async (c) => {
  try {
    const key = c.req.param("key");
    console.log("key", key);

    // 验证会员key
    const isValidKey = await validateMemberKey(key);
    if (!isValidKey) {
      return c.json({ message: "无效的会员key" }, 400);
    }

    const currentMatch = await getCurrentMatch();

    if (!currentMatch) {
      return c.json({ message: "没有设置当前比赛" }, 404);
    }

    return new Response(customJSONStringify(currentMatch), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("获取当前比赛时出错:", error);
    return c.json({
      message: "服务器内部错误",
      error: Deno.env.get("ENVIRONMENT") === "development"
        ? (error instanceof Error ? error.message : String(error))
        : undefined,
    }, 500);
  }
});

// 获取当前比赛
match.get("/matchList", async (c) => {
  try {
    const matchList = await getMatchList();

    if (!matchList) {
      return c.json({ message: "查询不到比赛列表" }, 404);
    }

    return new Response(customJSONStringify(matchList), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("获取比赛列表出错:", error);
    return c.json({
      message: "服务器内部错误",
      error: Deno.env.get("ENVIRONMENT") === "development"
        ? (error instanceof Error ? error.message : String(error))
        : undefined,
    }, 500);
  }
});

// 获取指定ID的比赛
match.get("/:id", async (c) => {
  try {
    const id = parseInt(c.req.param("id"));

    if (isNaN(id)) {
      return c.json({ message: "无效的比赛ID" }, 400);
    }

    const matchData = await getMatchById(id);

    if (!matchData) {
      return c.json({ message: "比赛不存在" }, 404);
    }

    return c.json(matchData);
  } catch (error) {
    console.error("获取比赛详情时出错:", error);
    return c.json({ message: "服务器内部错误" }, 500);
  }
});

match.get("/default/matchList", async (c) => {
  try {
    return new Response(match_list_json, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("获取缺省比赛列表错误:", error);
    return c.json({
      message: "获取缺省比赛列表错误",
      error: Deno.env.get("ENVIRONMENT") === "development"
        ? (error instanceof Error ? error.message : String(error))
        : undefined,
    }, 500);
  }
});

match.get("/default/matchInfo", async (c) => {
  try {
    const lid2 = c.req.query("lid2") ?? "空";
    let currentMatch = await getCurrentMatch();
    let match = currentMatch ?? {
      match_id: "无法获取到当前比赛信息",
    };
    console.log("返回matchInfo的数据");
    return new Response(
      match_info_json(lid2, match.match_id),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("获取缺省比赛详情错误:", error);
    return c.json({
      message: "获取缺省比赛详情错误",
      error: Deno.env.get("ENVIRONMENT") === "development"
        ? (error instanceof Error ? error.message : String(error))
        : undefined,
    }, 500);
  }
});

// 获取当前比赛座位信息
match.get("/default/region", async (c) => {
  try {
    return new Response(
      region_json,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("获取比赛列表出错:", error);
    return c.json({
      message: "服务器内部错误",
      error: Deno.env.get("ENVIRONMENT") === "development"
        ? (error instanceof Error ? error.message : String(error))
        : undefined,
    }, 500);
  }
});

// 绑定会员信息
async function bindMember(
  license: string,
  macAddress: string,
): Promise<boolean> {
  // 首先检查 license 是否存在且状态为空
  const checkSql = `
      SELECT id
      FROM rs_member_info
      WHERE member_key = $1
        AND (member_status IS NULL OR member_status = '')
    `;

  try {
    const rows = await query(checkSql, [license]);
    if (rows.length === 0) {
      console.log("License not found or already bound");
      return false;
    }
    try {
      // 更新绑定信息和状态
      const updateSql = `
                UPDATE rs_member_info
                SET mac_address = $1,
                    member_status = 'ACTIVE'
                WHERE member_key = $2
                RETURNING id
            `;

      const rows = await query(updateSql, [macAddress, license]);
      return true;
    } catch (error) {
      throw error;
    } finally {
    }
  } catch (error) {
    console.error("绑定会员信息时出错:", error);
    return false;
  }
}

// 绑定会员
match.post("/bind_member", async (c) => {
  try {
    const body = await c.req.json();
    const { license, mac_address } = body;

    if (!license || !mac_address) {
      return c.json({ message: "缺少必要参数" }, 400);
    }

    const success = await bindMember(license, mac_address);

    if (!success) {
      return c.json({ message: "绑定失败" }, 500);
    }

    return c.json({ message: "绑定成功" });
  } catch (error) {
    console.error("处理会员绑定请求时出错:", error);
    return c.json({
      message: "服务器内部错误",
      error: Deno.env.get("ENVIRONMENT") === "development"
        ? (error instanceof Error ? error.message : String(error))
        : undefined,
    }, 500);
  }
});

export default match;
