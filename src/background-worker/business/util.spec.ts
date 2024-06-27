import { Record } from '../../app/models/record.type';
import { sortByDate } from './util';

describe('utils', () => {
    describe('sortByDate', () => {
        it('should return 0 when the dates are identical', () => {
            const result = sortByDate({ date: '2023-08-17' } as Record, { date: '2023-08-17' } as Record);

            expect(result).toBe(0);
        });
    });
});
