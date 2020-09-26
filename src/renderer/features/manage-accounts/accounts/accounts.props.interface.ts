import { IAccount } from '../../../store/account/account.interface';

export interface IAccountProps {
  /**
   * The list of accounts to display.
   */
  accounts: IAccount[];
}
