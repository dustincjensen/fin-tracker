import { IconName } from 'evergreen-ui';

export interface IAccountSummaryProps {
  /**
   * The ID of the account.
   */
  accountId: string;

  /**
   * The name of the icon to use.
   */
  iconName: IconName;

  /**
   * The name of the account.
   */
  name: string;

  /**
   * The date of the last transaction associated with the account.
   */
  dateOfLastTransaction: string;

  // TODO? balance threshold colors
  // VISA < 0 = Green
  // VISA > 0 < 500 = Regular
  // VISA > 500 = Red?

  /**
   * The balance of the account.
   */
  balance: number;
}
