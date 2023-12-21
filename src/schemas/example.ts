import { Static, t } from "elysia";

export const NewUserSchema = t.Object(
    {
        name: t.Optional(
            t.String({
                description: "User name",
            }),
        ),
        email: t.String({
            description: "User email",
        }),

        language: t.Optional(
            t.String({
                description: "User language",
            }),
        ),
    },
    {
        title: "Example.NewUser",
        description: "New user information",
    },
);
export type NewUserSchema = Static<typeof NewUserSchema>;

export const UserSchema = t.Composite(
    [
        NewUserSchema,
        t.Object({
            id: t.Integer({
                description: "User ID",
            }),
        }),
    ],
    {
        title: "Example.User",
        description: "User information",
    },
);
export type UserSchema = Static<typeof UserSchema>;

export const UserListSchema = t.Array(UserSchema, {
    title: "Example.UserList",
    description: "List of users",
});
export type UserListSchema = Static<typeof UserListSchema>;

export const EXAMPLE_SCHEMAS = {
    UserSchema,
    NewUserSchema,
    UserListSchema,
};
