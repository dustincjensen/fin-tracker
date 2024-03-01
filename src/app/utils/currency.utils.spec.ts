import { round } from './currency.utils';

describe('utils', () => {
    describe('currency', () => {
        describe('round', () => {
            const assertRound = (value: number, expected: number) => {
                expect(round(value)).toBe(expected);
            };

            it('should round down to 2 decimals', () => assertRound(2.111111111111111, 2.11));
            it('should not round when one decimal place', () => assertRound(2.1, 2.1));
            it('should round 0.115 up', () => assertRound(0.115, 0.12));
            it('should round 0.114 down', () => assertRound(0.114, 0.11));
        });
    });
});
