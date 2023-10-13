import Elysia from "elysia";
import { ALL_SCHEMAS } from "../../schemas";

export default new Elysia().model({
    ...ALL_SCHEMAS,
});
