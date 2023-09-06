import Fastify from "fastify";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";
import FastifyHelmet from "@fastify/helmet";
import FastifyCors from "@fastify/cors";
import {
    APP_AUTHOR_EMAIL,
    APP_AUTHOR_NAME,
    APP_DESCRIPTION,
    APP_NAME,
    APP_VERSION,
} from "./config.js";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { ALL_TAGS } from "./tags.js";
import { logger } from "./logger.js";

export async function createServer() {
    logger.info("Creating server");

    const server = Fastify({
        logger: logger,
    }).withTypeProvider<TypeBoxTypeProvider>();

    await server.register(FastifyCors);
    await server.register(FastifyHelmet);

    await server.register(FastifySwagger, {
        openapi: {
            info: {
                title: APP_NAME,
                version: APP_VERSION,
                description: APP_DESCRIPTION,
                contact: {
                    name: APP_AUTHOR_NAME,
                    email: APP_AUTHOR_EMAIL,
                },
            },
            tags: [...ALL_TAGS],
        },
    });

    await server.register(FastifySwaggerUi, {
        routePrefix: "/docs",
        uiConfig: {
            docExpansion: "none",
            deepLinking: false,
        },
    });

    logger.info("Server created");

    return server;
}

// Create a server type for controller functions to use.
export type AppServer = Awaited<ReturnType<typeof createServer>>;
