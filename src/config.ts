import dotenv from "dotenv";
dotenv.config();

import PACKAGE_JSON from "../package.json" assert { type: "json" };

export const APP_PORT = expectEnvInt("APP_PORT", 3000);

export const IS_DEV_MODE = expectEnv("NODE_ENV", "production") === "development";

export const APP_NAME = PACKAGE_JSON.name;
export const APP_VERSION = PACKAGE_JSON.version;
export const APP_DESCRIPTION = PACKAGE_JSON.description;

export const APP_AUTHOR_NAME = PACKAGE_JSON.author;
export const APP_AUTHOR_EMAIL = undefined;

function expectEnv(name: string, defaultValue: string): string {
    const value = process.env[name];
    if (value === undefined) {
        return defaultValue;
    }

    return value;
}

function expectEnvInt(name: string, defaultValue: number): number {
    const value = process.env[name];
    if (value === undefined) {
        return defaultValue;
    }

    const parsed = parseInt(value);
    if (isNaN(parsed)) {
        throw new Error(`Invalid value for ${name}: ${value}`);
    }

    return parsed;
}
