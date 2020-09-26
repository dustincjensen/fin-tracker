export interface ICategoriesFilterProps {
  /**
   * The category filter.
   */
  categoryFilter: string;

  /**
   * A function to set the current filter value.
   */
  setCategoryFilter: (search: string) => void;

  /**
   * A function when invoked will display the new category form.
   */
  openNewCategory: () => void;
}
