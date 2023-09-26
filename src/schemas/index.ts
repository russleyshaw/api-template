import Elysia from "elysia";
import { Type } from "@sinclair/typebox";
import { LOGGER } from "../logger";

const PONG_SCHEMA = Type.Object(
    {
        pong: Type.String({
            description: "Pong message",
        }),
    },
    {
        title: "Pong",
        description: "Pong message",
    }
);

const NEW_USER_SCHEMA = Type.Object(
    {
        name: Type.String({
            description: "User name",
        }),
        email: Type.Optional(
            Type.String({
                description: "User email",
            })
        ),
    },
    {
        title: "NewUser",
        description: "New user information",
    }
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
        title: "User",
        description: "User information",
    }
);

LOGGER.debug("Registering schemas");
export default new Elysia().model({
    // Common
    pong: PONG_SCHEMA,

    // Example
    user: USER_SCHEMA,
    newUser: NEW_USER_SCHEMA,
    userList: Type.Array(USER_SCHEMA, { title: "UserList", description: "List of users" }),
});
