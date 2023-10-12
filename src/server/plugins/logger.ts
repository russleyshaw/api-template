import Elysia from "elysia";
import { LOGGER } from "../../logger";
import { BaseLogger } from "pino";

export default new Elysia().derive(() => ({ log: LOGGER.child({}) as BaseLogger }));
