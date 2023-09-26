import { Type } from "@sinclair/typebox";
import { encodeWithDefaults } from "./lib/typebox";
import pkgJson from "../package.json";

const CONFIG_SCHEMA = Type.Object({
    port: Type.Number({
        minimum: 1,
        maximum: 65535,
        default: 3000,
        description: "Application port",
    }),

    devMode: Type.Boolean({
        default: false,
        description: "Development mode",
    }),
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
