import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Select from '../Select/Select';
import NumberInput from '../NumberInput/NumberInput';
import { months, days } from '../../helpers/options-for-select.js';

const handleChange = (path, newValue, oldDate, onValueChange) => {
  const date = {
    ...oldDate,
    [path]: newValue,
  };

  if (!date.month.value) {
    date.day.value = '';
  }

  onValueChange(date);
};

/**
 * A simple date picker with only display logic. For built-in validation, use the Date component.
 */
export const SimpleDate = ({
  errorMessage,
  date,
  label,
  required,
  ariaDescribedby,
  minYear,
  maxYear,
  onValueChange,
}) => {
  const inputId = useRef(_.uniqueId('date-input-'));
  const { day, month, year } = date;

  let daysForSelectedMonth = [];
  if (month.value) {
    daysForSelectedMonth = days[month.value];
  }

  let errorSpanId;
  let errorSpan = '';
  let fieldsetClass;
  if (errorMessage) {
    fieldsetClass = 'input-error-date usa-input-error';
    errorSpanId = `${inputId.current}-error-message`;
    errorSpan = (
      <span className="usa-input-error-message" role="alert" id={errorSpanId}>
        <span className="sr-only">Error</span> {errorMessage}
      </span>
    );
  }
  const ariaDescribedbyWithError =
    [errorSpanId, ariaDescribedby || ''].join(' ').trim() || undefined;

  return (
    <fieldset className={fieldsetClass}>
      <legend className="vads-u-font-size--base vads-u-font-weight--normal">
        {label || 'Date of birth'}
        {required && <span className="form-required-span">(*Required)</span>}
      </legend>
      {errorSpan}
      <div
        className={
          !errorMessage ? undefined : 'usa-input-error form-error-date'
        }
      >
        <div className="usa-date-of-birth usa-datefields clearfix">
          <div className="form-datefield-month">
            <Select
              errorMessage={errorMessage && ''}
              label="Month"
              name={`${name}Month`}
              options={months}
              value={month}
              onValueChange={update => {
                handleChange('month', update, date, onValueChange);
              }}
              ariaDescribedby={ariaDescribedbyWithError}
            />
          </div>
          <div className="form-datefield-day">
            <Select
              errorMessage={errorMessage && ''}
              label="Day"
              name={`${name}Day`}
              options={daysForSelectedMonth}
              value={day}
              onValueChange={update => {
                handleChange('day', update, date, onValueChange);
              }}
              ariaDescribedby={ariaDescribedbyWithError}
            />
          </div>
          <div className="usa-datefield usa-form-group usa-form-group-year">
            <NumberInput
              errorMessage={errorMessage && ''}
              label="Year"
              name={`${name}Year`}
              max={maxYear}
              min={minYear}
              pattern="[0-9]{4}"
              field={year}
              onValueChange={update => {
                handleChange('year', update, date, onValueChange);
              }}
              ariaDescribedby={ariaDescribedbyWithError}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
};

const dateFragment = PropTypes.shape({
  value: PropTypes.string.isRequired,
  dirty: PropTypes.bool.isRequired,
}).isRequired;

SimpleDate.propTypes = {
  /**
   * Render marker indicating field is required.
   */
  required: PropTypes.bool,

  /**
   * Label for the field.
   */
  label: PropTypes.string.isRequired,

  /**
   * The error message to render (if any)
   */
  errorMessage: PropTypes.string,

  /**
   * Date value. Should have month, day, and year props
   */
  date: PropTypes.shape({
    month: dateFragment,
    day: dateFragment,
    year: dateFragment,
  }).isRequired,

  /**
   * Add additional aria-describedby to the month, day & year elements.
   * Note: make sure the ID exists on the page before adding this, or you'll
   * have an WCAG violation
   */
  ariaDescribedby: PropTypes.string,

  /**
   * Set the `min` value on the year input.
   */
  minYear: PropTypes.number,

  /**
   * Set the `max` value on the year input.
   */
  maxYear: PropTypes.number,

  /**
   * This callback is called when the date is changed.
   * Function signature: (newValue: string) => void
   */
  onValueChange: PropTypes.func.isRequired,

  /**
   * This callback is called when a date field is blurred.
   * Function signature: () => void
   */
  onBlur: PropTypes.func,
};

export default SimpleDate;
