/**
 * Returns a string with date & time by default.
 * Ex: Tuesday, June 9, 2020 at 10:00 AM
 * Accepts an optional `options` object matching `Intl.DateTimeFormat` standards.
 */
export const formatDate = (
  date,
  options = { dateStyle: 'full', timeStyle: 'short' },
  timeZone = 'America/New_York',
) => {
  if (!date || !(date instanceof Date)) return;
  return date.toLocaleString('en-US', { ...options, timeZone });
};

/**
 * Date only, no time.
 * Ex: Tuesday, June 9, 2020
 */
export const formatDateShort = (date, timezone) =>
  formatDate(date, { dateStyle: 'full' }, timezone);

/**
 * Time only, no date.
 * Ex: 10:00 AM
 */
export const formatTime = (date, timezone) =>
  formatDate(date, { timeStyle: 'short' }, timezone);

export const isDateAfter = (date1, date2) => {
  if (!date1 || !(date1 instanceof Date) || !date2 || !(date2 instanceof Date))
    return;

  return date1.getTime() > date2.getTime();
};

export const isDateBefore = (date1, date2) => {
  if (!date1 || !(date1 instanceof Date) || !date2 || !(date2 instanceof Date))
    return;

  return date1.getTime() < date2.getTime();
};

export const isDateSameDay = (date1, date2) => {
  if (!date1 || !(date1 instanceof Date) || !date2 || !(date2 instanceof Date))
    return;

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDay() === date2.getDay()
  );
};
