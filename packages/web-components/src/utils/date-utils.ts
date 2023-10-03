import i18next from 'i18next';
import { Components } from '../components';

import {
  Build,
} from '@stencil/core';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

const maxYear = new Date().getFullYear() + 100;
const minYear = 1900;
const maxMonths = 12;
const minMonths = 1;

export const months = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
];

/* eslint-disable i18next/no-literal-string */
const twentyNineDays = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
];
const thirtyDays = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
];
const thirtyOneDays = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
];

export const days = {
  1: thirtyOneDays,
  2: twentyNineDays,
  3: thirtyOneDays,
  4: thirtyDays,
  5: thirtyOneDays,
  6: thirtyDays,
  7: thirtyOneDays,
  8: thirtyOneDays,
  9: thirtyDays,
  10: thirtyOneDays,
  11: thirtyDays,
  12: thirtyOneDays,
};

/**
 * Return true if the year is a leap year.
 * (Exported for testing purposes)
 */
export function checkLeapYear(year: number) {
  //three conditions to find out the leap year
  return (0 == year % 4 && 0 != year % 100) || 0 == year % 400;
}

export const internalErrors = [
  'year-range',
  'day-range',
  'month-range',
  'date-error'
];

/**
 * Checks if any of the of inputs provided resolve to NaN
 * Returns false if any are NaN and highlights component as error
 */
export function checkIsNaN(
  component: Components.VaDate | Components.VaMemorableDate,
  year: number,
  month: number,
  day: number,
  monthYearOnly : boolean = false) : boolean {

  // Check for nulls first, so that field specific errors do not get overwritten
  if (component.required && (!year || !month || (!monthYearOnly && !day))) {
    component.invalidYear = !year;
    component.invalidMonth = !month;
    component.invalidDay = monthYearOnly ? false : !day;
    component.error = 'date-error';
  }

  // Begin NaN validation.
  if (isNaN(year)) {
    component.invalidYear = true;
    component.error = 'year-range';
  }
  else {
    component.invalidYear = false;
  }

  if (!monthYearOnly && isNaN(day)) {
    component.invalidDay = true;
    component.error = 'day-range';
  }
  else {
    component.invalidDay = false;
  }

  if (isNaN(month)) {
    component.invalidMonth = true;
    component.error = 'month-range';
  }
  else {
    component.invalidMonth = false;
  }


  // Remove any error message if none of the fields are NaN
  if (
    !component.invalidYear &&
    !component.invalidMonth &&
    !component.invalidDay
  ) {
    if (!component.error || internalErrors.includes(component.error)) {
      component.error = null;
    }
    return true;
  }
  return false;
}

interface ValidateConfig {
  component: Components.VaDate | Components.VaMemorableDate,
  year: number,
  month: number,
  day: number,
  monthYearOnly?: boolean,
  yearTouched?: boolean,
  monthTouched?: boolean,
  dayTouched?: boolean,
}

/**
 * This is used to validate date components and:
 * 1. Indicate which field fails the built-in validation
 * 1. Supply an error message to help resolve the issue
 *
 * It relies on the component's mutable props.
 */
export function validate({ component, year, month, day, monthYearOnly, yearTouched, monthTouched, dayTouched }: ValidateConfig) : void {

  const maxDay = daysForSelectedMonth(year, month);
  if (component.required && (!year || !month || (!monthYearOnly && !day))) {
    component.invalidYear = (!year || year < minYear || year > maxYear);
    component.invalidMonth = (!month || month < minMonths || month > maxMonths);
    component.invalidDay = monthYearOnly ? false : (!day || day < minMonths || day > maxDay);
    component.error = 'date-error';
    return;
  }

  // Begin built-in validation.
  // Empty fields are acceptable when field is untouched. Otherwise must pass validation
  if (yearTouched && (!year || year < minYear || year > maxYear)) {
    component.invalidYear = true;
    component.error = 'year-range';
  }
  else {
    component.invalidYear = false;
  }

  // Check day before month so that the month error message has a change to override
  // We don't know the upper limit on days until we know the month
  if (dayTouched && !monthYearOnly && (!day || day < minMonths || day > maxDay)) {
    component.invalidDay = true;
    component.error = 'day-range';
  }
  else {
    component.invalidDay = false;
  }

  // The month error message will trigger if the month is outside of the acceptable range,
  // but also if the day is invalid and there isn't a month value.
  if (monthTouched && (!month || month < minMonths || month > maxMonths)) {
    component.invalidMonth = true;
    component.error = 'month-range';
  }
  else {
    component.invalidMonth = false;
  }

  // Remove any error message if none of the fields are marked as invalid
  if (
    (!component.error || internalErrors.includes(component.error)) &&
    !component.invalidYear &&
    !component.invalidMonth &&
    !component.invalidDay
  ) {
    component.error = null;
  }
}

export function getErrorParameters(
  error: string,
  year: number,
  month: number) {

  const maxDay = daysForSelectedMonth(year, month);

  switch(error) {
    case 'month-range':
      return { start: 1, end: maxMonths };
    case 'day-range':
      return { start: 1, end: maxDay };
    case 'year-range':
      return { start: minYear, end: maxYear };
    default:
      return null;
  }
}

// Get last day of the month (month is zero based, so we're +1 month, day 0);
// new Date() will recalculate and go back to last day of the previous month.
// Return 31 for undefined month or year to not invalidate the day with
// partial data (this used to be set to zero by default)
export const daysForSelectedMonth = (year: number, month: number): number =>
  year && month ? new Date(year, month, 0).getDate() : 31;

// Allow 0-9, Backspace, Delete, Left and Right Arrow, and Tab to clear data or move to next field
export const validKeys = [
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
  'Backspace',
  'ArrowRight',
  'ArrowLeft',
  'Tab',
  'Delete',
];

/**
 * Returns a string with date & time by default.
 * Ex: Tuesday, June 9, 2020 at 10:00 AM
 * Accepts an optional `options` object matching `Intl.DateTimeFormat` standards.
 */
export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    dateStyle: 'full',
    timeStyle: 'short',
  },
  timeZone: string = 'America/New_York',
) => {
  if (!date || !(date instanceof Date)) return;
  return date.toLocaleString('en-US', { ...options, timeZone });
};

export const isDateAfter = (date1: Date, date2: Date) => {
  if (!date1 || !(date1 instanceof Date) || !date2 || !(date2 instanceof Date))
    return;

  return date1.getTime() > date2.getTime();
};

export const isDateBefore = (date1: Date, date2: Date) => {
  if (!date1 || !(date1 instanceof Date) || !date2 || !(date2 instanceof Date))
    return;

  return date1.getTime() < date2.getTime();
};

export const isDateSameDay = (date1: Date, date2: Date) => {
  if (!date1 || !(date1 instanceof Date) || !date2 || !(date2 instanceof Date))
    return;

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDay() === date2.getDay()
  );
};

/**
 * Returns a zero padded number
 * Ex: '1' becomes '01'
 * We could use Intl.NumberFormat('en-US', { minimumIntegerDigits: 2 }) or
 * padStart(2, '0'), but we have Veterans that are still using Safari v9
 * See https://caniuse.com/?search=Intl.NumberFormat
 */
export const zeroPadStart = (number: number | string) =>
  `00${(number || '').toString()}`.slice(-2);

  /* eslint-enable i18next/no-literal-string */
