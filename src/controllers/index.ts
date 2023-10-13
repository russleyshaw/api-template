import { Elysia } from "elysia";
import common from "./common";
import example from "./example";

export default new Elysia()
    .use(common)
    // EDITME: Add more controllers here
    .use(example);
