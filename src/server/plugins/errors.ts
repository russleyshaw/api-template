import Elysia from "elysia";
import { isHttpError } from "http-errors";

import { Static, getSchemaValidator, t } from "elysia";
import { CONFIG } from "../../config";
import { ElysiaErrorCode } from "../../lib/elysia";
import debug from "./debug";
import logger from "./logger";

export const ErrorResponse = t.Object(
    {
        name: t.String(),
        message: t.String(),
        code: t.Integer(),
        stack: t.Optional(t.String()),
    },
    {
        title: "Error Response",
        description: "The response body for an error",
    },
);

export type ErrorResponse = Static<typeof ErrorResponse>;

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

    let errorName = "UNKNOWN";
    let errorMessage = "Unknown error";
    let errorCode = 500;
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
