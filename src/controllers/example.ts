import { Elysia, t } from "elysia";
import { getDbClient } from "../db";
import { EXAMPLE_TAG } from "../tags";
import { LOGGER } from "../logger";
import schemas from "../schemas";
import base from "../server/base";

LOGGER.debug("Registering example controllers");
export default new Elysia()
    .use(schemas)
    .use(base)
    .post(
        "/user",
        async ({ body, log }) => {
            const db = await getDbClient();
            const createdUser = await db.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                },
            });

            return {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email ?? undefined,
            };
        },
        {
            body: "newUser",
            response: "user",
            detail: {
                summary: "Create new user",
                description: "Create new user",
                tags: [EXAMPLE_TAG.name],
            },
        }
    )
    .get(
        "/user",
        async () => {
            const db = await getDbClient();
            const foundUsers = await db.user.findMany();
            return foundUsers.map(user => ({
                id: user.id,
                email: user.email ?? undefined,
                name: user.name,
            }));
        },
        {
            response: "userList",
            detail: {
                summary: "Get all users",
                description: "Get all users",
                tags: [EXAMPLE_TAG.name],
            },
        }
    );
