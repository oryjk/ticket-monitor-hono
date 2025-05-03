import nodemailer from "npm:nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.qq.com", // 你的 SMTP 服务器地址
  port: 587, // 你的 SMTP 端口，通常是 587 (带 STARTTLS) 或 465 (带 SSL)
  secure: false, // true for 465, false for other ports
  auth: {
    user: "oryjk@qq.com", // 你的 SMTP 用户名 (通常是邮箱地址)
    pass: "icwinvjvnmdwbadf", // 你的 SMTP 密码
  },
  // 可选：配置 TLS，特别是如果 secure: false 的话
  // tls: {
  //   rejectUnauthorized: false // 如果是自签名证书等情况，可能需要设置为 false (不安全)
  // }
});

export async function sendOrderNotificationEmail(
  recipientEmail: string,
  subject: string,
  emailBodyHtml: string,
): Promise<void> {
  try {
    console.log("开始发送邮件");
    const mailOptions = {
      from: "oryjk@qq.com", // 发件人地址
      to: recipientEmail, // 收件人列表 (可以是字符串或数组)
      subject: subject, // 主题
      html: emailBodyHtml, // HTML 正文 (可选)
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("邮件发送成功: %s", info.messageId);
  } catch (error) {
    console.error("[Email] 发送邮件失败:", error);
    // 发送邮件失败通常不应导致主 API 请求失败，所以这里只打印错误。
  }
}
