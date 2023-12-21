import pino from "pino";
import { CONFIG } from "./config";

export const LOGGER = pino({
    level: CONFIG.devMode ? "debug" : "info",
});
