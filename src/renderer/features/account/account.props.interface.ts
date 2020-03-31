export interface IAccountProps extends IAccountStateProps, IAccountOwnProps {}

export interface IAccountStateProps {
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
}

export interface IAccountOwnProps {
  /**
   * The account to load.
   */
  accountId: string;
}
