import { beforeAll } from "bun:test";
import { LOGGER } from "../logger";

beforeAll(async () => {
    LOGGER.level = "warn";
});
