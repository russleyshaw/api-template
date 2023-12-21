export function expectThrow(cb: () => void) {
    let err: unknown;
    try {
        cb();
        throw new Error("Expected an exception to be thrown");
    } catch (e) {
        err = e;
    }

    return err;
}

export function expectExists<T>(value: T, msg?: string): NonNullable<T> {
    if (value == null) {
        throw new Error(msg ?? "Expected value to exist");
    }

    return value;
}
