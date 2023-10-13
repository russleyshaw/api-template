import { randomUUID } from "crypto";
import Elysia from "elysia";

const REQUEST_ID_HEADER = "x-request-id";

export default new Elysia({ name: "request-id" })
    .onRequest(({ set, request: { headers } }) => {
        set.headers[REQUEST_ID_HEADER] = headers.get(REQUEST_ID_HEADER) || randomUUID();
    })
    .derive(({ set }) => {
        return {
            requestID: set.headers[REQUEST_ID_HEADER],
        };
    });
