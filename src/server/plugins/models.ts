import Elysia from "elysia";
import { LOGGER } from "../../logger";
import { NEW_USER_SCHEMA, USER_LIST_SCHEMA, USER_SCHEMA } from "../../schemas/example";
import { INFO_SCHEMA, PONG_SCHEMA } from "../../schemas/common";

LOGGER.debug("Registering schemas");
export default new Elysia()
    .model({
        // Common
        pong: PONG_SCHEMA,
        info: INFO_SCHEMA,
    })
    .model({
        // Example
        user: USER_SCHEMA,
        newUser: NEW_USER_SCHEMA,
        userList: USER_LIST_SCHEMA,
    });
