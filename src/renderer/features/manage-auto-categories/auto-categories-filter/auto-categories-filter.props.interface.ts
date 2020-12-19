export interface IAutoCategoriesFilterProps {
  /**
   * The auto category filter.
   */
  autoCategoryFilter: string;

  /**
   * A function to set the current filter value.
   */
  setAutoCategoryFilter: (search: string) => void;

  /**
   * True if archived accounts should be shown, false otherwise.
   */
  showArchived: boolean;

  /**
   * A function to toggle show archived.
   */
  toggleShowArchived: () => void;
}
