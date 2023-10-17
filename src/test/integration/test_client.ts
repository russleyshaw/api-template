import { edenTreaty } from "@elysiajs/eden";
import { CONFIG } from "../../config";

import type { Server } from "../../server";

export type TestClient = ReturnType<typeof edenTreaty<Server>>;
export const testClient: TestClient = edenTreaty<Server>(`http://localhost:${CONFIG.testPort}`);
