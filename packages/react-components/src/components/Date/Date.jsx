/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import i18next from 'i18next';

import SimpleDate from './SimpleDate';

import {
  minYear,
  maxYear,
  isDirtyDate,
  isValidPartialDate,
  isNotBlankDateField,
  validateCustomFormComponent,
} from '../../helpers/validations';

/**
 * A date input field with built-in validation.
 */

const Date = props => {
  const { day, month, year } = props.date;

  // we want to do validations in a specific order, so we show the message
  // that makes the most sense to the user
  let errorMessage;
  if (isDirtyDate(props.date)) {
    // make sure the user enters a full date first, if required
    if (props.required && !isNotBlankDateField(props.date)) {
      errorMessage = props.requiredMessage;
      // make sure the user has entered a minimally valid date
    } else if (!isValidPartialDate(day.value, month.value, year.value)) {
      errorMessage = props.invalidMessage;
    } else {
      const validationResult = validateCustomFormComponent(props.validation);
      errorMessage = validationResult.message;
    }
  } else if (year.value.length >= 4) {
    const yr = parseInt(year.value, 10);
    if (yr < minYear || yr > maxYear) {
      errorMessage = i18next.t('year-range', { start: minYear, end: maxYear });
    }
  }

  const [lang, setLang] = useState();
  useEffect(() => {
    i18next.on('languageChanged', lng => setLang(lng));
    return () => i18next.off('languageChanged');
  }, []);

  return (
    <SimpleDate
      required={props.required}
      errorMessage={errorMessage}
      label={props.label}
      name={props.name}
      date={props.date}
      ariaDescribedby={props.ariaDescribedby}
      minYear={minYear}
      maxYear={maxYear}
      onValueChange={props.onValueChange}
      onBlur={props.onBlur}
    />
  );
};

export { SimpleDate };

Date.propTypes = {
  /**
   * Render marker indicating field is required.
   */
  required: PropTypes.bool,

  /**
   * Result of custom validation. Should include a valid prop and a message prop
   */
  validation: PropTypes.shape({
    valid: PropTypes.bool,
    message: PropTypes.string,
  }),

  /**
   * Label for entire question.
   */
  label: PropTypes.string,

  /**
   * Used to create unique name attributes for each input.
   */
  name: PropTypes.string.isRequired,

  /**
   * Date value. Should have month, day, and year props
   */
  date: PropTypes.shape({
    day: PropTypes.shape({
      value: PropTypes.string,
      dirty: PropTypes.bool,
    }),
    month: PropTypes.shape({
      value: PropTypes.string,
      dirty: PropTypes.bool,
    }),
    year: PropTypes.shape({
      value: PropTypes.string,
      dirty: PropTypes.bool,
    }),
  }).isRequired,

  /**
   * a function with this prototype: (newValue)
   */
  onValueChange: PropTypes.func.isRequired,

  requiredMessage: PropTypes.string,

  invalidMessage: PropTypes.string,

  /**
   * Add additional aria-describedby to the month, day & year elements.
   * Note: make sure the ID exists on the page before adding this, or you'll
   * have an WCAG violation
   */
  ariaDescribedby: PropTypes.string,

  /**
   * This callback is called when a date field is blurred.
   * Function signature: () => void
   */
  onBlur: PropTypes.func,
};

Date.defaultProps = {
  requiredMessage: 'Please provide a response',
  invalidMessage: 'Please provide a valid date',
};

export default Date;
