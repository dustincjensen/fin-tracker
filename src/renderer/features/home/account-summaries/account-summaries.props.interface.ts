import { IconType } from '../../../utils/account.utils';

export interface IAccountSummariesProps {
  accounts: Array<{
    accountId: string;
    icon: IconType;
    balance: number;
    dateOfLastTransaction: string;
    name: string;
  }>;
}
