import lodash from "lodash";
import { PrismaClient } from "./generated/prisma";
import { LOGGER } from "./logger";

export async function createDbClient() {
    LOGGER.info("Creating database client");
    const client = new PrismaClient();

    LOGGER.info("Connecting to database");
    await client.$connect();
    LOGGER.info("Connected to database");

    return client;
}

export const getDbClient = lodash.once(createDbClient);
