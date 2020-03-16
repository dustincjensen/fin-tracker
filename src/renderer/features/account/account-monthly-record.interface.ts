export interface IAccountMonthlyRecord {
  /**
   * The ID of the record.
   */
  id: string;

  /**
   * The ID of the account the record is associated with.
   */
  accountId: string;

  /**
   * The date of the record.
   */
  date: string;

  /**
   * The description of the record.
   */
  description: string;

  /**
   * The debit of the record.
   */
  debit: string;

  /**
   * The credit of the record.
   */
  credit: string;

  /**
   * The new balance of the account after this record took place.
   */
  balance: string;
}
