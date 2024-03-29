/**
 * General Validations *
 */

function isBlank(value) {
  return value === '';
}

function isValidValue(validator, value) {
  return isBlank(value) || validator(value);
}

function isValidField(validator, field) {
  return isBlank(field.value) || validator(field.value);
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
  isBlank,
  isValidEmail,
  isValidFullNameField,
  isValidField,
  isValidName,
  isValidMonetaryValue,
  isValidPhone,
  isValidValue,
  isValidRoutingNumber,
};
