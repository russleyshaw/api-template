import { Elysia } from "elysia";
import debug from "./plugins/debug";
import errors from "./plugins/errors";
import logger from "./plugins/logger";
import models from "./plugins/models";
import requestId from "./plugins/request_id";
import swagger from "./plugins/swagger";

const base = new Elysia({ name: "base" })
    .use(debug("Setting up base server"))
    .use(swagger)
    .use(errors)
    .use(logger)
    .use(requestId)
    .use(models);

export type BaseServer = typeof base;

export default base;
