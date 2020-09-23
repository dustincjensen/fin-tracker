import { IAccount } from '../../../store/account/account.interface';

export interface IDeleteAccountProps {
  /**
   * The account to delete.
   */
  account: IAccount;

  /**
   * Action to call when the modal closes.
   */
  onClose: () => void;
}
