import { round } from "./currency.utils";


describe('utils', () => {
  describe('currency', () => {
    describe('round', () => {
      const assertRound = (value: number, expected: number) => {
        expect(round(value)).toBe(expected);
      };

      it('should round down to 2 decimals', () => assertRound(2.111111111111111, 2.11));
      it('should not round when one decimal place', () => assertRound(2.1, 2.1));
      it('should round .115 up', () => assertRound(.115, .12));
      it('should round .114 down', () => assertRound(.114, .11));
    });
  });
});