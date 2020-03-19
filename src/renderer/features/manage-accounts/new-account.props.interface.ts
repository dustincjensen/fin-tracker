import { IAccount } from '../../store/account/account.interface';

export interface INewAccountProps extends INewAccountDispatchProps {}

export interface INewAccountDispatchProps {
  /**
   * Action to save a new account.
   */
  saveNewAccount: (account: IAccount) => void;
}
