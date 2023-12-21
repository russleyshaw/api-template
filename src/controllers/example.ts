import { eq } from "drizzle-orm";
import createError from "http-errors";
import { readDb, writeDb } from "../db/conn";
import { users } from "../db/schema";
import { UserSchema } from "../schemas/example";
import { BaseServer } from "../server/base";
import log from "../server/plugins/debug";
import { EXAMPLE_TAG } from "../tags";

export default (app: BaseServer) =>
    app
        .use(log("Setting up example controller"))
        .get(
            "/users",
            async () => {
                const db = readDb;
                const foundUsers = await db.query.users.findMany();
                return foundUsers.map(
                    (user): UserSchema => ({
                        id: user.id,
                        email: user.email ?? "",
                        name: user.name ?? undefined,
                        language: user.language ?? "",
                    }),
                );
            },
            {
                response: "UserListSchema",
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
                const db = writeDb;

                const email = body.email.toLowerCase().trim();

                const createdUsers = await db
                    .insert(users)
                    .values({
                        name: body.name,
                        email: email,
                        language: body.language,
                    })
                    .returning();

                const createdUser = createdUsers[0];

                return {
                    id: createdUser.id,
                    name: createdUser.name ?? undefined,
                    email: createdUser.email ?? "",
                    language: createdUser.language ?? "",
                };
            },
            {
                body: "NewUserSchema",
                response: "UserSchema",
                detail: {
                    summary: "Create new user",
                    description: "Create new user",
                    tags: [EXAMPLE_TAG.name],
                },
            },
        );
