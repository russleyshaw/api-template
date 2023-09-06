import {
    APP_AUTHOR_EMAIL,
    APP_AUTHOR_NAME,
    APP_DESCRIPTION,
    APP_NAME,
    APP_VERSION,
} from "../config.js";
import { logger } from "../logger.js";
import type { AppServer } from "../server.js";
import { COMMON_TAG } from "../tags.js";

export async function registerCommonController(server: AppServer) {
    logger.info("Registering common controller");

    await server.get(
        "/ping",
        {
            schema: {
                summary: "Ping the service",
                tags: [COMMON_TAG.name],
                response: {
                    200: {
                        type: "object",
                        properties: {
                            pong: {
                                type: "string",
                            },
                        },
                        required: ["pong"],
                    },
                },
            } as const,
        },
        async () => {
            return { pong: "pong" };
        },
    );

    await server.get(
        "/info",
        {
            schema: {
                summary: "Get application information",
                tags: [COMMON_TAG.name],
                response: {
                    200: {
                        type: "object",
                        properties: {
                            name: {
                                description: "Application name",
                                type: "string",
                            },
                            version: {
                                description: "Application version",
                                type: "string",
                            },
                            description: {
                                description: "Application description",
                                type: "string",
                            },
                            author: {
                                description: "Application author",
                                type: "object",
                                properties: {
                                    name: {
                                        description: "Author name",
                                        type: "string",
                                    },
                                    email: {
                                        description: "Author email",
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                },
            } as const,
        },
        async () => {
            return {
                name: APP_NAME,
                version: APP_VERSION,
                description: APP_DESCRIPTION,
                author: {
                    name: APP_AUTHOR_NAME,
                    email: APP_AUTHOR_EMAIL,
                },
            };
        },
    );

    await server.get(
        "/swagger.json",
        {
            schema: {
                summary: "Get OpenAPI schema",
            } as const,
        },
        async () => {
            return server.swagger();
        },
    );

    return server;
}
