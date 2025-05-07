// db.ts
import { Pool, PoolClient } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { load } from "https://deno.land/std@0.177.0/dotenv/mod.ts";

const envConfig = await load();
// 从环境变量获取配置，或使用默认值
const POOL_CONNECTIONS = 20;
const DB_USER = Deno.env.get("DB_USER") || envConfig["DB_USER"] ||
  "your_username";
const DB_HOST = Deno.env.get("DB_HOST") || envConfig["DB_HOST"] || "localhost";
const DB_NAME = Deno.env.get("DB_NAME") || envConfig["DB_NAME"] ||
  "your_database";
const DB_PASSWORD = Deno.env.get("DB_PASSWORD") || envConfig["DB_PASSWORD"] ||
  "your_password";
const DB_PORT = parseInt(
  Deno.env.get("DB_PORT") || envConfig["DB_PORT"] || "5432",
);

let healthCheckTimer: number | undefined;
// 创建数据库连接池
const pool = new Pool({
  user: DB_USER,
  database: DB_NAME,
  hostname: DB_HOST,
  port: DB_PORT,
  password: DB_PASSWORD,
}, POOL_CONNECTIONS);

// 健康检查函数
async function checkDatabaseConnection(): Promise<boolean> {
  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
    const result = await client.queryObject`SELECT 1 as check`;
    console.log("Database connection is healthy");
    return true;
  } catch (err) {
    console.error("Database connection check failed:", err);
    return false;
  } finally {
    if (client) {
      client.release();
    }
  }
}

// 封装执行查询的函数
async function query<T>(text: string, params: any[] = []): Promise<T[]> {
  const client = await pool.connect();
  try {
    // 使用 Deno Postgres 的查询方式
    const result = await client.queryObject<T>(text, params);
    return result.rows;
  } finally {
    client.release();
  }
}

// 封装事务执行函数
async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.queryObject`BEGIN`;
    const result = await callback(client);
    await client.queryObject`COMMIT`;
    return result;
  } catch (e) {
    await client.queryObject`ROLLBACK`;
    throw e;
  } finally {
    client.release();
  }
}

// // 定期检查数据库连接
// setInterval(() => {
//   checkDatabaseConnection().catch(console.error);
// }, 5000);

// 新增函数：启动健康检查定时器
function startHealthCheck() {
  // 避免重复启动
  if (healthCheckTimer === undefined) {
    healthCheckTimer = setInterval(() => {
      checkDatabaseConnection().catch(console.error);
    }, 60000);
    console.log("Database health check timer started.");
  }
}

// 新增函数：停止健康检查定时器
function stopHealthCheck() {
  if (healthCheckTimer !== undefined) {
    clearInterval(healthCheckTimer);
    healthCheckTimer = undefined; // 重置 ID
    console.log("Database health check timer stopped.");
  }
}

// 新增函数：关闭连接池及清理资源
async function closeDatabase() {
  console.log("Closing database pool...");
  stopHealthCheck()
  await pool.end(); // 调用 pool.end() 来关闭所有连接，这是一个异步操作，需要 await
  console.log("Database pool closed.");
}
if (Deno.env.get("DENO_ENV") !== "test") {
  startHealthCheck();
} else {
  console.log("Running in test environment, skipping auto health check.");
}

export { startHealthCheck,stopHealthCheck,closeDatabase, pool, query, transaction };
