import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import match from "./match/match_handler.ts";
import order_handler from "./order/order_handler.ts";
import user_handler from "./user/user_handler.ts";

const app = new Hono();
const root = new Hono();
root.route("/match", match);
root.route("/order", order_handler);
root.route("/member", user_handler);

app.use(logger());
app.use("*", cors());
app.route("/ticket-member", root);

Deno.serve(app.fetch);
