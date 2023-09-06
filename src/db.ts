import lodash from "lodash";
import { PrismaClient } from "./generated/prisma/index.js";
import { logger } from "./logger.js";

const { once } = lodash;

export async function createDbClient() {
    logger.info("Creating database client");
    const client = new PrismaClient();

    logger.info("Connecting to database");
    await client.$connect();
    logger.info("Connected to database");

    return client;
}

export const getDbClient = once(createDbClient);
