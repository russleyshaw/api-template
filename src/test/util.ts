import { expect } from "bun:test";

export function expectToBeDefined<T>(value: T | null | undefined): asserts value is T {
    expect(value).toBeDefined();
}
