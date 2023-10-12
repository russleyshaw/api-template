import Elysia from "elysia";
import { Type } from "@sinclair/typebox";
import { LOGGER } from "../logger";

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
        language: Type.Optional(
            Type.String({
                description: "User language",
            }),
        ),
    },
    {
        title: "NewUser",
        description: "New user information",
    },
);

const USER_SCHEMA = Type.Composite(
    [
        Type.Required(NEW_USER_SCHEMA),
        Type.Object({
            id: Type.Integer({
                description: "User ID",
            }),
        }),
    ],
    {
        title: "User",
        description: "User information",
    },
);

LOGGER.debug("Registering example schemas");
export default new Elysia().model({
    // Example
    user: USER_SCHEMA,
    newUser: NEW_USER_SCHEMA,
    userList: Type.Array(USER_SCHEMA, { title: "UserList", description: "List of users" }),
});
