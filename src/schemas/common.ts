import { Static, t } from "elysia";

export const PongSchema = t.Object(
    {
        pong: t.String({
            description: "Pong message",
        }),
    },
    {
        title: "Common.Pong",
        description: "Pong message",
    },
);
export type PongSchema = Static<typeof PongSchema>;

export const InfoSchema = t.Object(
    {
        name: t.String({
            description: "Name of the service",
        }),

        version: t.String({
            description: "Version of the service",
        }),

        description: t.String({
            description: "Description of the service",
        }),

        author: t.Object({
            name: t.String({
                description: "Author name",
            }),

            email: t.String({
                description: "Author email",
            }),
        }),
    },
    {
        title: "Common.Info",
        description: "Information about the service",
    },
);
export type InfoSchema = Static<typeof InfoSchema>;

export const COMMON_SCHEMAS = {
    PongSchema,
    InfoSchema,
};
