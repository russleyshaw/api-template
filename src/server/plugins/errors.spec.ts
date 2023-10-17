import { describe, expect, it } from "bun:test";
import Elysia from "elysia";
import errors from "./errors";
import createHttpError from "http-errors";
import { Type } from "@sinclair/typebox";

const baseUrl = (path?: string) => `http://localhost${path}`;

describe("The Error Handler plugin", () => {
    const app = new Elysia()
        .use(errors)
        .get("/ok", () => "hi")
        .get("/valid", () => "hi", { query: Type.Object({ name: Type.String() }) })
        .get("/bad_request", () => {
            throw createHttpError(400, "bad request");
        })
        .get("/error", () => {
            throw new Error("internal server error");
        });

    it("resolves normally", async () => {
        const response = await app.handle(new Request(baseUrl("/ok")));

        expect(await response.text()).toBe("hi");
    });

    it("handles a thrown http error", async () => {
        const response = await app.handle(new Request(baseUrl("/bad_request")));
        expect(response.status).toBe(400);
    });

    it("handles a thrown generic error", async () => {
        const response = await app.handle(new Request(baseUrl("/error")));
        expect(response.status).toBe(500);
    });

    it("handles a NOT_FOUND error", async () => {
        const response = await app.handle(new Request(baseUrl("/not_found")));
        expect(response.status).toBe(404);
    });

    it("handles a VALIDATION error", async () => {
        const response = await app.handle(new Request(baseUrl("/valid")));
        expect(response.status).toBe(400);
    });
});
