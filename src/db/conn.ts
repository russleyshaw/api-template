import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

import { migrate } from "drizzle-orm/postgres-js/migrator";
import { CONFIG } from "../config";

// Migrate the database
const migrateConn = postgres(CONFIG.writeDbUrl, { max: 1 });
const migrateDb = drizzle(migrateConn);
await migrate(migrateDb, { migrationsFolder: "./drizzle" });

await migrateConn.end();

// Connect to the database
const writeConn = postgres(CONFIG.writeDbUrl);
const readConn = postgres(CONFIG.readDbUrl);

export const writeDb = drizzle(writeConn, { schema });
export const readDb = drizzle(readConn, { schema });
