import { logger } from "../logger.js";
import type { AppServer } from "../server.js";
import { registerExampleController } from "./example.js";
import { registerCommonController } from "./general.js";

export async function registerControllers(server: AppServer) {
    logger.info("Registering controllers");

    await registerCommonController(server);

    // Add new controllers here.
    await registerExampleController(server);

    logger.info("Controllers registered");

    return server;
}
