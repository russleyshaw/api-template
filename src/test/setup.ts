import { beforeAll } from "bun:test";
import { LOGGER } from "../logger";

beforeAll(() => {
    LOGGER.level = "warn";
});
