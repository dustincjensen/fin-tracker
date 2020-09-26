export interface IAccountProps {
  /**
   * Whether or not the account has records.
   */
  hasRecords: boolean;

  /**
   * The month/year we should select when opening the account page.
   */
  startingDate: string;

  /**
   * The years of records we have for this account.
   */
  years: string[];

  /**
   * The account to load.
   */
  accountId: string;
}
