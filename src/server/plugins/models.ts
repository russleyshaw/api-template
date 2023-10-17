import Elysia from "elysia";
import { ALL_SCHEMAS } from "../../schemas";
import { ERROR_RESPONSE_SCHEMA } from "./errors";
import debug from "./debug";

export default new Elysia().use(debug("Plugin: Setting up models")).model({
    ...ALL_SCHEMAS,
    ERROR_RESPONSE_SCHEMA,
});
