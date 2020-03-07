/**
 * Application variables
 */

import * as dotenv from "dotenv";
import { asNumber } from "./util";
import * as path from "path";

dotenv.config();

export const PORT = asNumber(process.env.PORT ?? 3000, { integer: true, parse: true });
export const LOG_FILE = process.env.LOG_FILE ?? "app.log";

export const PROJECT_ROOT = path.join(__dirname, "../");

export const SCHEMA_FILE = path.join(PROJECT_ROOT, "schema.graphql");
