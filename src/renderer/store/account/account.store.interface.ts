import { IAccount } from './account.interface';

export interface IAccountStore {
  /**
   * The accounts belonging to a user.
   */
  accounts: { [id: string]: IAccount };
}
