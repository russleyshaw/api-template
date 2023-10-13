import { t } from "elysia";

export const NEW_USER_SCHEMA = t.Object(
    {
        name: t.String({
            description: "User name",
        }),
        email: t.Optional(
            t.String({
                description: "User email",
            })
        ),
        language: t.Optional(
            t.String({
                description: "User language",
            })
        ),
    },
    {
        title: "Example.NewUser",
        description: "New user information",
    }
);

export const USER_SCHEMA = t.Composite(
    [
        t.Required(NEW_USER_SCHEMA),
        t.Object({
            id: t.Integer({
                description: "User ID",
            }),
        }),
    ],
    {
        title: "Example.User",
        description: "User information",
    }
);

export const USER_LIST_SCHEMA = t.Array(USER_SCHEMA, {
    title: "Example.UserList",
    description: "List of users",
});

export const EXAMPLE_SCHEMAS = {
    NEW_USER_SCHEMA,
    USER_SCHEMA,
    USER_LIST_SCHEMA,
};
