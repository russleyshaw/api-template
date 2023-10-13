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
        },
    )
    .get(
        "/info",
        async ({ log }) => {
            log.info("Info endpoint called");
            return {
                name: CONFIG.appName,
                description: CONFIG.appDescription,
                version: CONFIG.appVersion,
                author: {
                    name: CONFIG.appAuthorName,
                    email: CONFIG.appAuthorEmail,
                },
                links: CONFIG.links,
            };
        },
        { response: "info", detail: { tags: [COMMON_TAG.name] } },
    );
