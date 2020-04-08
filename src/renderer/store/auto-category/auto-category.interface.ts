export interface IAutoCategory {
  /**
   * The ID of the auto category.
   */
  id: string;

  /**
   * The account this auto category applies to.
   */
  accountId: string;

  /**
   * The description to match on the record when assigning.
   */
  description: string;

  /**
   * The ID of the category to assign.
   */
  categoryId: string;
}