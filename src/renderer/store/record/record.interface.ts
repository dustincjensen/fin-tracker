export interface IRecord {
  /**
   * The ID of the record.
   */
  id: string;

  /**
   * The ID of the account the record belongs to.
   */
  accountId: string;

  /**
   * The date the record took place.
   */
  date: string;

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

  /**
   * The balance of the account up to and including this record.
   */
  balance?: number;
}
