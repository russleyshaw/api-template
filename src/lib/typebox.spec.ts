import { Type } from "@sinclair/typebox";
import { describe, expect, test } from "bun:test";
import { encodeWithDefaults, parseDefaults } from "./typebox";
import { expectThrow } from "./test";

const FOO_SCHEMA = Type.Object({
    foo: Type.String({
        default: "foo",
        description: "Foo",
    }),
    bar: Type.String({
        description: "Bar",
    }),
    baz: Type.Optional(
        Type.String({
            default: "baz",
            description: "Baz",
        }),
    ),
});

describe("lib/typebox.ts", () => {
    describe("parseDefaults", () => {
        test("should parse defaults", () => {
            const defaults = parseDefaults(FOO_SCHEMA);

            expect(defaults.foo).toBe("foo");
            expect(defaults.bar).toBeUndefined();
            expect(defaults.baz).toBe("baz");
        });
    });

    describe("encodeWithDefaults", () => {
        test("should encode with defaults", () => {
            const obj = encodeWithDefaults(FOO_SCHEMA, { foo: "bar", bar: "bar2" });

            expect(obj.foo).toBe("bar");
            expect(obj.bar).toBe("bar2");
            expect(obj.baz).toBe("baz");
        });

        test("should fail to encode with invalid data", () => {
            expectThrow(() => {
                return encodeWithDefaults(FOO_SCHEMA, { foo: "bar" });
            });
        });
    });
});
