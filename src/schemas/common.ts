import { Type } from "@sinclair/typebox";

export const PONG_SCHEMA = Type.Object(
    {
        pong: Type.String({
            description: "Pong message",
        }),
    },
    {
        title: "Common.Pong",
        description: "Pong message",
    },
);

const LinkSchema = (description: string) => Type.String({ description });

export const LINKS_SCHEMA = Type.Object(
    {
        wiki: LinkSchema("Source of the service"),
        homepage: LinkSchema("Homepage of the service"),
        issues: LinkSchema("Issues of the service"),
        build: LinkSchema("Build of the service"),
        documentation: LinkSchema("Docs of the service"),
        source: LinkSchema("Source of the service"),
    },
    {
        title: "Common.Links",
        description: "Links of the service",
    },
);

export const INFO_SCHEMA = Type.Object(
    {
        name: Type.String({
            description: "Name of the service",
        }),

        version: Type.String({
            description: "Version of the service",
        }),

        description: Type.String({
            description: "Description of the service",
        }),

        author: Type.Object({
            name: Type.String({
                description: "Author name",
            }),

            email: Type.String({
                description: "Author email",
            }),
        }),

        links: LINKS_SCHEMA,
    },
    {
        title: "Common.Info",
        description: "Information about the service",
    },
);

export const COMMON_SCHEMAS = {
    PONG_SCHEMA,
    LINKS_SCHEMA,
    INFO_SCHEMA,
};
