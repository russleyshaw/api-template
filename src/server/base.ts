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
    .derive(() => {
        return { log: LOGGER.child({}) };
    })
    .use(schemas);
