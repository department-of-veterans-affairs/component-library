export const convertToDate = date => {
  if (!date || !(date instanceof Date || typeof date === 'number')) return;
  return new Date(date);
};

export const isDateAfter = (date1, date2) => {
  const dateObj1 = convertToDate(date1);
  const dateObj2 = convertToDate(date2);
  if (!dateObj1 || !dateObj2) return;

  return dateObj1.getTime() > dateObj2.getTime();
};

export const isDateBefore = (date1, date2) => {
  const dateObj1 = convertToDate(date1);
  const dateObj2 = convertToDate(date2);
  if (!dateObj1 || !dateObj2) return;

  return dateObj1.getTime() < dateObj2.getTime();
};

export const isDateSameDay = (date1, date2) => {
  const dateObj1 = convertToDate(date1);
  const dateObj2 = convertToDate(date2);
  if (!dateObj1 || !dateObj2) return;

  dateObj1.setHours(0, 0, 0, 0);
  dateObj2.setHours(0, 0, 0, 0);

  return dateObj1.getTime() === dateObj2.getTime();
};

export const formatDate = (date, pattern, timezone) => {
  const dateObj = convertToDate(date);
  if (!dateObj) return;

  const timeZone = timezone || 'America/New_York';

  // Example: Tuesday, June 9, 2020
  if (pattern === 'dateFull') {
    return dateObj.toLocaleString('en-US', { dateStyle: 'full', timeZone });
  }

  // Example: 10:00 AM
  if (pattern === 'timeShort') {
    return dateObj.toLocaleString('en-US', { timeStyle: 'short', timeZone });
  }

  // Example: Tuesday, June 9, 2020 at 10:00 AM
  return dateObj.toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone,
  });
};
