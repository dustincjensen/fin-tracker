/**
 * Rounds a value.
 * Useful for 0.2 + 0.1 = 0.3 instead of 0.30000000000004
 *
 * @param value   The value to round.
 */
export function round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

// TODO support localization
/**
 * Formats a number as a currency string.
 *
 * @param value The value to format.
 */
export function formatCurrency(value: number): string {
    return Intl.NumberFormat('en-CA', {
        // TODO support localization, and the currency icons from Evergreen UI?
        style: 'currency',
        currency: 'CAD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}

/**
 * Formats a number as a string with two decimal places and the appropriate thousands separators.
 *
 * @param value The value to format.
 */
export function formatNumber(value: number): string {
    return Intl.NumberFormat('en-CA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
}
