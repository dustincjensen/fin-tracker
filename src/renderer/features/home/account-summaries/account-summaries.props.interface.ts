import { IconName } from 'evergreen-ui';

export interface IAccountSummariesProps {
  accounts: Array<{
    accountId: string;
    iconName: IconName;
    balance: number;
    dateOfLastTransaction: string;
    name: string;
  }>;
}
