import { CONFIG } from "./config";
import { LOGGER } from "./logger";

if (CONFIG.devMode) {
    LOGGER.warn("🦊 Elysia is running in development mode");
}

import server from "./server";

export default server.listen(
    {
        hostname: CONFIG.hostname,
        port: CONFIG.port,
    },
    () => {
        LOGGER.info(`🦊 Elysia is listening on ${CONFIG.hostname}:${CONFIG.port}`);
    },
);

process.on("SIGINT", () => {
    LOGGER.warn("🦊 Elysia is shutting down");
    process.exit(0);
});
