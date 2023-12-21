import { describe, expect, it } from "bun:test";
import { CONFIG } from "../../config.js";
import { testClient } from "./test_client.js";

describe("Common Controllers", () => {
    describe("GET /ping", () => {
        it("should pong", async () => {
            const resp = await testClient.ping.get();
            expect(resp.status).toBe(200);
            expect(resp.data?.pong).toBe("pong");
        });
    });

    describe("GET /info", () => {
        it("should return app info", async () => {
            const resp = await testClient.info.get();
            expect(resp.status).toBe(200);

            expect(resp.data?.name).toBe(CONFIG.appName);
            expect(resp.data?.description).toBe(CONFIG.appDescription);
            expect(resp.data?.version).toBe(CONFIG.appVersion);
            expect(resp.data?.author?.name).toBe(CONFIG.appAuthorName);
            expect(resp.data?.author?.email).toBe(CONFIG.appAuthorEmail);
        });
    });
});
