export interface ICategoryTagProps {
  /**
   * The category to display.
   */
  category: {
    color: string;
    label: string;
    value: string;
  };

  /**
   * A function to invoke when the X is clicked on the category tag.
   * If undefined, the X will not display.
   */
  onClear?: () => void;
}
