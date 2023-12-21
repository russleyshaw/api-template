import { afterAll, beforeAll } from "bun:test";
import { CONFIG } from "../config";
import { LOGGER } from "../logger";
import server from "../server";

LOGGER.level = "warn";
beforeAll(async () => {
    server.listen(CONFIG.testPort, () => {
        LOGGER.info(`Test server listening on port ${CONFIG.testPort}`);
    });
});

afterAll(async () => {
    await server.stop().catch(() => {});
});
