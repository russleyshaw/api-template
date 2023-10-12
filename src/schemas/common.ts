import { Type } from "@sinclair/typebox";
import { LOGGER } from "../logger";
import Elysia from "elysia";

const PONG_SCHEMA = Type.Object(
    {
        pong: Type.String({
            description: "Pong message",
        }),
    },
    {
        title: "Pong",
        description: "Pong message",
    },
);

LOGGER.debug("Registering common schemas");
export default new Elysia().model({
    // Common
    pong: PONG_SCHEMA,
});
