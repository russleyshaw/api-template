import Elysia from "elysia";
import { CONFIG } from "./config";
import { LOGGER } from "./logger";
import swagger from "@elysiajs/swagger";

if (CONFIG.devMode) {
    LOGGER.warn("🦊 Elysia is running in development mode");
}

import server from "./server";

export default server.listen({
    hostname: CONFIG.hostname,
    port: CONFIG.port,
});

process.on("SIGINT", () => {
    LOGGER.warn("🦊 Elysia is shutting down");
    process.exit(0);
});
