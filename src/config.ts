import { Static, getSchemaValidator, t } from "elysia";
import pkgJson from "../package.json";
import { expectExists } from "./lib/test";
import { safeParseInt } from "./lib/util";

const ConfigFileSchema = t.Object({
    port: t.Optional(
        t.Number({
            minimum: 1,
            maximum: 65535,
            description: "Application port",
        }),
    ),
    testPort: t.Optional(
        t.Number({
            minimum: 1,
            maximum: 65535,
            description: "Application test port",
        }),
    ),

    hostname: t.Optional(
        t.String({
            description: "Application hostname",
        }),
    ),

    devMode: t.Optional(
        t.Boolean({
            description: "Development mode",
        }),
    ),

    dbUrl: t.Optional(
        t.String({
            description: "Database URL",
        }),
    ),
});

type ConfigFileSchema = Static<typeof ConfigFileSchema>;

async function readConfig(configPath: string) {
    const config = Bun.file(configPath);
    const configData = await config.json().catch(() => ({}));

    const validator = getSchemaValidator(ConfigFileSchema, {})!;
    const encoded = validator.Encode(configData) as ConfigFileSchema;

    const dbUrl = expectExists(encoded.dbUrl ?? Bun.env.DB_URL, "Expected DB_URL to be set.");

    return {
        port: encoded.port ?? safeParseInt(Bun.env.PORT, 3000),
        testPort: encoded.testPort ?? safeParseInt(Bun.env.TEST_PORT, 3001),
        hostname: encoded.hostname ?? Bun.env.HOSTNAME ?? "127.0.0.1",
        devMode: encoded.devMode ?? false,

        readDbUrl: dbUrl,
        writeDbUrl: dbUrl,

        appName: pkgJson.name,
        appDisplayName: pkgJson.displayName,
        appVersion: pkgJson.version,
        appDescription: pkgJson.description,
        appAuthorName: pkgJson.author.name,
        appAuthorEmail: pkgJson.author.email,
    };
}

export const CONFIG = await readConfig("./conf/config.json");
