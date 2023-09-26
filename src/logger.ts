import pino from "pino";
import { CONFIG } from "./config";

export const LOGGER = pino({
    transport: CONFIG.devMode
        ? {
              target: "pino-pretty",
              options: {
                  translateTime: "HH:MM:ss",
                  ignore: "pid,hostname",
              },
          }
        : undefined,
    level: CONFIG.devMode ? "debug" : "info",
});
