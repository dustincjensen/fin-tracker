import { IconName } from 'evergreen-ui';

export interface IAccountLinkProps {
  /**
   * The ID of the account.
   */
  id: string;

  /**
   * The name of the account.
   */
  name: string;

  /**
   * The evergreen ui icon name to display.
   */
  iconName: IconName;
}
