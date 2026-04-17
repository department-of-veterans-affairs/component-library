import { CountryCode } from 'libphonenumber-js/min';
import { mapCountry, countDigitsUpTo, findPositionForDigitCount } from "../utils";

describe('mapcountry()', () => {
  it('returns the correct country', () => {
    expect(mapCountry('US')).toBe('US');
    expect(mapCountry('PN' as CountryCode)).toBe('NZ');
    expect(mapCountry('FAKE' as CountryCode)).toBe(undefined);
  });
});

describe('cursor utils', () => {
  const str = 'abc123efg456hij789';
  const phone = '(234) 567-8900';

  describe('countDigitsUpTo', () => {
    it('finds the number of digits up to an index in a string', () => {
      expect(countDigitsUpTo(str, 12)).toEqual(6);
    });
    it('returns 0 when index is 0', () => {
      expect(countDigitsUpTo(str, 0)).toEqual(0);
    });
    it('returns 0 when string has no digits', () => {
      expect(countDigitsUpTo('abcdef', 4)).toEqual(0);
    });
    it('counts all digits when index exceeds string length', () => {
      expect(countDigitsUpTo(str, 100)).toEqual(9);
    });
    it('returns 0 for an empty string', () => {
      expect(countDigitsUpTo('', 5)).toEqual(0);
    });
    it('counts digits correctly in a formatted phone number', () => {
      // "(234) 5" = index 7 → digits 2,3,4,5 = 4
      expect(countDigitsUpTo(phone, 7)).toEqual(4);
    });
  });

  describe('findPositionForDigitCount', () => {
    it('finds the correct position in a string given a digit count', () => {
      expect(findPositionForDigitCount(str, 3)).toEqual(6);
    });
    it('returns 0 when digit count is 0', () => {
      expect(findPositionForDigitCount(str, 0)).toEqual(0);
    });
    it('returns string length when digit count exceeds total digits', () => {
      expect(findPositionForDigitCount(str, 20)).toEqual(str.length);
    });
    it('returns string length for an empty string', () => {
      expect(findPositionForDigitCount('', 3)).toEqual(0);
    });
    it('finds the correct position in a formatted phone number', () => {
      // "(234) 567-8900" → after 4th digit (5) is position 7
      expect(findPositionForDigitCount(phone, 4)).toEqual(7);
    });
  });
});
