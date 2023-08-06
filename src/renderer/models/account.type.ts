import { AccountType } from './account-type.type';

export type Account = {
  /**
   * The ID of the account.
   */
  id: string;

  /**
   * The name of the account.
   */
  name: string;

  /**
   * The balance to start tracking this account.
   */
  startingBalance?: number;

  /**
   * The year the starting balance is from.
   */
  startYear: number;

  /**
   * The month the starting balance is from.
   * Months are 0 indexed.
   */
  startMonth: number;

  /**
   * The year the account was no longer tracked.
   */
  endYear?: number;

  /**
   * The month the account was no longer tracked.
   * Months are 0 indexed.
   */
  endMonth?: number;

  /**
   * True if the account is archived, false or undefined otherwise.
   */
  archived?: boolean;

  /**
   * The type of the account.
   */
  accountType: AccountType;
};
