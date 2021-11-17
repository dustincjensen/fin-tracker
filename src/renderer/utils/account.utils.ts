import { BankAccountIcon, ChartIcon, CreditCardIcon } from 'evergreen-ui';
import { AccountType } from '../store/account/account.type';

export const accountTypeLabels: Record<AccountType, string> = {
  Chequing: 'Chequing',
  Savings: 'Savings',
  CreditCard: 'Credit Card',
  RRSP: 'RRSP',
  TFSA: 'TFSA',
};

export const accountTypeNameValuePairs: Array<{ value: AccountType; name: string }> = [
  { value: 'Chequing', name: 'Chequing' },
  { value: 'Savings', name: 'Savings' },
  { value: 'CreditCard', name: 'Credit Card' },
  { value: 'RRSP', name: 'Registered Retirement Savings Plan' },
  { value: 'TFSA', name: 'Tax-free Savings Account' },
];

// TODO typing for evergreen icon components is no longer typed.
export type IconType = typeof BankAccountIcon;
export const accountTypeIcons: Record<AccountType, IconType> = {
  Chequing: BankAccountIcon,
  Savings: BankAccountIcon,
  CreditCard: CreditCardIcon,
  RRSP: ChartIcon,
  TFSA: ChartIcon,
};

export const accountRoutes: Record<AccountType, string> = {
  Chequing: '/account',
  Savings: '/account',
  CreditCard: '/account',
  RRSP: '/investment',
  TFSA: '/investment',
};

/**
 * Returns true if the account is a bank account type.
 *
 * @param type  The type of the account.
 */
export function isBankAccount(type: AccountType) {
  return ['Chequing', 'Savings', 'CreditCard'].includes(type);
}

/**
 * Returns true if the account is an investment account type.
 *
 * @param type  The type of the account.
 */
export function isInvestmentAccount(type: AccountType) {
  return ['RRSP', 'TFSA'].includes(type);
}

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
