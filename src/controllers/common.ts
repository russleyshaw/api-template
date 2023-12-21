import { CONFIG } from "../config";
import { BaseServer } from "../server/base";
import log from "../server/plugins/debug";
import { COMMON_TAG } from "../tags";

export default (app: BaseServer) =>
    app
        .use(log("Setting up common controllers"))
        .get(
            "/info",
            async () => {
                return {
                    name: CONFIG.appName,
                    description: CONFIG.appDescription,
                    version: CONFIG.appVersion,
                    author: {
                        name: CONFIG.appAuthorName,
                        email: CONFIG.appAuthorEmail,
                    },
                };
            },
            {
                response: "InfoSchema",
                detail: {
                    summary: "Get service info",
                    description: "Get service info",
                    tags: [COMMON_TAG.name],
                },
            },
        )
        .get(
            "/ping",
            async () => {
                return { pong: "pong" };
            },
            {
                response: "PongSchema",
                detail: {
                    summary: "Ping",
                    description: "Ping the server",
                    tags: [COMMON_TAG.name],
                },
            },
        );
