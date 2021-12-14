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

export const formatDate = (date, pattern, timezone) => {
  if (!date || !(date instanceof Date)) return;

  const timeZone = timezone || 'America/New_York';

  // Example: Tuesday, June 9, 2020
  if (pattern === 'dateFull') {
    return date.toLocaleString('en-US', { dateStyle: 'full', timeZone });
  }

  // Example: 10:00 AM
  if (pattern === 'timeShort') {
    return date.toLocaleString('en-US', { timeStyle: 'short', timeZone });
  }

  // Example: Tuesday, June 9, 2020 at 10:00 AM
  return date.toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone,
  });
};
