import { Hono } from "hono";
import { query } from "../db.ts";

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

    const rows = await query<{count: number}>(sql, [key]);
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
    return JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value
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

export default match;
