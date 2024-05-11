import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";

const app = new Hono().get("/", clerkMiddleware(), async (ctx) => {
  const auth = getAuth(ctx);

  if (!auth?.userId) {
    throw new HTTPException(401, {
      res: ctx.json({ error: "Unauthorized." }, 401),
    });
  }

  const data = await db
    .select({
      id: accounts.id,
      name: accounts.name,
    })
    .from(accounts);

  return ctx.json({ data });
});

export default app;
