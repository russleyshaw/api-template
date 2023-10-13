export function safeParseInt(value: string | undefined, fallback: number): number;
export function safeParseInt(value: string | undefined, fallback?: number): number | undefined {
    if (value == null) {
        return fallback;
    }

    const parsed = parseInt(value);
    return isNaN(parsed) ? fallback : parsed;
}
