import { edenTreaty } from "@elysiajs/eden";
import { CONFIG } from "../../config";

// Ensure that the server is running before running tests
import mainInstance from "../../main";

export type TestClient = ReturnType<typeof edenTreaty<typeof mainInstance>>;
export const testClient: TestClient = edenTreaty<typeof mainInstance>(
    `http://localhost:${CONFIG.port}`
);
