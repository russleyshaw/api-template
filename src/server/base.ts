import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { isHttpError } from "http-errors";
import { CONFIG } from "../config";
import { LOGGER } from "../logger";
import { ALL_TAGS } from "../tags";
import logger from "./plugins/logger";
import models from "./plugins/models";

const baseServer = new Elysia()
    .use(
        swagger({
            documentation: {
                info: {
                    title: CONFIG.appName,
                    description: CONFIG.appDescription,
                    version: CONFIG.appVersion,
                    contact: {
                        name: CONFIG.appAuthorName,
                        email: CONFIG.appAuthorEmail,
                    },
                },
                tags: [...ALL_TAGS],
            },
        }),
    )
    .derive(({ headers }) => {
        const requestId = headers["x-request-id"] ?? "REQ ID";
        return { requestId };
    })
    .use(logger)
    .onAfterHandle(({ request, requestId, set }) => {
        LOGGER.debug({
            method: request.method,
            url: request.url,
        });

        set.headers["x-request-id"] = requestId;
    })
    .onError(({ code, error }) => {
        const errorText = error.toString();

        if (code === "INTERNAL_SERVER_ERROR") {
            LOGGER.error(errorText);
        }

        if (isHttpError(error)) {
            return new Response(error.message, { status: error.status });
        }

        return new Response(error.toString());
    })

    .use(models);

export default baseServer;
export type BaseServer = typeof baseServer;
