import { randomUUID } from "crypto";
import Elysia from "elysia";
import debug from "./debug";

const REQUEST_ID_HEADER = "x-request-id";

export default new Elysia({ name: "request-id" })
    .use(debug("Plugin: Setting up request ID"))
    .onRequest(({ set, request: { headers } }) => {
        set.headers[REQUEST_ID_HEADER] = headers.get(REQUEST_ID_HEADER) || randomUUID();
    })
    .derive(({ set }) => {
        return {
            requestID: set.headers[REQUEST_ID_HEADER],
        };
    });
