import { isNullOrUndefined, isNullOrWhitespace } from './object.utils';

describe('utils', () => {
    describe('object', () => {
        describe('isNullOrUndefined', () => {
            const assertIsNullOrUndefined = (value: number | string | unknown, expected: boolean) => {
                expect(isNullOrUndefined(value)).toBe(expected);
            };

            it('should return true when object is null', () => assertIsNullOrUndefined(null, true));
            it('should return true when object is undefined', () => assertIsNullOrUndefined(undefined, true));
            it('should return false when object is not null or undefined', () => assertIsNullOrUndefined({}, false));
        });

        describe('isNullOrWhitespace', () => {
            const assertIsNullOrWhitespace = (value: string, expected: boolean) => {
                expect(isNullOrWhitespace(value)).toBe(expected);
            };

            it('should return true when string is null', () => assertIsNullOrWhitespace(null, true));
            it('should return true when string is undefined', () => assertIsNullOrWhitespace(undefined, true));
            it('should return true when string is " "', () => assertIsNullOrWhitespace(' ', true));
            it('should return true when string is "      "', () => assertIsNullOrWhitespace('      ', true));
            it('should return false when string is " a "', () => assertIsNullOrWhitespace(' a ', false));
        });
    });
});
