/**
 * Returns true if the object is null or undefined.
 *
 * @param obj   An object to check.
 */
export function isNullOrUndefined(obj: number | string | unknown) {
    return obj === null || obj === undefined;
}

/**
 * Returns true if the object is null, undefined or only whitespace.
 *
 * @param str   A string to check.
 */
export function isNullOrWhitespace(str: string) {
    return str === null || str === undefined || str.replace(/\s/g, '').length === 0;
}
