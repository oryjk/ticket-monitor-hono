// 使用 Deno 兼容的 MySQL 客户端
import { Client as MySQLClient } from "https://deno.land/x/mysql@v2.12.1/mod.ts";
// 使用 Deno 兼容的 PostgreSQL 客户端
import { Client as PGClient } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

async function migrateData(
  mysqlConfig: {
    hostname: string;
    username: string;
    password: string;
    db: string;
    port: number;
  },
  postgresConfig: {
    hostname: string;
    user: string;
    password: string;
    database: string;
    port: number;
  },
  tableName: string,
) {
  // 创建MySQL连接
  const mysqlClient = new MySQLClient();
  await mysqlClient.connect(mysqlConfig);

  // 创建PostgreSQL连接
  const postgresClient = new PGClient(postgresConfig);
  await postgresClient.connect();

  try {
    // 从MySQL读取数据
    const rows = await mysqlClient.query(`SELECT * FROM ${tableName}`);

    // 如果有数据需要迁移
    if (Array.isArray(rows) && rows.length > 0) {
      // 获取列名
      const columns = Object.keys(rows[0]);
      const columnNames = columns.join(", ");
      const valuePlaceholders = columns.map((_, index) => `$${index + 1}`).join(
        ", ",
      );

      // 批量插入数据到PostgreSQL
      for (const row of rows) {
        const values = columns.map((column) => {
          // Handle null values and sanitize string values to ensure UTF-8 compatibility
          if (row[column] === null) {
            return null;
          }

          // Convert Buffer objects to hex strings
          if (
            row[column] instanceof Uint8Array ||
            (typeof row[column] === "object" &&
              row[column]?.buffer instanceof ArrayBuffer)
          ) {
            return `\\x${
              Array.from(new Uint8Array(row[column].buffer || row[column]))
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("")
            }`;
          }

          // 特别处理 is_current 字段，确保它作为数字/布尔值传递
          if (column === "is_current") {
            // 如果是空字符串但应该是数字，则转换为0
            if (row[column] === "") {
              return 0;
            }
            // 确保它是数字类型
            return Number(0);
          }

          // Sanitize strings to ensure UTF-8 compatibility
          if (typeof row[column] === "string") {
            // Replace null bytes and other problematic characters
            return row[column].replace(/\u0000/g, "");
          }

          return row[column];
        });
        await postgresClient.queryObject(
          `INSERT INTO ${tableName} (${columnNames}) VALUES (${valuePlaceholders})`,
          values,
        );
      }

      console.log(`成功迁移 ${rows.length} 条数据到 PostgreSQL`);
    }
  } catch (error) {
    console.error("数据迁移过程中发生错误:", error);
    throw error;
  } finally {
    // 关闭连接
    await mysqlClient.close();
    await postgresClient.end();
  }
}

// 使用示例
await migrateData(
  {
    hostname: "49.234.55.170",
    username: "root",
    password: "beifa888",
    db: "registration_system",
    port: 3306,
  },
  {
    hostname: "49.234.55.170",
    user: "admin",
    password: "beifa888",
    database: "ticket_cd",
    port: 5432,
  },
  "rs_match",
);
