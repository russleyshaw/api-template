import { TSchema, TypeGuard } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { defaultsDeep } from "lodash";

export function encodeWithDefaults<T extends TSchema>(schema: T, data: unknown) {
    const defaultedSchema = parseDefaults(schema);

    const defaultedData = defaultsDeep(data, defaultedSchema);
    const errors = [...Value.Errors(schema, defaultedData)];

    if (errors.length > 0) {
        for (const error of errors) {
            console.error(`At ${error.path}, ${error.message}, got ${JSON.stringify(error.value)}`);
        }

        throw new Error(`Failed to encode data`);
    }

    const encoded = Value.Encode(schema, defaultedData);
    return encoded;
}

export function parseDefaults(schema: TSchema) {
    if (schema === undefined) return undefined;

    if (TypeGuard.TString(schema)) {
        return schema.default;
    }

    if (TypeGuard.TNumber(schema)) {
        return schema.default;
    }

    if (TypeGuard.TBoolean(schema)) {
        return schema.default;
    }

    if (TypeGuard.TOptional(schema)) {
        return parseDefaults(schema.type);
    }

    if (TypeGuard.TObject(schema)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const obj: any = {};
        Object.entries(schema.properties).forEach(([key, value]) => {
            obj[key] = parseDefaults(value);
        });
        return obj;
    }

    if (TypeGuard.TArray(schema)) {
        return schema.default;
    }

    return undefined;
}
