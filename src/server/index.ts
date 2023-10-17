import controllers from "../controllers";
import base from "./base";
import debug from "./plugins/debug";

const server = base.use(debug("Finalizing server")).use(controllers);

export type Server = typeof server;
export default server;
