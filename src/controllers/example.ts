import { EXAMPLE_TAG } from "../tags.js";
import { getDbClient } from "../db.js";
import type { AppServer } from "../server.js";

import { Static, Type } from "@sinclair/typebox";
import { logger } from "../logger.js";

const NEW_USER_SCHEMA = Type.Object(
    {
        name: Type.String({
            description: "User name",
        }),
        email: Type.Optional(
            Type.String({
                description: "User email",
            }),
        ),
    },
    {
        $id: "NewUser",
        description: "New user information",
    },
);

const USER_SCHEMA = Type.Composite(
    [
        NEW_USER_SCHEMA,
        Type.Object({
            id: Type.Integer({
                description: "User ID",
            }),
        }),
    ],
    {
        $id: "User",
        description: "User information",
    },
);

// Create references to the schemas so they can be used in other schemas by name.
export const NEW_USER_REF = Type.Ref(NEW_USER_SCHEMA);
export const USER_REF = Type.Ref(USER_SCHEMA);

type UserSchemaType = Static<typeof USER_SCHEMA>;

export async function registerExampleController(server: AppServer) {
    logger.info("Registering example controller");

    // Add schemas to the server so they can be referenced in other schemas.
    server.addSchema(NEW_USER_SCHEMA);
    server.addSchema(USER_SCHEMA);

    await server.post(
        "/user",
        {
            schema: {
                summary: "Create a new user",
                tags: [EXAMPLE_TAG.name],
                body: NEW_USER_REF,
                response: {
                    200: {
                        schema: USER_REF,
                    },
                },
            } as const,
        },
        async req => {
            const db = await getDbClient();
            const createdUser = await db.user.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                },
            });

            return {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email ?? undefined,
            } satisfies UserSchemaType;
        },
    );

    await server.get(
        "/user",
        {
            schema: {
                summary: "Get all users",
                tags: [EXAMPLE_TAG.name],
                response: {
                    200: {
                        type: "array",
                        items: USER_REF,
                    },
                },
            } as const,
        },
        async () => {
            const db = await getDbClient();
            const foundUsers = await db.user.findMany();
            return foundUsers.map(user => ({
                id: user.id,

                email: user.email ?? undefined,
            }));
        },
    );

    return server;
}
