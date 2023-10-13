import { t } from "elysia";

export const PONG_SCHEMA = t.Object(
    {
        pong: t.String({
            description: "Pong message",
        }),
    },
    {
        title: "Common.Pong",
        description: "Pong message",
    }
);

const LinkSchema = (description: string) => t.String({ description });

export const LINKS_SCHEMA = t.Object(
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
    }
);

export const INFO_SCHEMA = t.Object(
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

        links: LINKS_SCHEMA,
    },
    {
        title: "Common.Info",
        description: "Information about the service",
    }
);

export const COMMON_SCHEMAS = {
    PONG_SCHEMA,
    LINKS_SCHEMA,
    INFO_SCHEMA,
};
