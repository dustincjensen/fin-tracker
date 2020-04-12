/**
 * Creates a static width table cell for evergreen ui.
 *
 * @param width   The width of the static cell.
 */
export function createStaticWidthCell(width: number) {
  return {
    flex: 'none',
    width,
  };
}
