import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { CONFIG } from "../../config";
import { ALL_TAGS } from "../../tags";
import debug from "./debug";

const description = await getSwaggerDescription();
export default (app: Elysia) => {
    return app.use(debug("Plugin: Setting up swagger")).use(
        swagger({
            documentation: {
                info: {
                    title: CONFIG.appDisplayName,
                    version: CONFIG.appVersion,
                    contact: {
                        name: CONFIG.appAuthorName,
                        email: CONFIG.appAuthorEmail,
                    },
                    description,
                },

                tags: ALL_TAGS,
            },
        }),
    );
};

async function getSwaggerDescription() {
    const readmeFile = Bun.file("./README.md");
    const text = await readmeFile.text();
    return text;
}
