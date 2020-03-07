export interface AsNumberOptions {
    minimum?: number;
    maximum?: number;
    parse?: boolean;
    integer?: boolean;
}

export type ReplaceInterfaceProp<T extends {}, R extends keyof T, U> = Omit<T, R> & U;

export function asNumber(value: unknown, opts: AsNumberOptions, msg?: string): number {
    let num: number;
    if (typeof value === "string" && opts.parse) {
        if (opts.integer) {
            num = parseInt(value, 10);
        } else {
            num = parseFloat(value);
        }
    } else if (typeof value === "number") {
        num = value;
    } else {
        throw new Error(msg ?? "Expected value to be a number.");
    }

    if (Number.isNaN(num)) {
        throw new Error(msg ?? "Expected value to be not NaN.");
    }

    if (opts.integer && !Number.isInteger(num)) {
        throw new Error(msg ?? `Expected value to be an integer.`);
    }

    if (opts.maximum && num > opts.maximum) {
        throw new Error(msg ?? `Expected value to be less than ${opts.maximum}.`);
    }

    if (opts.minimum && num < opts.minimum) {
        throw new Error(msg ?? `Expected value to be greater than ${opts.minimum}.`);
    }

    return num;
}
