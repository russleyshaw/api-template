import Elysia from "elysia";
import { BaseLogger } from "pino";
import { LOGGER } from "../../logger";
import debug from "./debug";

export default new Elysia()
    .use(debug("Plugin: Setting up logger"))
    .decorate(() => ({ log: LOGGER.child({}) as BaseLogger }))
    .onRequest(({ log, request }) => {
        log.debug(`Requested: ${request.method} ${request.url}`, {
            url: request.url,
            method: request.method,
        });
    });
