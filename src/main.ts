import express from "express";
import logger from "./logger";
import * as middleware from "./utils/middleware";
import { PORT } from "./vars";

const app = express();

app.use(middleware.logging);

app.use(middleware.error);

app.listen(PORT, () => {
    logger.info(`Listening on ${PORT}...`, { port: PORT });
});
