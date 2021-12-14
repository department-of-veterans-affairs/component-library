import { expect } from 'chai';
import {
  formatDate,
  isDateAfter,
  isDateBefore,
  isDateSameDay,
} from './format-date';

describe('date functions', () => {
  it('formats date to DayOfWeek, MonthName DayOfMonth, Year at Hour:Minutes [AM|PM]', () => {
    const date = formatDate(new Date('December 17, 1995 03:24:00'));
    expect(date).to.equal('Sunday, December 17, 1995 at 3:24 AM');
  });

  it('formats date to DayOfWeek, MonthName DayOfMonth, Year', () => {
    const date = formatDate(new Date('December 17, 1995 03:24:00'), 'dateFull');
    expect(date).to.equal('Sunday, December 17, 1995');
  });

  it('formats date to Hour:Minutes [AM|PM]', () => {
    const date = formatDate(
      new Date('December 17, 1995 03:24:00'),
      'timeShort',
    );
    expect(date).to.equal('3:24 AM');
  });

  it('returns false if date1 is after date2', () => {
    const date1 = new Date('December 17, 1995 03:24:00');
    const date2 = new Date();
    expect(isDateAfter(date1, date2)).to.equal(false);
  });

  it('returns true if date1 is not after date2', () => {
    const date1 = new Date();
    const date2 = new Date('December 17, 1995 03:24:00');
    expect(isDateAfter(date1, date2)).to.equal(true);
  });

  it('returns true if date1 is before date2', () => {
    const date1 = new Date('December 17, 1995 03:24:00');
    const date2 = new Date();
    expect(isDateBefore(date1, date2)).to.equal(true);
  });

  it('returns false if date1 is not before date2', () => {
    const date1 = new Date();
    const date2 = new Date('December 17, 1995 03:24:00');
    expect(isDateBefore(date1, date2)).to.equal(false);
  });

  it('returns true if date1 is on the same day as date2', () => {
    const date1 = new Date('December 17, 1995 03:24:00');
    const date2 = new Date('December 17, 1995 06:59:00');
    expect(isDateSameDay(date1, date2)).to.equal(true);
  });

  it('returns false if date1 is not on the same day as date2', () => {
    const date1 = new Date();
    const date2 = new Date('December 17, 1995 03:24:00');
    expect(isDateSameDay(date1, date2)).to.equal(false);
  });
});
