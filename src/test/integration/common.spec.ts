import { expect, it, describe } from "bun:test";
import { testClient } from "./test_client.js";
import { CONFIG } from "../../config.js";

describe("Commmon Controllers", () => {
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
