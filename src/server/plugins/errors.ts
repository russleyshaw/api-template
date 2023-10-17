import Elysia from "elysia";
import { isHttpError } from "http-errors";

import logger from "./logger";
import debug from "./debug";

export default new Elysia({ name: "errors" })
    .use(debug("Plugin: Setting up error handling"))
    .use(logger)
    .onError(({ log, code, error }) => {
        const errorText = error.toString();

        if (code === "INTERNAL_SERVER_ERROR") {
            log.error(errorText);
        }

        if (isHttpError(error)) {
            return new Response(error.message, { status: error.status });
        }

        return new Response(error.toString());
    });
