/**
 * Returns the partial object cast into the full version.
 *
 * @param obj   A partial implementation of the interface.
 */
export function build<T>(obj: Partial<T>): T {
    return obj as T;
}
