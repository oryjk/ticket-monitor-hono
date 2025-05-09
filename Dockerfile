# 使用一个轻量级的 Linux 发行版作为基础镜像
# alpine 是一个不错的选择，非常小巧
FROM alpine:latest

# 设置工作目录
WORKDIR /app

# 将编译后的可执行文件复制到容器的 /app 目录
# 注意：这里是相对于 Docker 构建上下文的路径 (BUILD_DIR)
COPY ticket-monitor-hono /app/

# 使可执行文件可执行
RUN chmod +x /app/ticket-monitor-hono \
 ls -l /app/

# 如果你的 Deno 应用在容器内监听了端口，可以使用 EXPOSE 指令（可选，仅为文档目的）
# Dockerfile 中的 EXPOSE 并不会实际发布端口，只是声明
EXPOSE 8000

# 设置容器启动时运行的命令
CMD ["/app/ticket-monitor-hono"]
