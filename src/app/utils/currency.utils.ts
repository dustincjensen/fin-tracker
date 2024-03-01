/**
 * Rounds a value.
 * Useful for 0.2 + 0.1 = 0.3 instead of 0.30000000000004
 *
 * @param value   The value to round.
 */
export function round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}
