import { Elysia } from "elysia";
import logger from "./plugins/logger";
import models from "./plugins/models";
import requestId from "./plugins/request_id";
import errors from "./plugins/errors";
import swagger from "./plugins/swagger";
import debug from "./plugins/debug";

export default new Elysia()
    .use(debug("Setting up base server"))
    .use(swagger)
    .use(errors)
    .use(logger)
    .use(requestId)
    .use(models);
