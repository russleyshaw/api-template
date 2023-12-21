import Elysia from "elysia";
import { ALL_SCHEMAS } from "../../schemas";
import debug from "./debug";
import { ErrorResponse } from "./errors";

export default new Elysia().use(debug("Plugin: Setting up models")).model({
    ...ALL_SCHEMAS,
    ErrorResponse,
});
