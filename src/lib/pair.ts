export type Pair<T, U> = [first: T, second: U];

export function makePair<T, U>(first: T, second: U): Pair<T, U> {
    return [first, second];
}

export function clonePair<T, U>(p: Pair<T, U>): Pair<T, U> {
    return [p[0], p[1]];
}
