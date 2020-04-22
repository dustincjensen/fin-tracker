import { IAccount } from '../../store/account/account.interface';

export interface IAccountsSidebarProps extends IAccountsSidebarStateProps {}

export interface IAccountsSidebarStateProps {
  /**
   * The list of accounts to display.
   */
  accounts: IAccount[];
}
