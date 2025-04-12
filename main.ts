import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import match from "./match/match_handler.ts";

const app = new Hono();

app.use(logger());
app.use("*", cors());
app.route("/match", match);

Deno.serve(app.fetch);
