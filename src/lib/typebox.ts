import { Static, TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export function encodeWithDefaults<T extends TSchema>(schema: T, data: Static<T>) {
    const value = Value.Cast(schema, data);
    const encoded = Value.Encode(schema, value);
    return encoded;
}
