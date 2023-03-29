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

/**
 * This is used to validate date components and:
 * 1. Indicate which field fails the built-in validation
 * 1. Supply an error message to help resolve the issue
 *
 * It relies on the component's mutable props.
 */
export function validate(
  component: Components.VaDate | Components.VaMemorableDate,
  year: number,
  month: number,
  day: number,
  monthYearOnly : boolean = false) : void {

  const leapYear = checkLeapYear(year);
  const daysForSelectedMonth = leapYear && month == 2 ? 29 : days[month]?.length || 0;

  // Begin built-in validation.
  // Empty fields are acceptable unless the component is marked as required
  if (year && (year < minYear || year > maxYear)) {
    component.invalidYear = true;
    component.error = 'year-range';
    component.errorParameters = { start: minYear, end: maxYear };
  }
  else {
    component.invalidYear = false;
  }

  // Check day before month so that the month error message has a change to override
  // We don't know the upper limit on days until we know the month
  if (!monthYearOnly && (day < minMonths || day > daysForSelectedMonth)) {
    component.invalidDay = true;
    component.error = 'day-range';
    component.errorParameters = { start: minMonths, end: daysForSelectedMonth };
  }
  else {
    component.invalidDay = false;
  }

  // The month error message will trigger if the month is outside of the acceptable range,
  // but also if the day is invalid and there isn't a month value.
  if ((month && (month < minMonths || month > maxMonths)) ||
      (!month && component.invalidDay)) {
    component.invalidMonth = true;
    component.error = 'month-range';
    component.errorParameters = { start: minMonths, end: maxMonths };
  }
  else {
    component.invalidMonth = false;
  }

  if (component.required && (!year || !month || (!monthYearOnly && !day))) {
    component.invalidYear = !year;
    component.invalidMonth = !month;
    component.invalidDay = monthYearOnly ? false : !day;
    component.error = 'date-error';
  }

  // Remove any error message if none of the fields are marked as invalid
  if (!component.invalidYear && !component.invalidMonth && !component.invalidDay) {
    component.error = null;
  }
}

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
/* eslint-enable i18next/no-literal-string */
