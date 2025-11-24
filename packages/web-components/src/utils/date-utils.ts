import i18next from 'i18next';
import { Components } from '../components';

import { Build } from '@stencil/core';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

const maxYear = new Date().getFullYear() + 100;
const minYear = 1900;
const maxMonths = 12;
const minMonths = 1;
const minDays = 1;

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
  'date-error',
  'month-select',
];

interface ValidateConfig {
  component: Components.VaDate | Components.VaMemorableDate;
  year: number;
  month: number;
  day: number;
  monthYearOnly?: boolean;
  yearTouched?: boolean;
  monthTouched?: boolean;
  dayTouched?: boolean;
  monthSelect?: boolean;
  monthOptional?: boolean;
}

/**
 * Core validation function for date components.
 * @param requireTouched - If true, only validate if component has been touched (blur validation).
 *                        If false, validate all fields regardless of touched state (submit validation).
 */
function validateCore({
  component,
  year,
  month,
  day,
  monthYearOnly,
  yearTouched,
  monthTouched,
  dayTouched,
  monthSelect,
  monthOptional,
  requireTouched,
}: ValidateConfig & { requireTouched: boolean }): void {
  // Helper functions for value state checks
  const inputHasValue = (input?: number) =>
    typeof input === 'number' && !Number.isNaN(input);
  const isNaN = (input?: number) =>
    typeof input === 'number' && Number.isNaN(input);

  // Determine which fields are present/active
  const hasDayField = !monthYearOnly;

  // Check if values exist
  const monthHasValue = inputHasValue(month);
  const dayHasValue = hasDayField && inputHasValue(day);
  const yearHasValue = inputHasValue(year);

  // Check if values are invalid numbers
  const monthIsNaN = isNaN(month);
  const dayIsNaN = hasDayField && isNaN(day);
  const yearIsNaN = isNaN(year);

  // Determine if validation should run
  const anyValueEntered = monthHasValue || dayHasValue || yearHasValue;
  const anyInvalidNumber = monthIsNaN || dayIsNaN || yearIsNaN;
  const anyFieldTouched = Boolean(yearTouched || monthTouched || dayTouched);
  const componentTouched = anyFieldTouched || anyValueEntered || anyInvalidNumber;
  const shouldValidate = !requireTouched || componentTouched;

  // Reset previous invalid states
  component.invalidYear = false;
  component.invalidMonth = false;
  component.invalidDay = false;

  if (!shouldValidate) {
    return;
  }

  // Determine field requirements
  const monthRequired = component.required && !(monthYearOnly && monthOptional);
  const dayRequired = component.required && hasDayField;
  const yearRequired = component.required;

  // Calculate range limits
  const maxDays = daysForSelectedMonth(year, month);
  const monthErrorKey = monthSelect ? 'month-select' : 'month-range';

  const monthOutOfRange = monthHasValue && (month < minMonths || month > maxMonths);
  const dayOutOfRange = dayHasValue && (day < minDays || day > maxDays);
  const yearOutOfRange = yearHasValue && (year < minYear || year > maxYear);

  // Validate in visual order: month → day → year
  // First invalid field found will set error and return

  // Validate month
  if (monthIsNaN || monthOutOfRange || monthRequired && !monthHasValue) {
    component.invalidMonth = true;
    component.error = monthErrorKey;
    return;
  }

// If there is a day field, validate day
  if (dayIsNaN || dayOutOfRange || dayRequired && !dayHasValue) {
    component.invalidDay = true;
    component.error = 'day-range';
    return;
  }

  // Validate year
  if (yearIsNaN || yearOutOfRange || yearRequired && !yearHasValue) {
    component.invalidYear = true;
    component.error = 'year-range';
    return;
  }

  // Clear errors when all fields are valid
  if (!component.error || internalErrors.includes(component.error)) {
    component.error = null;
  }
}

/**
 * Validate for blur - only validates fields that have been touched.
 * Used by handleDateBlur in date components.
 */
export function validate(config: ValidateConfig): void {
  validateCore({ ...config, requireTouched: true });
}

/**
 * Validate for submit - validates all fields regardless of touched state.
 * Used by validateComponent() method for programmatic form submission validation.
 */
export function validateForSubmit(config: ValidateConfig): void {
  validateCore({ ...config, requireTouched: false });
}

export function getErrorParameters(error: string, year: number, month: number) {
  const maxDay = daysForSelectedMonth(year, month);
  switch (error) {
    case 'month-range':
    case 'month-select':
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
// Return expected days for month, or 31 for undefined month or year to not
// invalidate the day with partial data (this used to be set to zero by default)
export const daysForSelectedMonth = (year: number, month: number): number =>
  year && month
    ? new Date(year, month, 0).getDate()
    : days[month]?.length || 31;

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
