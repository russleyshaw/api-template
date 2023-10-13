import Elysia from "elysia";
import { LOGGER } from "../../logger";
import { BaseLogger } from "pino";

export default new Elysia()
    .decorate(() => ({ log: LOGGER.child({}) as BaseLogger }))
    .onRequest(({ log, request }) => {
        log.debug(`Requested: ${request.method} ${request.url}`, {
            url: request.url,
            method: request.method,
        });
    });
