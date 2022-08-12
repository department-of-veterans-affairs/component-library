import { checkLeapYear } from './date-utils';

describe('checkLeapYear', () => {
  it('determines an input year is a leap year', () => {
    expect(checkLeapYear(1996)).toBeTruthy();
    expect(checkLeapYear(1995)).toBeFalsy();
    expect(checkLeapYear(199)).toBeFalsy();
  });
});
