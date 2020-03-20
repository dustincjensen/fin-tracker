import { IconName } from 'evergreen-ui';

export interface IAccountSummariesProps extends IAccountSummariesStateProps {}

export interface IAccountSummariesStateProps {
  accounts: Array<{
    accountId: string;
    iconName: IconName;
    balance: number;
    dateOfLastTransaction: string;
    name: string;
  }>;
}
