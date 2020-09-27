import { newGuid } from './guid.utils';

const validChars = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  '-',
];

describe('utils', () => {
  describe('guid', () => {
    it('should return a string containing hexadecimal characters in the correct shape', () => {
      const result = newGuid();
      expect(result.length).toBe(36);
      expect(result.split('').every(c => validChars.some(d => c === d))).toBe(true);
    });
  });
});
