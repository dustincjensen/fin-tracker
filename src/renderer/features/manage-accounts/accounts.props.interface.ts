import { IAccount } from '../../store/account/account.interface';

export interface IAccountProps extends IAccountStateProps, IAccountDispatchProps {}

export interface IAccountStateProps {
  /**
   * The list of accounts to display.
   */
  accounts: IAccount[];
}

export interface IAccountDispatchProps {
  /**
   * Action to delete an account.
   */
  deleteAccount: (account: IAccount) => void;
}
