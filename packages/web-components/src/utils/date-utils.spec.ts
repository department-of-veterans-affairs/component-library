import { Components } from '../components';
import { checkLeapYear, validate } from './date-utils';

describe('checkLeapYear', () => {
  it('determines an input year is a leap year', () => {
    expect(checkLeapYear(1996)).toBeTruthy();
    expect(checkLeapYear(1995)).toBeFalsy();
    expect(checkLeapYear(199)).toBeFalsy();
  });
});

describe('validate', () => {
  it('indicates when the year is below the accepted range', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = 1500;
    const month = 1;
    const day = 1;
    const currentYear = new Date().getFullYear();

    validate(memorableDateComponent, year, month, day);

    expect(memorableDateComponent.error).toEqual(`Please enter a year between 1900 and ${currentYear + 100}`);
    expect(memorableDateComponent.invalidYear).toEqual(true);
  });

  it('indicates when the year is above the accepted range', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = 3000;
    const month = 1;
    const day = 1;
    const currentYear = new Date().getFullYear();

    validate(memorableDateComponent, year, month, day);

    expect(memorableDateComponent.error).toEqual(`Please enter a year between 1900 and ${currentYear + 100}`);
    expect(memorableDateComponent.invalidYear).toEqual(true);
  });

  it('indicates when the month is above the accepted range', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = 2000;
    const month = 15;
    const day = 1;

    validate(memorableDateComponent, year, month, day);

    expect(memorableDateComponent.error).toEqual('Please enter a month between 1 and 12');
    expect(memorableDateComponent.invalidMonth).toEqual(true);
  });

  it('indicates when the day is above the accepted range', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = 2000;
    const month = 1;
    const day = 35;

    validate(memorableDateComponent, year, month, day);

    expect(memorableDateComponent.error).toEqual('Please enter a day between 1 and 31');
    expect(memorableDateComponent.invalidDay).toEqual(true);
  });

  it('indicates when the day is below the accepted range', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = 2000;
    const month = 1;
    const day = null;

    validate(memorableDateComponent, year, month, day);

    expect(memorableDateComponent.error).toEqual('Please enter a day between 1 and 31');
    expect(memorableDateComponent.invalidDay).toEqual(true);
  });

  it('does not validate day for the monthYearOnly variant', () => {
    const dateComponent = {} as Components.VaDate;
    const year = 2000;
    const month = 1;
    const day = null;

    validate(dateComponent, year, month, day, true);

    expect(dateComponent.error).toEqual(null);
  });

  describe('required components', () => {
    it('indicates when the year is missing', () => {
      const memorableDateComponent = { required: true} as Components.VaMemorableDate;
      const year = null;
      const month = 1;
      const day = 1;

      validate(memorableDateComponent, year, month, day);

      expect(memorableDateComponent.error).toEqual('Please enter a complete date');
      expect(memorableDateComponent.invalidYear).toEqual(true);
    });

    it('indicates when the month is missing', () => {
      const memorableDateComponent = { required: true} as Components.VaMemorableDate;
      const year = 2000;
      const month = null;
      const day = 1;

      validate(memorableDateComponent, year, month, day);

      expect(memorableDateComponent.error).toEqual('Please enter a complete date');
      expect(memorableDateComponent.invalidMonth).toEqual(true);
    });

    it('indicates when the day is missing', () => {
      const memorableDateComponent = { required: true} as Components.VaMemorableDate;
      const year = 2000;
      const month = 1;
      const day = null;

      validate(memorableDateComponent, year, month, day);

      expect(memorableDateComponent.error).toEqual('Please enter a complete date');
      expect(memorableDateComponent.invalidDay).toEqual(true);
    });

    it('does not error on a missing day for the monthYearOnly variant', () => {
      const memorableDateComponent = { required: true} as Components.VaMemorableDate;
      const year = 2000;
      const month = 1;
      const day = null;

      validate(memorableDateComponent, year, month, day, true);

      expect(memorableDateComponent.error).toEqual(null);
    });
  });

  it('removes error indicators when the values are valid', () => {
    const memorableDateComponent = { error: 'Some error'} as Components.VaMemorableDate;
    const year = 2000;
    const month = 1;
    const day = 1;

    validate(memorableDateComponent, year, month, day);

    expect(memorableDateComponent.error).toEqual(null);
    expect(memorableDateComponent.invalidYear).toEqual(false);
    expect(memorableDateComponent.invalidMonth).toEqual(false);
    expect(memorableDateComponent.invalidDay).toEqual(false);
  });
});
