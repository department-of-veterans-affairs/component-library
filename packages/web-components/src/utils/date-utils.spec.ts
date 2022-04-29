import { isFullDate } from './date-utils';

describe('isFullDate', () => {
  it('determines if a full YYYY-MM-DD string is provided for a complete date', () => {
    expect(isFullDate('1995-05-03')).toBeTruthy();
    expect(isFullDate('ABCD-05-03')).toBeFalsy();
    expect(isFullDate('1995-05-')).toBeFalsy();
    expect(isFullDate('19950503')).toBeFalsy();
  });
});
