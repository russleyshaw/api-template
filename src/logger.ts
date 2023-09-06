import pino from "pino";
import { IS_DEV_MODE } from "./config.js";

export const logger = pino.pino({
    transport: IS_DEV_MODE
        ? {
              target: "pino-pretty",
              options: {
                  translateTime: "HH:MM:ss",
                  ignore: "pid,hostname",
              },
          }
        : undefined,
    level: IS_DEV_MODE ? "debug" : "info",
});
