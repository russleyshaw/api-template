import Elysia from "elysia";
import { LOGGER } from "../logger";
import common from "./common";
import example from "./example";

LOGGER.debug("Registering schemas");
export default new Elysia().use(common).use(example);
