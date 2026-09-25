import "server-only";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/db/schema";

const databaseUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!databaseUrl || !authToken) {
  throw new Error("TURSO_DATABASE_URL et TURSO_AUTH_TOKEN sont requis.");
}

const client = createClient({ url: databaseUrl, authToken });

export const db = drizzle(client, { schema });
