import Elysia from "elysia";
import { isHttpError } from "http-errors";

import logger from "./logger";
import debug from "./debug";
import { Static, Type } from "@sinclair/typebox";
import { CONFIG } from "../../config";
import { Value } from "@sinclair/typebox/value";
import { ElysiaErrorCode } from "../../lib/elysia";

export const ERROR_RESPONSE_SCHEMA = Type.Object(
    {
        name: Type.String(),
        message: Type.String(),
        code: Type.Integer(),
        stack: Type.Optional(Type.String()),
    },
    {
        title: "Error Response",
        description: "The response body for an error",
    },
);

type ErrorResponse = Static<typeof ERROR_RESPONSE_SCHEMA>;

export function isErrorResponse(value: unknown): value is ErrorResponse {
    return Value.Encode(ERROR_RESPONSE_SCHEMA, value);
}

export default new Elysia({ name: "errors" })
    .use(debug("Plugin: Setting up error handling"))
    .use(logger)
    .onError(({ code, error }) => {
        const errorResponse = castErrorResponse(error, code);

        if (errorResponse == null) {
            return;
        }

        return new Response(JSON.stringify(errorResponse), {
            status: errorResponse.code,
            statusText: errorResponse.name,
        });
    });

function castErrorResponse(error: unknown, code?: ElysiaErrorCode): ErrorResponse | undefined {
    if (error == null && code == null) return undefined;

    let errorName: string = "UNKNOWN";
    let errorMessage: string = "Unknown error";
    let errorCode: number = 500;
    let errorStack: string | undefined = undefined;

    if (code === "NOT_FOUND") {
        errorCode = 404;
    } else if (code === "VALIDATION") {
        errorCode = 400;
    } else if (code === "PARSE") {
        errorCode = 400;
    } else if (code === "INVALID_COOKIE_SIGNATURE") {
        errorCode = 400;
    } else if (code === "INTERNAL_SERVER_ERROR") {
        errorCode = 500;
    }

    if (isHttpError(error)) {
        if (CONFIG.devMode) {
            errorStack = error.stack;
        }

        errorName = error.name;
        errorMessage = error.message;
        errorCode = error.statusCode;
    }

    if (error instanceof Error) {
        if (CONFIG.devMode) {
            errorStack = error.stack;
        }

        errorName = error.name;
        errorMessage = error.message;
    }

    if (typeof error === "string") {
        errorMessage = error;
    }

    return {
        name: errorName,
        message: errorMessage,
        code: errorCode,
        stack: errorStack,
    };
}
