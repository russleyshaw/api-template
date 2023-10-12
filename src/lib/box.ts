export type Box<T> = { value: T };

export function makeBox<T>(value: T): Box<T> {
    return { value };
}
