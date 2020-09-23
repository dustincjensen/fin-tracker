export interface IAutoCategoriesFilterProps {
  /**
   * The auto category filter.
   */
  autoCategoryFilter: string;

  /**
   * A function to set the current filter value.
   */
  setAutoCategoryFilter: (search: string) => void;
}
