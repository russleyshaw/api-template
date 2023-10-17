import controllers from "../controllers";
import base from "./base";
import debug from "./plugins/debug";

export default base.use(debug("Finalizing server")).use(controllers);
