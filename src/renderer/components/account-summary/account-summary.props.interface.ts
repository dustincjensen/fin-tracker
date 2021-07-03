import { IconType } from '../../utils/account.utils';

export interface IAccountSummaryProps {
  /**
   * The ID of the account.
   */
  accountId: string;

  /**
   * The name of the icon to use.
   */
  icon: IconType;

  /**
   * The name of the account.
   */
  name: string;

  /**
   * The date of the last transaction associated with the account.
   */
  dateOfLastTransaction: string;

  /**
   * The balance of the account.
   */
  balance: number;
}
