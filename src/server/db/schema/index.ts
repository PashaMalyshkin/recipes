import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
export * from "drizzle-orm";
import * as recipes from "./recipes";
import * as ingredients from './ingredients';
import * as categories from './categories';

export const schema = {
  ...recipes,
  ...ingredients,
  ...categories,
};

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://postgres:3H0iiHNNbd4etIit@db.kgrktctqjzkaglvgovtf.supabase.co:5432/postgres";
const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });
