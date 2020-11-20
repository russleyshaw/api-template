import * as dotenv from "dotenv";
dotenv.config();

import * as path from "path";
import { safeParseInt } from "./utils/parse";

export const PORT = safeParseInt(process.env.PORT) ?? 3000;
export const LOG_FILE = process.env.LOG_FILE ?? "app.log";
export const PROJECT_ROOT = path.join(__dirname, "../");
