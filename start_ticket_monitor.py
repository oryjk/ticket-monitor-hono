#!/usr/bin/env python3

import argparse
import os
import shutil  # 用于复制文件
import subprocess
import sys

# --- 配置变量 ---
GIT_REPO_URL = "git@github.com:oryjk/ticket-monitor-hono.git"  # <<< 替换为你的 Git 仓库地址 <<<
LOCAL_REPO_PATH = "/home/ubuntu/projects/ticket-monitor-hono"  # 本地存放代码的目录
APP_ENTRY_POINT = "main.ts"  # 你的 Deno 入口文件
COMPILED_EXECUTABLE_NAME = "ticket-monitor-hono"  # 编译后的可执行文件名称
BUILD_DIR = "/home/ubuntu/projects/ticket-monitor-hono/build"  # 用于存放编译结果和 Dockerfile 的目录
DOCKERFILE_NAME = "Dockerfile"  # Dockerfile 的文件名
DOCKER_IMAGE_NAME = "ticket-monitor-hono"  # Docker 镜像名称
DOCKER_CONTAINER_NAME = "ticket-monitor-hono"  # Docker 容器名称

# 端口映射列表，格式为 ['HOST_PORT:CONTAINER_PORT']
# 你的 Deno 应用在容器内监听 8000 端口，并希望在宿主机映射到 8000
DOCKER_PORTS = ["8000:8000"]

# 需要传递给容器的环境变量
ENV_VARS = {
    "DB_USER": "admin",  # <<< 替换为你的数据库用户名 <<<
    "DB_PASSWORD": "beifa888",  # <<< 替换为你的数据库密码 <<<
    "DB_HOST": "127.0.0.1",  # <<< 替换为你的数据库主机 <<<
    "DB_NAME": "ticket_cd",  # <<< 替换为你的数据库名 <<<
    "DB_PORT": "5432",  # <<< 替换为你的数据库端口 <<<
}

# Deno 编译命令的基础部分
DENO_COMPILE_BASE_CMD = [
    "deno", "compile",
    "--allow-net",
    "--allow-env",
    "--allow-sys",
    "--allow-read",  # 保持 --allow-read，如果你的应用需要读取文件（例如证书、配置文件等）
    "--target", "x86_64-unknown-linux-gnu"
    # 如果你的应用还需要写文件、执行子进程等权限，请添加 --allow-write, --allow-run 等
]


# --- 结束配置 ---


def check_docker_dependency():
    """检查是否安装了 docker 命令"""
    print("检查 Docker 依赖...")
    try:
        subprocess.run(["docker", "--version"], check=True, capture_output=True)
        print("Docker 命令找到。")
    except FileNotFoundError:
        print("错误：未找到 docker 命令。请确保已安装 Docker。")
        sys.exit(1)
    except Exception as e:
        print(f"检查 docker 命令时发生错误: {e}")
        sys.exit(1)


def run_command(command_parts, cwd=None, check=True, capture_output=True):
    """运行 shell 命令列表，并可选择检查退出代码和捕获输出"""
    command_str = ' '.join(command_parts)
    cwd_info = f"(在目录: {cwd or os.getcwd()})"
    print(f"正在执行命令: {command_str} {cwd_info}")

    try:
        result = subprocess.run(
            command_parts,
            cwd=cwd,
            check=check,  # 如果 check=True, 非零退出码会抛出 CalledProcessError
            capture_output=capture_output,
            text=True,  # 将 stdout 和 stderr 作为字符串而不是 bytes
        )
        if capture_output:
            print("--- 命令输出 ---")
            print(result.stdout)
            if result.stderr:
                print("--- 错误输出 ---")
                print(result.stderr)
            print("--- 命令结束 ---")
        return result
    except subprocess.CalledProcessError as e:
        print(f"命令执行失败: {command_str}", file=sys.stderr)
        print(f"错误码: {e.returncode}", file=sys.stderr)
        if capture_output:
            print("--- 标准输出 ---", file=sys.stderr)
            print(e.stdout, file=sys.stderr)
            print("--- 标准错误 ---", file=sys.stderr)
            print(e.stderr, file=sys.stderr)
        sys.exit(1)  # 退出脚本，表示失败
    except FileNotFoundError:
        print(f"错误: 命令 '{command_parts[0]}' 未找到. 请确保它已安装并添加到 PATH。", file=sys.stderr)
        sys.exit(1)  # 退出脚本，表示失败
    except Exception as e:
        print(f"执行命令时发生意外错误: {e}", file=sys.stderr)
        sys.exit(1)  # 退出脚本，表示失败


def pull_code():
    """拉取或克隆 Git 仓库"""
    print("\n--- 执行: 拉取最新代码 ---")
    if os.path.exists(LOCAL_REPO_PATH):
        print(f"本地代码目录 '{LOCAL_REPO_PATH}' 已存在，执行 git pull...")
        run_command(["git", "pull"], cwd=LOCAL_REPO_PATH)
    else:
        print(f"本地代码目录 '{LOCAL_REPO_PATH}' 不存在，执行 git clone...")
        # 确保父目录存在
        os.makedirs(os.path.dirname(LOCAL_REPO_PATH), exist_ok=True)
        run_command(["git", "clone", GIT_REPO_URL, LOCAL_REPO_PATH])
    print("--- 代码拉取完成 ---")


def compile_deno():
    """编译 Deno 应用并创建 Dockerfile"""
    print("\n--- 执行: 编译 Deno 应用 ---")
    if not os.path.exists(LOCAL_REPO_PATH):
        print(f"错误: 代码目录 '{LOCAL_REPO_PATH}' 不存在。请先拉取代码。", file=sys.stderr)
        sys.exit(1)

    # 确保构建目录存在并清空（保留构建目录本身）
    if os.path.exists(BUILD_DIR):
        print(f"清空构建目录 '{BUILD_DIR}' 内容...")
        for item in os.listdir(BUILD_DIR):
            item_path = os.path.join(BUILD_DIR, item)
            if os.path.isfile(item_path):
                os.remove(item_path)
            elif os.path.isdir(item_path):
                shutil.rmtree(item_path)
    else:
        print(f"创建构建目录 '{BUILD_DIR}'...")
        os.makedirs(BUILD_DIR, exist_ok=True)

    # 构建完整的 Deno 编译命令
    # 将输出文件放到构建目录
    compiled_output_path = os.path.join(BUILD_DIR, COMPILED_EXECUTABLE_NAME)
    compile_cmd = DENO_COMPILE_BASE_CMD + ["--output", compiled_output_path] + [APP_ENTRY_POINT]

    # 在代码目录中执行编译命令
    run_command(compile_cmd, cwd=LOCAL_REPO_PATH)

    # 检查编译后的文件是否存在
    if not os.path.exists(compiled_output_path):
        print(f"错误: Deno 编译输出文件 '{compiled_output_path}' 未找到。", file=sys.stderr)
        sys.exit(1)
    print(f"--- Deno 编译完成，输出到 '{compiled_output_path}' ---")

    # 创建 Dockerfile
    dockerfile_content = f"""
# 使用一个轻量级的 Linux 发行版作为基础镜像
# alpine 是一个不错的选择，非常小巧
FROM alpine:latest

# 设置工作目录
WORKDIR /app

# 将编译后的可执行文件复制到容器的 /app 目录
# 注意：这里是相对于 Docker 构建上下文的路径
COPY {COMPILED_EXECUTABLE_NAME} /app/

# 使可执行文件可执行
RUN chmod +x /app/{COMPILED_EXECUTABLE_NAME}

# 如果你的 Deno 应用在容器内监听了端口，可以使用 EXPOSE 指令（可选，仅为文档目的）
# Dockerfile 中的 EXPOSE 并不会实际发布端口，只是声明
# EXPOSE 8000

# 设置容器启动时运行的命令
CMD ["/app/{COMPILED_EXECUTABLE_NAME}"]
"""
    dockerfile_path = os.path.join(BUILD_DIR, DOCKERFILE_NAME)
    with open(dockerfile_path, "w") as f:
        f.write(dockerfile_content.strip())  # strip() 去掉开头和结尾的空白行
    print(f"Dockerfile 已创建在 '{dockerfile_path}'")
    print("--- 编译和 Dockerfile 创建完成 ---")


def build_docker_image():
    """构建 Docker 镜像"""
    print(f"\n--- 执行: 构建 Docker 镜像 '{DOCKER_IMAGE_NAME}' ---")
    dockerfile_path = os.path.join(BUILD_DIR, DOCKERFILE_NAME)
    if not os.path.exists(dockerfile_path):
        print(f"错误: Dockerfile '{dockerfile_path}' 不存在。请先执行编译步骤。", file=sys.stderr)
        sys.exit(1)

    # Docker build 命令的上下文是 BUILD_DIR
    # -t 标签
    # -f 指定 Dockerfile 路径 (相对于上下文 BUILD_DIR 外的路径)
    # 最后一个参数是构建上下文路径
    run_command(["docker", "build", "-t", DOCKER_IMAGE_NAME, "-f", dockerfile_path, BUILD_DIR])
    print(f"--- Docker 镜像 '{DOCKER_IMAGE_NAME}' 构建完成 ---")


def stop_docker_container():
    """停止 Docker 容器"""
    print(f"\n--- 执行: 停止 Docker 容器 '{DOCKER_CONTAINER_NAME}' ---")
    # 检查容器是否存在或正在运行
    check_cmd = ["docker", "inspect", DOCKER_CONTAINER_NAME]
    # 使用 check=False 捕获 inspect 命令的非零退出码 (表示容器不存在)
    result = run_command(check_cmd, check=False, capture_output=True)

    if result and result.returncode == 0:  # 容器存在
        print(f"容器 '{DOCKER_CONTAINER_NAME}' 存在，尝试停止...")
        stop_cmd = ["docker", "stop", DOCKER_CONTAINER_NAME]
        # 使用 check=False，因为如果容器已经停止，docker stop 会返回非零，我们不希望脚本失败
        run_command(stop_cmd, check=False, capture_output=True)
        print(f"--- 容器 '{DOCKER_CONTAINER_NAME}' 已停止 (如果它正在运行) ---")
    else:
        print(f"容器 '{DOCKER_CONTAINER_NAME}' 不存在或未运行，无需停止。")


def remove_docker_container():
    """移除 Docker 容器"""
    print(f"\n--- 执行: 移除 Docker 容器 '{DOCKER_CONTAINER_NAME}' ---")
    # 检查容器是否存在
    check_cmd = ["docker", "inspect", DOCKER_CONTAINER_NAME]
    # 使用 check=False 捕获 inspect 命令的非零退出码 (表示容器不存在)
    result = run_command(check_cmd, check=False, capture_output=True)

    if result and result.returncode == 0:  # 容器存在
        print(f"容器 '{DOCKER_CONTAINER_NAME}' 存在，尝试移除...")
        remove_cmd = ["docker", "rm", DOCKER_CONTAINER_NAME]
        # 使用 check=False，因为如果容器不存在，docker rm 会返回非零，我们不希望脚本失败
        run_command(remove_cmd, check=False, capture_output=True)
        print(f"--- 容器 '{DOCKER_CONTAINER_NAME}' 已移除 (如果它存在) ---")
    else:
        print(f"容器 '{DOCKER_CONTAINER_NAME}' 不存在，无需移除。")


def start_docker_container():
    """启动 Docker 容器，并传递环境变量和端口映射"""
    print(f"\n--- 执行: 启动 Docker 容器 '{DOCKER_CONTAINER_NAME}' ---")

    # 构建 docker run 命令
    run_cmd = ["docker", "run", "-d", "--name", DOCKER_CONTAINER_NAME]

    # 添加端口映射
    for port_map in DOCKER_PORTS:
        run_cmd.extend(["-p", port_map])
    print(f"添加端口映射: {', '.join(DOCKER_PORTS)}")

    # 添加环境变量
    for key, value in ENV_VARS.items():
        run_cmd.extend(["-e", f"{key}={value}"])
    print(f"添加环境变量: {', '.join(ENV_VARS.keys())}")

    # 添加镜像名称
    run_cmd.append(DOCKER_IMAGE_NAME)

    run_command(run_cmd)
    print(f"--- Docker 容器 '{DOCKER_CONTAINER_NAME}' 已启动 ---")


def build_action():
    """执行拉取代码、编译和构建镜像的动作"""
    print("\n--- 动作: build ---")
    pull_code()
    compile_deno()
    build_docker_image()
    print("--- 动作 'build' 完成 ---")


def stop_action():
    """执行停止和移除容器的动作"""
    print("\n--- 动作: stop ---")
    stop_docker_container()
    remove_docker_container()
    print("--- 动作 'stop' 完成 ---")


def start_action():
    """执行启动容器的动作"""
    print("\n--- 动作: start ---")
    start_docker_container()
    print("--- 动作 'start' 完成 ---")


def redeploy_action():
    """执行完整的重新部署流程"""
    print("\n--- 动作: redeploy (build -> stop -> start) ---")
    check_docker_dependency()  # 检查 Docker 依赖
    build_action()  # 拉取、编译、构建镜像
    stop_action()  # 停止并移除旧容器
    start_action()  # 启动新容器
    print("\n--- 动作 'redeploy' 完成 ---")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="管理 Deno 应用的 Docker 容器生命周期：拉取、编译、构建镜像、停止、启动、重新部署。")
    parser.add_argument(
        "action",
        choices=["build", "start", "stop", "redeploy"],
        help="要执行的动作: 'build' (拉取/编译/构建镜像), 'start' (启动容器), 'stop' (停止/移除容器), 'redeploy' (build -> stop -> start)."
    )

    args = parser.parse_args()

    # 对于需要 Docker 的动作，先检查 Docker 依赖
    if args.action in ["build", "start", "stop", "redeploy"]:
        check_docker_dependency()

        # 检查是否有命令行参数（sys.argv[0] 是脚本本身的名字）
    if len(sys.argv) == 1:
        print("未指定动作，执行默认动作: redeploy")
        redeploy_action()
    elif args.action == "build":
        build_action()
    elif args.action == "start":
        start_action()
    elif args.action == "stop":
        stop_action()
    elif args.action == "redeploy":
        redeploy_action()

    sys.exit(0)  # 脚本成功完成
