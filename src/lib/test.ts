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
