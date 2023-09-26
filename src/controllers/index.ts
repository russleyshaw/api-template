import { Elysia } from "elysia";
import common from "./common";
import example from "./example";
import { LOGGER } from "../logger";

LOGGER.debug("Registering controllers");
export default new Elysia().use(common).use(example);
