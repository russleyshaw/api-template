export const ELYSIA_ERROR_CODES = [
    "NOT_FOUND",
    "VALIDATION",
    "PARSE",
    "UNKNOWN",
    "INTERNAL_SERVER_ERROR",
    "INVALID_COOKIE_SIGNATURE",
] as const;

export type ElysiaErrorCode = (typeof ELYSIA_ERROR_CODES)[number];
