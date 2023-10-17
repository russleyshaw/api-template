import { beforeAll, afterAll } from "bun:test";
import { LOGGER } from "../logger";
import server from "../server";
import { CONFIG } from "../config";

LOGGER.level = "warn";
beforeAll(async () => {
    server.listen(CONFIG.testPort);
});

afterAll(async () => {
    await server.stop();
});
