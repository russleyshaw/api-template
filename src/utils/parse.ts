export function safeParseInt(val: string | null | undefined): number | undefined {
    if (val == null) return undefined;

    const parsed = parseInt(val, 10);
    if (Number.isNaN(parsed)) return undefined;

    return parsed;
}
