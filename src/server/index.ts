import Elysia from "elysia";
import base from "./base";
import controllers from "../controllers";

export default new Elysia().use(base).use(controllers);
