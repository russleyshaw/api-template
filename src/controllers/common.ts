import { Elysia, t } from "elysia";
import { COMMON_TAG } from "../tags";
import { LOGGER } from "../logger";
import { CONFIG } from "../config";
import base from "../server/base";

LOGGER.debug("Registering common controllers");
export default base
    .get(
        "/ping",
        async () => {
            return { pong: "pong" };
        },
        {
            response: "pong",
            detail: {
                tags: [COMMON_TAG.name],
            },
        }
    )
    .get(
        "/info",
        () => {
            return {
                name: CONFIG.appName,
                description: CONFIG.appDescription,
                version: CONFIG.appVersion,
            };
        },
        { detail: { tags: [COMMON_TAG.name] } }
    );
