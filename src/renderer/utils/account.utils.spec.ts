import { getAccountStartDate } from './account.utils';

describe('utils', () => {
  describe('account', () => {
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
