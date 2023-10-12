import { edenTreaty } from "@elysiajs/eden";
import { CONFIG } from "../../config";
import { runningServer } from "../../main";

// Ensure that the server is running before running tests
runningServer;

export type TestClient = ReturnType<typeof edenTreaty<typeof runningServer>>;
export const testClient: TestClient = edenTreaty<typeof runningServer>(
    `http://localhost:${CONFIG.port}`,
);
