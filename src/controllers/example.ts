import createError from "http-errors";
import { getDbClient } from "../db";
import log from "../server/plugins/debug";
import { EXAMPLE_TAG } from "../tags";
import { BaseServer } from "../server/base";

export default (app: BaseServer) =>
    app
        .use(log("Setting up example controller"))
        .get(
            "/users",
            async () => {
                const db = await getDbClient();
                const foundUsers = await db.user.findMany();
                return foundUsers.map(user => ({
                    id: user.id,
                    email: user.email ?? "",
                    name: user.name,
                    language: user.language ?? "",
                }));
            },
            {
                response: "USER_LIST_SCHEMA",
                detail: {
                    summary: "Get all users",
                    description: "Get all users",
                    tags: [EXAMPLE_TAG.name],
                },
            },
        )
        .post(
            "/users",
            async ({ body }) => {
                const db = await getDbClient();

                const foundUser = await db.user.findUnique({
                    where: {
                        name: body.name,
                    },
                });

                if (foundUser) {
                    throw createError(409, `User with name (${body.name}) already exists`);
                }

                const createdUser = await db.user.create({
                    data: {
                        name: body.name,
                        email: body.email,
                        language: body.language,
                    },
                });

                return {
                    id: createdUser.id,
                    name: createdUser.name,
                    email: createdUser.email ?? "",
                    language: createdUser.language ?? "",
                };
            },
            {
                body: "NEW_USER_SCHEMA",
                response: "USER_SCHEMA",
                detail: {
                    summary: "Create new user",
                    description: "Create new user",
                    tags: [EXAMPLE_TAG.name],
                },
            },
        );
