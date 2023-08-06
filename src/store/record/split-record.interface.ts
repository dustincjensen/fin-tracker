export interface ISplitRecord {
  /**
   * The ID of the record.
   */
  id: string;

  /**
   * The description of the record.
   */
  description: string;

  /**
   * The ID of the category for this record.
   */
  categoryId?: string;

  /**
   * The debit of the record.
   */
  debit?: number;

  /**
   * The credit of the record.
   */
  credit?: number;
}
