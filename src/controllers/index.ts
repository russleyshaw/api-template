import log from "../server/plugins/debug";
import common from "./common";
import example from "./example";
import { BaseServer } from "../server/base";

export default (app: BaseServer) =>
    app
        .use(log("Setting up controllers"))
        .use(common)

        // EDITME: Add more controllers here
        .use(example);
