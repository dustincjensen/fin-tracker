export interface ICategorySelectProps {
  /**
   * The record with category and id.
   */
  record: {
    id: string;
    category: {
      color: string;
      label: string;
      value: string;
    };
  };

  /**
   * The categories to choose from.
   */
  categories: Array<{
    color: string;
    label: string;
    value: string;
  }>;

  /**
   * The function to update the record with a category id.
   */
  updateCategory: (recordId: string, categoryId: string) => void;
}
