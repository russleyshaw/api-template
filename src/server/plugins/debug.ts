import Elysia from "elysia";
import { LOGGER } from "../../logger";

export default (msg: string) => (app: Elysia) => {
    LOGGER.debug(msg);
    return app;
};
