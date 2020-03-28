import { IconName } from 'evergreen-ui';
import { AccountType } from '../store/account/account.type';

export const accountTypeLabels: Record<AccountType, string> = {
  Chequing: 'Chequing',
  Savings: 'Savings',
  CreditCard: 'Credit Card',
};

export const accountTypeNameValuePairs: Array<{ value: AccountType; name: string }> = [
  { value: 'Chequing', name: 'Chequing' },
  { value: 'Savings', name: 'Savings' },
  { value: 'CreditCard', name: 'Credit Card' },
];

export const accountTypeIconNames: Record<AccountType, IconName> = {
  Chequing: 'bank-account',
  Savings: 'bank-account',
  CreditCard: 'credit-card',
};
