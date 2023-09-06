import { logger } from "../logger.js";
import { server } from "../main.js";
import path from "path";
import { promises as fsp } from "node:fs";
const schema = server.swagger();

const outputPath = process.argv[2] ?? "./swagger.json";
const outputDir = path.dirname(outputPath);

await fsp.mkdir(outputDir, { recursive: true });
await fsp.writeFile(outputPath, JSON.stringify(schema, null, 4), "utf8");

logger.info(`Swagger schema exported to ${outputPath}`);

process.exit(0);
