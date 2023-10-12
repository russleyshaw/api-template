import { getDbClient } from "../db";
import { LOGGER } from "../logger";
import base from "../server/base";
import { EXAMPLE_TAG } from "../tags";
import createError from "http-errors";

LOGGER.debug("Registering example controllers");
export default base
    .post(
        "/user",
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
            body: "newUser",
            response: "user",
            detail: {
                summary: "Create new user",
                description: "Create new user",
                tags: [EXAMPLE_TAG.name],
            },
        },
    )
    .get(
        "/user",
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
            response: "userList",
            detail: {
                summary: "Get all users",
                description: "Get all users",
                tags: [EXAMPLE_TAG.name],
            },
        },
    );
