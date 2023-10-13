import { Elysia } from "elysia";
import logger from "./plugins/logger";
import models from "./plugins/models";
import requestId from "./plugins/request_id";
import errors from "./plugins/errors";

import controllers from "../controllers";
import setup from "./setup";
import swagger from "./plugins/swagger";

export default new Elysia().use(swagger()).use(setup).use(controllers);
