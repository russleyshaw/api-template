import { describe, expect, it } from "bun:test";
import requestIdPlugin from "./request_id";
import Elysia from "elysia";

const uuidRe = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/;

describe("The Request ID plugin", () => {
    const baseUrl = "http://localhost/";
    const app = new Elysia().use(requestIdPlugin).get("/", () => "hi");

    it("forwards a x-request-id header", async () => {
        const response = await app.handle(
            new Request(baseUrl, {
                headers: {
                    "x-request-id": "test",
                },
            }),
        );

        expect(response.headers.get("x-request-id")).toBe("test");
    });

    it("creates a x-request-id header", async () => {
        const response = await app.handle(new Request(baseUrl));
        expect(response.headers.get("x-request-id")).toMatch(uuidRe);
    });
});
