import { Elysia } from "elysia";
import log from "../server/plugins/debug";
import common from "./common";
import example from "./example";

export default (app: Elysia) => {
    return (
        app
            .use(log("Setting up controllers"))
            .use(common)
            // EDITME: Add more controllers here
            .use(example)
    );
};
