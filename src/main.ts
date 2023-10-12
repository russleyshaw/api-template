import { CONFIG } from "./config";
import { LOGGER } from "./logger";

if (CONFIG.devMode) {
    LOGGER.warn("🦊 Elysia is running in development mode");
}

import server from "./server";

server.listen(CONFIG.port, server => {
    LOGGER.info(`🦊 Elysia is running at ${server?.hostname}:${server?.port}`);
});

process.on("SIGINT", () => {
    LOGGER.warn("🦊 Elysia is shutting down");
    process.exit(0);
});

export type RunningServer = typeof server;
export const runningServer: RunningServer = server;
