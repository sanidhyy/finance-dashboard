import { Hono } from "hono";

import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";

const app = new Hono().get("/", async (ctx) => {
  const data = await db
    .select({
      id: accounts.id,
      name: accounts.name,
    })
    .from(accounts);

  return ctx.json({ data });
});

export default app;
