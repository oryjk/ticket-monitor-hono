# 球票监控手机端前端


```
deno task start
```

### 创建数据库

```
docker run --name postgres-db \
  -e POSTGRES_PASSWORD=beifa888 \
  -e POSTGRES_USER=admin \
  -e POSTGRES_DB=myapp \
  -p 5432:5432 \
  -v postgres-data:/var/lib/postgresql/data \
  -d postgres:14deno task create-db
```
