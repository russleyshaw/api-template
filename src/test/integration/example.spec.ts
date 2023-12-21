import { afterAll, describe, expect, it } from "bun:test";
import { random } from "lodash";
import { expectToBeDefined } from "../util.js";
import { testClient } from "./test_client.js";
import { writeDb } from "../../db/conn.js";
import { eq, inArray } from "drizzle-orm";
import { users } from "../../db/schema.js";

describe("Example Controllers", () => {
    afterAll(async () => deleteTestUsers());

    describe("GET /users", () => {
        it("should get users", async () => {
            const testUser = await createTestUser();
            const resp = await testClient.users.get();
            expect(resp.status).toBe(200);

            const foundUser = resp.data?.find(user => user.id === testUser.id);
            expectToBeDefined(foundUser);
        });
    });

    describe("POST /users", () => {
        it("should create a new user", async () => {
            const name = "test";
            await tryDeleteTestUser(name);

            const email = `${random(0, 1000000).toString()}@example.com`;

            const resp = await testClient.users.post({
                name,
                email,
            });
            testUserIds.add(resp.data?.id ?? -1);

            expect(resp.status).toBe(200);
            const testUser = resp.data;
            expectToBeDefined(testUser);

            expect(testUser.name).toBe(name);
            expect(testUser.email).toBe(email);
        });
    });

    const testUserIds = new Set<number>();

    async function tryDeleteTestUser(name: string) {
        const db = writeDb;
        await db.delete(users).where(eq(users.name, name));
    }

    async function createTestUser() {
        const db = writeDb;
        const createdUsers = await db
            .insert(users)
            .values({
                name: "test",
                email: "",
            })
            .returning();
        testUserIds.add(createdUsers[0].id);
        return createdUsers[0];
    }

    async function deleteTestUsers() {
        const ids = Array.from(testUserIds).filter(id => id >= 0);
        const db = writeDb;
        await db.delete(users).where(inArray(users.id, ids));
    }
});
