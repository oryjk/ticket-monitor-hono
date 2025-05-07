import {Hono} from "hono";
import {logger} from "hono/logger";
import {cors} from "hono/cors";
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
app.use(async (c, next) => {
  console.log("middleware 3 start");
  console.log("Received URL:", c.req.url)
  console.log("All query parameters detected by Hono:", c.req.query());
  const license_key = c.req.query("licence_key");
  if (license_key) {
    await next();
    console.log("middleware 3 end");
    return;
  }
  return c.text("licence_key miss", 403);
});

app.route("/ticket-member", root);

Deno.serve(app.fetch);
