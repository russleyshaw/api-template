import { OpenAPIV3_1 as OpenAPI } from "openapi-types";

export const COMMON_TAG = createTag("Common", "Common service");
export const EXAMPLE_TAG = createTag("Example", "Example service");

export const ALL_TAGS = [
    COMMON_TAG,

    // EDITME: Add more tags here
    EXAMPLE_TAG,
];

function createTag(name: string, description: string): OpenAPI.TagObject {
    return { name, description } as const;
}
