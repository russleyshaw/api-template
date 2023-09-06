import { APP_PORT } from "./config.js";
import { registerControllers } from "./controllers/index.js";

import { createServer } from "./server.js";

const server = await createServer();

// Import all controllers after server.
await registerControllers(server);

await server.listen({ port: APP_PORT });

export { server };
