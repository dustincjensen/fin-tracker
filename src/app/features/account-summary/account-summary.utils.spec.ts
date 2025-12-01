import moment from 'moment';
import { isUpdateNeededForAccount } from './account-summary.utils';

describe('Utils', () => {
    describe('Account Summary', () => {
        describe('isUpdateNeededForAccount', () => {
            it('should return true if last updated date is between 2 and 6 months ago', () => {
                const date = moment().subtract(3, 'months').toISOString();
                const result = isUpdateNeededForAccount(date);
                expect(result).toBe(true);
            });

            it('should return false if date is within the current month', () => {
                const date = moment().toISOString();
                const result = isUpdateNeededForAccount(date);
                expect(result).toBe(false);
            });

            it('should return false if date is within the previous month', () => {
                const date = moment().subtract(1, 'months').toISOString();
                const result = isUpdateNeededForAccount(date);
                expect(result).toBe(false);
            });

            it('should return false if date is more than 6 months ago', () => {
                const date = moment().subtract(7, 'months').toISOString();
                const result = isUpdateNeededForAccount(date);
                expect(result).toBe(false);
            });
        });
    });
});
