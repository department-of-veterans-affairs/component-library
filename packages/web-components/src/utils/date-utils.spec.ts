import { Components } from '../components';
import { checkLeapYear, validate, formatDate, isDateAfter, isDateBefore, isDateSameDay, checkIsNaN } from './date-utils';

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

    expect(memorableDateComponent.error).toEqual(`year-range`);
    expect(memorableDateComponent.invalidYear).toEqual(true);
  });

  it('indicates when the year is above the accepted range', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = 3000;
    const month = 1;
    const day = 1;

    validate(memorableDateComponent, year, month, day);

    expect(memorableDateComponent.error).toEqual(`year-range`);
    expect(memorableDateComponent.invalidYear).toEqual(true);
  });

  it('indicates when the month is above the accepted range', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = 2000;
    const month = 15;
    const day = 1;

    validate(memorableDateComponent, year, month, day);

    expect(memorableDateComponent.error).toEqual('month-range');
    expect(memorableDateComponent.invalidMonth).toEqual(true);
  });

  it('indicates when the day is above the accepted range', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = 2000;
    const month = 1;
    const day = 35;

    validate(memorableDateComponent, year, month, day);

    expect(memorableDateComponent.error).toEqual('day-range');
    expect(memorableDateComponent.invalidDay).toEqual(true);
  });

  it('indicates when the day is above range for non-leap years', () => {
    const memorableDateComponent = { required: true} as Components.VaMemorableDate;
    const year = 2023;
    const month = 2;
    const day = 29;

    validate(memorableDateComponent, year, month, day);

    expect(memorableDateComponent.error).toEqual('day-range');
    expect(memorableDateComponent.invalidDay).toEqual(true);
  });

  it('indicates when the day is below the accepted range', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = 2000;
    const month = 1;
    const day = null;

    validate(memorableDateComponent, year, month, day);

    expect(memorableDateComponent.error).toEqual('day-range');
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

      expect(memorableDateComponent.error).toEqual('date-error');
      expect(memorableDateComponent.invalidYear).toEqual(true);
    });

    it('indicates when the month is missing', () => {
      const memorableDateComponent = { required: true} as Components.VaMemorableDate;
      const year = 2000;
      const month = null;
      const day = 1;

      validate(memorableDateComponent, year, month, day);

      expect(memorableDateComponent.error).toEqual('date-error');
      expect(memorableDateComponent.invalidMonth).toEqual(true);
    });

    it('indicates when the day is missing', () => {
      const memorableDateComponent = { required: true} as Components.VaMemorableDate;
      const year = 2000;
      const month = 1;
      const day = null;

      validate(memorableDateComponent, year, month, day);

      expect(memorableDateComponent.error).toEqual('date-error');
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

  it('overrides an invalid day message with an invalid month message', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = 2000;
    const month = null;
    const day = 500;

    validate(memorableDateComponent, year, month, day);

    expect(memorableDateComponent.error).toEqual('month-range');
    expect(memorableDateComponent.invalidMonth).toEqual(true);
    expect(memorableDateComponent.invalidDay).toEqual(true);
  });
});

describe('formatDate', () => {
  it('should return a formatted date when no options are provided', () => {
    const result = formatDate(new Date('Mon Jan 01 1990 02:00:00 GMT-0500'));
    expect(result).toEqual('Monday, January 1, 1990 at 2:00 AM')
  })
  it('should return a formatted date when options are provided', () => {
    const result = formatDate(new Date('Mon Jan 01 1990 02:00:00 GMT-0500'), {dateStyle: 'short', timeStyle: 'long'});
    expect(result).toEqual('1/1/90, 2:00:00 AM EST')
  })
});

describe('isDateAfter', () => {
  it('returns false if date1 is not after date2', () => {
    const date1 = new Date(Date.UTC(2021, 11, 17, 8, 24, 0));
    const date2 = new Date(Date.UTC(2022, 11, 17, 8, 24, 0));
    expect(isDateAfter(date1, date2)).toEqual(false);
  });

  it('returns true if date1 is after date2', () => {
    const date1 = new Date(Date.UTC(2022, 11, 17, 8, 24, 0));
    const date2 = new Date(Date.UTC(2021, 11, 17, 8, 24, 0));
    expect(isDateAfter(date1, date2)).toEqual(true);
  });
});

describe('isDateBefore', () => {
  it('returns true if date1 is before date2', () => {
    const date1 = new Date(Date.UTC(1995, 11, 17, 8, 24, 0));
    const date2 = new Date(Date.UTC(1996, 11, 17, 8, 24, 0));
    expect(isDateBefore(date1, date2)).toEqual(true);
  });

  it('returns false if date1 is not before date2', () => {
    const date1 = new Date(Date.UTC(1996, 11, 17, 8, 24, 0));
    const date2 = new Date(Date.UTC(1995, 11, 17, 8, 24, 0));
    expect(isDateBefore(date1, date2)).toEqual(false);
  });
});

describe('isDateSameDay', () => {
  it('returns true if date1 is on the same day as date2', () => {
    const date1 = new Date(Date.UTC(2022, 11, 17, 8, 24, 0));
    const date2 = new Date(Date.UTC(2022, 11, 17, 10, 24, 0));
    expect(isDateSameDay(date1, date2)).toEqual(true);
  });

  it('returns false if date1 is not on the same day as date2', () => {
    const date1 = new Date(Date.UTC(2022, 11, 17, 8, 24, 0));
    const date2 = new Date(Date.UTC(1995, 11, 17, 8, 24, 0));
    expect(isDateSameDay(date1, date2)).toEqual(false);
  });
})

describe('checkIsNaN', () => {
  it('indicates when the year is NaN', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = Number('1999n');
    const month =  Number('1');
    const day = Number('1');

    const result = checkIsNaN(memorableDateComponent, year, month, day);

    expect(result).toEqual(false);
    expect(memorableDateComponent.error).toEqual(`year-range`);
    expect(memorableDateComponent.invalidYear).toEqual(true);
  });

  it('indicates when the month is NaN', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = Number('1999');
    const month =  Number('1n');
    const day = Number('1');

    const result = checkIsNaN(memorableDateComponent, year, month, day);

    expect(result).toEqual(false);
    expect(memorableDateComponent.error).toEqual(`month-range`);
    expect(memorableDateComponent.invalidMonth).toEqual(true);
  });

  it('indicates when the day is NaN', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = Number('1999');
    const month =  Number('1');
    const day = Number('1n');

    const result = checkIsNaN(memorableDateComponent, year, month, day);

    expect(result).toEqual(false);
    expect(memorableDateComponent.error).toEqual(`day-range`);
    expect(memorableDateComponent.invalidDay).toEqual(true);
  });

  it('passes when the all inputs are number', () => {
    const memorableDateComponent = {} as Components.VaMemorableDate;
    const year = Number('1999');
    const month =  Number('1');
    const day = Number('1');

    const result = checkIsNaN(memorableDateComponent, year, month, day);

    expect(result).toEqual(true);
    expect(memorableDateComponent.error).toEqual(null);
    expect(memorableDateComponent.invalidYear).toEqual(false);
    expect(memorableDateComponent.invalidMonth).toEqual(false);
    expect(memorableDateComponent.invalidDay).toEqual(false);
  });

  it('removes error indicators when the values are valid', () => {
    const memorableDateComponent = { error: 'Some error'} as Components.VaMemorableDate;
    const year = Number('1999');
    const month =  Number('1');
    const day = Number('1');

    const result = checkIsNaN(memorableDateComponent, year, month, day);

    expect(result).toEqual(true);
    expect(memorableDateComponent.error).toEqual(null);

    expect(memorableDateComponent.error).toEqual(null);
    expect(memorableDateComponent.invalidYear).toEqual(false);
    expect(memorableDateComponent.invalidMonth).toEqual(false);
    expect(memorableDateComponent.invalidDay).toEqual(false);
  });
})