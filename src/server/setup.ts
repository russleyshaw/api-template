import { Elysia } from "elysia";
import logger from "./plugins/logger";
import models from "./plugins/models";
import requestId from "./plugins/request_id";
import errors from "./plugins/errors";

export default new Elysia().use(errors).use(logger).use(requestId).use(models);
