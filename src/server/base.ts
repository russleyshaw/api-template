import { Elysia } from "elysia";
import controllers from "../controllers";
import { CONFIG } from "../config";
import { LOGGER } from "../logger";
import swagger from "@elysiajs/swagger";
import { ALL_TAGS } from "../tags";
import schemas from "../schemas";

export default new Elysia()
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
        })
    )
    .derive(({ headers }) => {
        const requestId = headers["x-request-id"] ?? "REQ ID";
        return { requestId };
    })

    .derive(() => ({ log: LOGGER.child({}) }))
    .onAfterHandle(({ request, requestId, set }) => {
        LOGGER.debug({
            method: request.method,
            url: request.url,
        });

        set.headers["x-request-id"] = requestId;
    })

    .use(schemas);
