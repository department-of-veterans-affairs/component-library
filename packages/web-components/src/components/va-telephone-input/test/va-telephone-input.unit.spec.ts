import { VaTelephoneInput } from '../va-telephone-input';

describe('getNumberRange', () => {
  let instance: VaTelephoneInput;
  beforeEach(() => {
    instance = new VaTelephoneInput();
  });

  it('returns empty string for empty array', () => {
    expect(instance.getNumberRange([])).toBe('');
  });

  it('returns single value for one number', () => {
    expect(instance.getNumberRange([7])).toBe('7');
  });

  it('returns range for consecutive numbers', () => {
    expect(instance.getNumberRange([7,8,9,10])).toBe('7 to 10');
  });

  it('returns list for non-consecutive numbers', () => {
    expect(instance.getNumberRange([7,9,10])).toBe('7, 9 or 10');
  });

  it('returns mixed ranges and values', () => {
    expect(instance.getNumberRange([7,8,10,12,13,14])).toBe('7, 8, 10, 12, 13 or 14');
  });
});