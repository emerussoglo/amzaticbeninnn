import "server-only";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "@/db/schema";

const databaseUrl = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

function createDatabase() {
  if (!databaseUrl || !authToken) {
    throw new Error("TURSO_DATABASE_URL et TURSO_AUTH_TOKEN sont requis.");
  }

  const client = createClient({ url: databaseUrl, authToken });
  return drizzle(client, { schema });
}

type Database = ReturnType<typeof createDatabase>;
let database: Database | undefined;

export const db = new Proxy({} as Database, {
  get(_target, property) {
    database ??= createDatabase();
    const value = Reflect.get(database, property, database);
    return typeof value === "function" ? value.bind(database) : value;
  },
});
