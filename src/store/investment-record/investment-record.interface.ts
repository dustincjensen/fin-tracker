export interface IInvestmentRecord {
  /**
   * The ID of the record.
   */
  id: string;

  /**
   * The ID of the account the record belongs to.
   */
  accountId: string;

  /**
   * The currency type for the record.
   */
  investmentCurrency: string;

  /**
   * The date the record took place.
   */
  date: string;

  /**
   * The balance of the account on this date.
   */
  balance: number;
}
