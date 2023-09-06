import { OpenAPIV3_1 as OpenAPI } from "openapi-types";

export const COMMON_TAG: OpenAPI.TagObject = {
    name: "Common",
    description: "Common set of service information.",
} as const;

export const EXAMPLE_TAG: OpenAPI.TagObject = {
    name: "Example",
    description: "Example set of operations.",
} as const;

export const ALL_TAGS = [
    COMMON_TAG,

    // Add more tags here
    EXAMPLE_TAG,
] as const;
