import { Static, Type } from "@sinclair/typebox";
import { encodeWithDefaults } from "./lib/typebox";
import pkgJson from "../package.json";
import { LINKS_SCHEMA } from "./schemas/common";

const POSTGRES_DB_CONFIG_SCHEMA = Type.Object({
    type: Type.Literal("postgres"),
});

const SQLITE_DB_CONFIG_SCHEMA = Type.Object({
    type: Type.Literal("sqlite"),
    path: Type.String({
        description: "Database path",
        default: process.env.DB_PATH ?? "./dev.sqlite",
    }),
});

const DB_CONFIG_SCHEMA = Type.Union([POSTGRES_DB_CONFIG_SCHEMA, SQLITE_DB_CONFIG_SCHEMA]);

export type DbConfig = Static<typeof DB_CONFIG_SCHEMA>;

const REDIS_CONFIG_SCHEMA = Type.Object({
    host: Type.String({
        description: "Redis host",
        default: process.env.REDIS_HOST ?? "localhost",
    }),
});

export type CacheConfig = Static<typeof REDIS_CONFIG_SCHEMA>;

const CONFIG_SCHEMA = Type.Object({
    port: Type.Number({
        minimum: 1,
        maximum: 65535,
        default: 3000,
        description: "Application port",
    }),

    devMode: Type.Boolean({
        default: process.env.NODE_ENV === "development",
        description: "Development mode",
    }),

    db: DB_CONFIG_SCHEMA,

    links: LINKS_SCHEMA,
});

async function readConfig(configPath: string) {
    const config = Bun.file(configPath);
    const configData = await config.json();

    const encoded = encodeWithDefaults(CONFIG_SCHEMA, configData);
    return {
        ...encoded,
        appName: pkgJson.name,
        appDisplayName: pkgJson.displayName,
        appVersion: pkgJson.version,
        appDescription: pkgJson.description,
        appAuthorName: pkgJson.author.name,
        appAuthorEmail: pkgJson.author.email,
    };
}

export const CONFIG = await readConfig("./conf/config.json");
