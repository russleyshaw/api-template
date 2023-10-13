import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { CONFIG } from "../../config";
import * as md from "../../lib/markdown";
import { ALL_TAGS } from "../../tags";

// TODO: Swagger fails when exported as a function. Change this to a function when it's fixed.
export default async function () {
    return swagger({
        documentation: {
            info: {
                title: CONFIG.appDisplayName,
                version: CONFIG.appVersion,
                contact: {
                    name: CONFIG.appAuthorName,
                    email: CONFIG.appAuthorEmail,
                },
                description: await getSwaggerDescription(),
            },

            tags: ALL_TAGS,
        },
    });
}

async function getSwaggerDescription() {
    const readmeFile = Bun.file("./README.md");

    return [
        `> ${CONFIG.appDescription}`,
        md.hr(),

        await readmeFile.text(),

        md.hr(),
        md.h2("Links"),
        ...Object.entries(CONFIG.links).map(([name, url]) => md.li(md.a(name, url))),
    ].join("\n");
}
