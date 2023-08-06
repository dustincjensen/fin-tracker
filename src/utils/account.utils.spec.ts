import { AccountType } from '../models/account-type.type';
import { getAccountStartDate, isBankAccount, isInvestmentAccount } from './account.utils';

describe('utils', () => {
    describe('account', () => {
        describe('isBankAccount', () => {
            const check = (accountType: AccountType, expected: boolean) => {
                expect(isBankAccount(accountType)).toBe(expected);
            };

            it('should return true when account type is Chequing', () => check('Chequing', true));
            it('should return true when account type is Savings', () => check('Savings', true));
            it('should return true when account type is CreditCard', () => check('CreditCard', true));
            it('should return false when account type is RRSP', () => check('RRSP', false));
            it('should return false when account type is TFSA', () => check('TFSA', false));
        });

        describe('isInvestmentAccount', () => {
            const check = (accountType: AccountType, expected: boolean) => {
                expect(isInvestmentAccount(accountType)).toBe(expected);
            };

            it('should return false when account type is Chequing', () => check('Chequing', false));
            it('should return false when account type is Savings', () => check('Savings', false));
            it('should return false when account type is CreditCard', () => check('CreditCard', false));
            it('should return true when account type is RRSP', () => check('RRSP', true));
            it('should return true when account type is TFSA', () => check('TFSA', true));
        });

        describe('getAccountStartDate', () => {
            it('should return the 1st of December', () => {
                expect(getAccountStartDate(2020, 11)).toBe('2020-12-01');
            });

            it('should return the 1st of January', () => {
                // TODO this is good enough for moment to figure it out.
                expect(getAccountStartDate(2020, 0)).toBe('2020-1-01');
            });
        });
    });
});
