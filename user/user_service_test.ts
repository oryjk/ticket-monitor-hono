import {assertEquals} from "jsr:@std/assert";
import {bindUser} from "./user_service.ts";
import {delay} from "https://deno.land/std@0.160.0/async/delay.ts";
import {closeDatabase} from "../db.ts";

Deno.test("simple test", async () => {
  let memberInfo = await bindUser("m01QctQ8", "xxxx", "xxxx");
  assertEquals(true, !memberInfo);
  delay(10000);
  await closeDatabase()
});
Deno.test("async test", async () => {
  const x = 1 + 2;
  await delay(100);
  assertEquals(x, 3);
});
