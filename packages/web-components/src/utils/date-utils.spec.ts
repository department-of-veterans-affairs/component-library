import { Components } from '../components';
import {
  checkLeapYear,
  validate,
  formatDate,
  isDateAfter,
  isDateBefore,
  isDateSameDay,
  zeroPadStart,
} from './date-utils';

describe('checkLeapYear',
() => {
  it('determines an input year is a leap year',
  () => {
    expect(checkLeapYear(1996)).toBeTruthy();
    expect(checkLeapYear(1995)).toBeFalsy();
    expect(checkLeapYear(199)).toBeFalsy();
  });
});

describe('validate', () => {
  describe('NaN validation', () => {
    it('indicates when the year is NaN', () => {
      const memorableDateComponent = {} as Components.VaMemorableDate;
      const year = NaN;
      const month = 1;
      const day = 1;
      const yearTouched = true;

      validate({ component: memorableDateComponent, year, month, day, yearTouched });

      expect(memorableDateComponent.error).toEqual(`year-range`);
      expect(memorableDateComponent.invalidYear).toEqual(true);
      expect(memorableDateComponent.invalidMonth).toEqual(false);
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });

    it('indicates when the month is NaN', () => {
      const memorableDateComponent = {} as Components.VaMemorableDate;
      const year = Number('1999');
      const month = Number('1n');
      const day = Number('1');
      const monthTouched = true;

      validate({ component: memorableDateComponent, year, month, day, monthTouched });

      expect(memorableDateComponent.error).toEqual(`month-range`);
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(true);
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });

    it('indicates when the day is NaN', () => {
      const memorableDateComponent = {} as Components.VaMemorableDate;
      const year = Number('1999');
      const month = Number('1');
      const day = Number('1n');
      const dayTouched = true;

      validate({ component: memorableDateComponent, year, month, day, dayTouched });

      expect(memorableDateComponent.error).toEqual(`day-range`);
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(false);
      expect(memorableDateComponent.invalidDay).toEqual(true);
    });
  });

  describe('required components', () => {
    it('indicates when the year is missing', () => {
      const memorableDateComponent = { required: true} as Components.VaMemorableDate;
      const year = null;
      const month = 1;
      const day = 1;
      const yearTouched = true;

      validate({ component: memorableDateComponent, year, month, day, yearTouched} );

      expect(memorableDateComponent.error).toEqual('date-error');
      expect(memorableDateComponent.invalidYear).toEqual(true);
      expect(memorableDateComponent.invalidMonth).toEqual(false);
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });

    it('indicates when the month is missing', () => {
      const memorableDateComponent = { required: true} as Components.VaMemorableDate;
      const year = 2000;
      const month = null;
      const day = 1;
      const monthTouched = true;

      validate({ component: memorableDateComponent, year, month, day, monthTouched} );

      expect(memorableDateComponent.error).toEqual('date-error');
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(true);
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });

    it('indicates when the day is missing', () => {
      const memorableDateComponent = { required: true} as Components.VaMemorableDate;
      const year = 2000;
      const month = 1;
      const day = null;
      const dayTouched = true;

      validate({ component: memorableDateComponent, year, month, day, dayTouched} );

      expect(memorableDateComponent.error).toEqual('date-error');
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(false);
      expect(memorableDateComponent.invalidDay).toEqual(true);
    });

    it('does not error on a missing day for the monthYearOnly variant', () => {
      const memorableDateComponent = { required: true} as Components.VaMemorableDate;
      const year = 2000;
      const month = 1;
      const day = null;
      const monthYearOnly = true;
      const dayTouched = true;

      validate({ component: memorableDateComponent, year, month, day, monthYearOnly, dayTouched} );

      expect(memorableDateComponent.error).toEqual(null);
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(false);
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });
  });

  describe('touched fields are validated against empty values', () => {
    it('validates month when empty', () => {
      const memorableDateComponent = {} as Components.VaMemorableDate;
      const year = 1999;
      const month = null;
      const day = 1;
      const monthTouched = true;

      validate({ component: memorableDateComponent, year, month, day, monthTouched });

      expect(memorableDateComponent.error).toEqual(`month-range`);
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(true);
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });

    it('validates day when empty', () => {
      const memorableDateComponent = {} as Components.VaMemorableDate;
      const year = 1999;
      const month = 1;
      const day = null;
      const dayTouched = true;

      validate({ component: memorableDateComponent, year, month, day, dayTouched });

      expect(memorableDateComponent.error).toEqual(`day-range`);
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(false);
      expect(memorableDateComponent.invalidDay).toEqual(true);
    });

    it('validates year when empty', () => {
      const memorableDateComponent = {} as Components.VaMemorableDate;
      const year = null;
      const month = 1;
      const day = 1;
      const yearTouched = true;

      validate({ component: memorableDateComponent, year, month, day, yearTouched });

      expect(memorableDateComponent.error).toEqual(`year-range`);
      expect(memorableDateComponent.invalidYear).toEqual(true);
      expect(memorableDateComponent.invalidMonth).toEqual(false);
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });
  });

  describe('validates when values are present', () => {
    it('indicates when the year is below the accepted range', () => {
      const memorableDateComponent = {} as Components.VaMemorableDate;
      const year = 1500;
      const month = 1;
      const day = 1;
      const yearTouched = true;

      validate({ component: memorableDateComponent, year, month, day, yearTouched} );

      expect(memorableDateComponent.error).toEqual(`year-range`);
      expect(memorableDateComponent.invalidYear).toEqual(true);
      expect(memorableDateComponent.invalidMonth).toEqual(false);
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });

    it('indicates when the year is above the accepted range', () => {
      const memorableDateComponent = {} as Components.VaMemorableDate;
      const year = 3000;
      const month = 1;
      const day = 1;
      const yearTouched = true;

      validate({ component: memorableDateComponent, year, month, day, yearTouched} );

      expect(memorableDateComponent.error).toEqual(`year-range`);
      expect(memorableDateComponent.invalidYear).toEqual(true);
      expect(memorableDateComponent.invalidMonth).toEqual(false);
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });

    it('indicates when the month is above the accepted range', () => {
      const memorableDateComponent = {} as Components.VaMemorableDate;
      const year = 2000;
      const month = 15;
      const day = 1;
      const monthTouched = true;

      validate({ component: memorableDateComponent, year, month, day, monthTouched} );

      expect(memorableDateComponent.error).toEqual('month-range');
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(true);
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });

    it('indicates when the month is below the accepted range', () => {
      const memorableDateComponent = {} as Components.VaMemorableDate;
      const year = 2000;
      const month = 0;
      const day = 1;
      const monthTouched = true;

      validate({ component: memorableDateComponent, year, month, day, monthTouched} );

      expect(memorableDateComponent.error).toEqual('month-range');
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(true);
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });

    it('indicates when the day is above the accepted range', () => {
      const memorableDateComponent = {} as Components.VaMemorableDate;
      const year = 2000;
      const month = 1;
      const day = 35;
      const dayTouched = true;

      validate({ component: memorableDateComponent, year, month, day, dayTouched} );

      expect(memorableDateComponent.error).toEqual('day-range');
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(false);
      expect(memorableDateComponent.invalidDay).toEqual(true);
    });

    it('indicates when the day is above range for non-leap years', () => {
      const memorableDateComponent = { required: true} as Components.VaMemorableDate;
      const year = 2023;
      const month = 2;
      const day = 29;
      const dayTouched = true;

      validate({ component: memorableDateComponent, year, month, day, dayTouched} );

      expect(memorableDateComponent.error).toEqual('day-range');
      expect(memorableDateComponent.invalidDay).toEqual(true);
    });

    it('indicates when the day is below the accepted range', () => {
      const memorableDateComponent = {} as Components.VaMemorableDate;
      const year = 2000;
      const month = 1;
      const day = 0;
      const dayTouched = true;

      validate({ component: memorableDateComponent, year, month, day, dayTouched} );

      expect(memorableDateComponent.error).toEqual('day-range');
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(false);
      expect(memorableDateComponent.invalidDay).toEqual(true);
    });

    it('does not validate day for the monthYearOnly variant', () => {
      const memorableDateComponent = {} as Components.VaDate;
      const year = 2000;
      const month = 1;
      const day = 0;
      const monthYearOnly = true

      validate({ component: memorableDateComponent, year, month, day, monthYearOnly} );

      expect(memorableDateComponent.error).toEqual(null);
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(false);
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });
  });

  it('removes error indicators when the values are valid', () => {
    const memorableDateComponent = { error: 'date-error'} as Components.VaMemorableDate;
    const year = 2000;
    const month = 1;
    const day = 1;
    const yearTouched = true;
    const monthTouched = true;
    const dayTouched = true;

    validate({ component: memorableDateComponent, year, month, day, yearTouched, monthTouched, dayTouched} );

    expect(memorableDateComponent.error).toEqual(null);
    expect(memorableDateComponent.invalidYear).toEqual(false);
    expect(memorableDateComponent.invalidMonth).toEqual(false);
    expect(memorableDateComponent.invalidDay).toEqual(false);
  });

  it('should not remove custom error even if values are valid', () => {
    const memorableDateComponent = { error: 'Some error'} as Components.VaMemorableDate;
    const year = 2000;
    const month = 1;
    const day = 1;
    const yearTouched = true;
    const monthTouched = true;
    const dayTouched = true;

    validate({ component: memorableDateComponent, year, month, day, yearTouched, monthTouched, dayTouched} );

    expect(memorableDateComponent.error).toEqual('Some error');
    expect(memorableDateComponent.invalidYear).toEqual(false);
    expect(memorableDateComponent.invalidMonth).toEqual(false);
    expect(memorableDateComponent.invalidDay).toEqual(false);
  });

  describe('errors on fields have precedence', () => {
    it('overrides an invalid year message with an invalid month message', () => {
      const memorableDateComponent = { error: 'year-error'}  as Components.VaMemorableDate;
      const year = 5000;
      const month = null;
      const day = 5;
      const yearTouched = true;
      const monthTouched = true;
      const dayTouched = true;

      validate({ component: memorableDateComponent, year, month, day, yearTouched, monthTouched, dayTouched });

      expect(memorableDateComponent.error).toEqual('month-range');
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(true);
      // invalid month sets max days to zero
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });

    it('overrides an invalid day message with an invalid month message', () => {
      const memorableDateComponent = { error: 'day-error'}  as Components.VaMemorableDate;
      const year = 2000;
      const month = null;
      const day = 500;
      const yearTouched = true;
      const monthTouched = true;
      const dayTouched = true;

      validate({ component: memorableDateComponent, year, month, day, yearTouched, monthTouched, dayTouched });

      expect(memorableDateComponent.error).toEqual('month-range');
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(true);
      // invalid month sets max days to zero
      expect(memorableDateComponent.invalidDay).toEqual(false);
    });

    it('overrides an invalid year message with an invalid day message', () => {
      const memorableDateComponent = { error: 'day-error'}  as Components.VaMemorableDate;
      const year = 2000;
      const month = 1;
      const day = 500;
      const yearTouched = true;
      const monthTouched = true;
      const dayTouched = true;

      validate({ component: memorableDateComponent, year, month, day, yearTouched, monthTouched, dayTouched });

      expect(memorableDateComponent.error).toEqual('day-range');
      expect(memorableDateComponent.invalidYear).toEqual(false);
      expect(memorableDateComponent.invalidMonth).toEqual(false);
      // invalid month sets max days to zero
      expect(memorableDateComponent.invalidDay).toEqual(true);
    });
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

describe('zeroPadStart', () => {
  it('should return "00"', () => {
    expect(zeroPadStart(null)).toEqual('00');
    expect(zeroPadStart('')).toEqual('00');
    expect(zeroPadStart(0)).toEqual('00');
  });
  it('should return numbers > 9 and < 100', () => {
    expect(zeroPadStart(10)).toEqual('10');
    expect(zeroPadStart('10')).toEqual('10');
    expect(zeroPadStart(99)).toEqual('99');
    expect(zeroPadStart('55')).toEqual('55');
  });
  it('should add leading zero to numbers < 10', () => {
    expect(zeroPadStart(1)).toEqual('01');
    expect(zeroPadStart(3)).toEqual('03');
    expect(zeroPadStart('5')).toEqual('05');
    expect(zeroPadStart(9)).toEqual('09');
  });
});
