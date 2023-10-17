import { Type } from "@sinclair/typebox";
import { encodeWithDefaults } from "./lib/typebox";
import pkgJson from "../package.json";
import { LINKS_SCHEMA } from "./schemas/common";
import { safeParseInt } from "./lib/util";

const CONFIG_SCHEMA = Type.Object({
    port: Type.Number({
        minimum: 1,
        maximum: 65535,
        default: safeParseInt(Bun.env.PORT, 3000),
        description: "Application port",
    }),
    testPort: Type.Number({
        minimum: 1,
        maximum: 65535,
        default: safeParseInt(Bun.env.TEST_PORT, 3001),
        description: "Application test port",
    }),

    hostname: Type.String({
        default: Bun.env.HOSTNAME ?? "localhost",
        description: "Application hostname",
    }),

    devMode: Type.Boolean({
        default: Bun.env.NODE_ENV === "development",
        description: "Development mode",
    }),

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
