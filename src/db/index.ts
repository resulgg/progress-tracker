import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { config } from "dotenv";

config({ path: ".env" });

const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: "snake_case",
  schema,
});

export default db;
