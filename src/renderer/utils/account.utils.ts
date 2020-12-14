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

/**
 * Returns a date string for the account start date.
 * There are 2 reasons why this function exists.
 *    1. The months are zero indexed, so I don't forget.
 *    2. The months are stored as strings, but typed as numbers, this makes it inconvenient.
 * 
 * @param startYear   The starting year of the account.
 * @param startMonth  The starting month of the account.
 */
export function getAccountStartDate(startYear: number, startMonth: number): string {
  // TODO fix typing
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return `${startYear}-${parseInt(startMonth as any) + 1}-01`;
}