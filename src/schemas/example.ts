import { Type } from "@sinclair/typebox";

export const NEW_USER_SCHEMA = Type.Object(
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

export const USER_SCHEMA = Type.Composite(
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

export const USER_LIST_SCHEMA = Type.Array(USER_SCHEMA, {
    title: "UserList",
    description: "List of users",
});
