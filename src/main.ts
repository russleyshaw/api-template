import { CONFIG } from "./config";
import { LOGGER } from "./logger";

import server from "./server";

server.listen(CONFIG.port, server => {
    LOGGER.info(`🦊 Elysia is running at ${server?.hostname}:${server?.port}`);
});
