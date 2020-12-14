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
   * The month and years of records we have for this account.
   */
  monthAndYears: number[][];

  /**
   * The account to load.
   */
  accountId: string;

  /**
   * True if the account is archived, false otherwise.
   */
  archived: boolean;
}
