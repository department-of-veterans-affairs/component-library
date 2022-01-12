const minYear = 1900;
const maxYear = new Date().getFullYear() + 100;

/**
 * General Validations *
 */
function validateIfDirty(field, validator) {
  if (field.dirty) {
    return validator(field.value);
  }

  return true;
}

function validateCustomFormComponent(customValidation) {
  // Allow devs to pass in an array of validations with messages and display the first failed one
  if (Array.isArray(customValidation)) {
    if (customValidation.some(validator => !validator.valid)) {
      return customValidation.filter(validator => !validator.valid)[0];
    }
    // Also allow objects for custom validation
  } else if (typeof customValidation === 'object' && !customValidation.valid) {
    return customValidation;
  }

  return { valid: true, message: null };
}

function isBlank(value) {
  return value === '';
}

function isNotBlank(value) {
  return value !== '';
}

function isValidValue(validator, value) {
  return isBlank(value) || validator(value);
}

function isValidField(validator, field) {
  return isBlank(field.value) || validator(field.value);
}

function isValidRequiredField(validator, field) {
  return isNotBlank(field.value) && validator(field.value);
}

/**
 * Date Validations *
 */
function isValidYear(value) {
  return Number(value) >= minYear && Number(value) <= maxYear;
}

function isValidMonths(value) {
  return Number(value) >= 0;
}

function isBlankDateField(field) {
  return (
    isBlank(field.day.value) &&
    isBlank(field.month.value) &&
    isBlank(field.year.value)
  );
}

function isFullDate(date) {
  return /\d{4}-\d{1,2}-\d{1,2}/.test(date);
}

function isNotBlankDateField(field) {
  return (
    isNotBlank(field.day.value) &&
    isNotBlank(field.month.value) &&
    isNotBlank(field.year.value)
  );
}

function isDirtyDate(date) {
  return date.day.dirty && date.year.dirty && date.month.dirty;
}

function validateIfDirtyDate(dayField, monthField, yearField, validator) {
  if (isDirtyDate({ day: dayField, month: monthField, year: yearField })) {
    return validator(dayField.value, monthField.value, yearField.value);
  }

  return true;
}

function isValidPartialDate(day, month, year) {
  if (year && !isValidYear(year)) {
    return false;
  }

  return true;
}

function isValidPartialMonthYear(month, year) {
  if (typeof month === 'object') {
    throw new Error('Pass a month and a year to function');
  }
  if (month && (Number(month) > 12 || Number(month) < 1)) {
    return false;
  }

  return isValidPartialDate(null, null, year);
}

function isBlankMonthYear(field) {
  return isBlank(field.month.value) && isBlank(field.year.value);
}

/**
 * Field Validations *
 */
function isValidName(value) {
  return /^[a-zA-Z][a-zA-Z '-]*$/.test(value);
}

function isValidFullNameField(field) {
  return (
    isValidName(field.first.value) &&
    (isBlank(field.middle.value) || isValidName(field.middle.value)) &&
    isValidName(field.last.value)
  );
}

function isValidMonetaryValue(value) {
  if (value !== null) {
    return /^\d+\.?\d*$/.test(value);
  }
  return true;
}

// TODO: look into validation libraries (npm "validator")
function isValidPhone(value) {
  // Strip spaces, dashes, and parens
  const stripped = value.replace(/[^\d]/g, '');
  // Count number of digits
  return /^\d{10}$/.test(stripped);
}

function isValidEmail(value) {
  // Comes from StackOverflow: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  // eslint-disable-next-line no-useless-escape
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value,
  );
}

// Pulled from https://en.wikipedia.org/wiki/Routing_transit_number#Check_digit
function isValidRoutingNumber(value) {
  if (/^\d{9}$/.test(value)) {
    const digits = value.split('').map(val => parseInt(val, 10));
    const weighted =
      3 * (digits[0] + digits[3] + digits[6]) +
      7 * (digits[1] + digits[4] + digits[7]) +
      (digits[2] + digits[5] + digits[8]);

    return weighted % 10 === 0;
  }
  return false;
}

export {
  minYear,
  maxYear,
  isBlank,
  isBlankDateField,
  isBlankMonthYear,
  isDirtyDate,
  isFullDate,
  isNotBlank,
  isNotBlankDateField,
  isValidEmail,
  isValidFullNameField,
  isValidField,
  isValidMonths,
  isValidName,
  isValidMonetaryValue,
  isValidPhone,
  isValidPartialDate,
  isValidPartialMonthYear,
  isValidRequiredField,
  isValidValue,
  validateCustomFormComponent,
  validateIfDirty,
  validateIfDirtyDate,
  isValidRoutingNumber,
};
