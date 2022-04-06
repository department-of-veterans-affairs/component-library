import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { uniqueId } from '../../helpers/utilities';

import Select from '../Select/Select';
import NumberInput from '../NumberInput/NumberInput';
import { months, days } from '../../helpers/options-for-select.js';

const handleChange = (path, newValue, oldDate, onValueChange) => {
  if (!onValueChange) return;

  const date = {
    ...oldDate,
    [path]: newValue,
  };

  if (!date.month.value) {
    date.day.value = '';
  }

  onValueChange(date);
};

// TODO: Refactor the date prop to be either a string or an object of strings

/**
 * A simple date picker with only display logic. For built-in validation, use the Date component.
 */
export const SimpleDate = ({
  errorMessage,
  date,
  label,
  name,
  required,
  ariaDescribedby,
  minYear,
  maxYear,
  onValueChange,
  onBlur,
}) => {
  const inputId = useRef(uniqueId('date-input-'));
  const { day, month, year } = date;

  const [lang, setLang] = useState();

  useEffect(() => {
    i18next.on('languageChanged', lang => {
      console.log('language changed SimpleDate');
      setLang(lang);
    });
  }, []);

  const daysForSelectedMonth = month.value ? days[month.value] : [];

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

  // If the active element is _not_ part of the SimpleDate, call onBlur
  const blurIfOutsideField = () => {
    // Push the function onto the event loop because otherwise,
    // document.activeElement will be <body>, not the _actual_ active element.
    setTimeout(() => {
      if (
        ![
          `#${inputId.current} [name="${name}Month"]`,
          `#${inputId.current} [name="${name}Day"]`,
          `#${inputId.current} [name="${name}Year"]`,
        ].some(
          selector =>
            document.querySelector(selector) === document.activeElement,
        )
      )
        if (onBlur) onBlur();
    });
  };

  return (
    <fieldset className={fieldsetClass} id={inputId.current}>
      <legend className="vads-u-font-size--base vads-u-font-weight--normal">
        {label || 'Date of birth'}
        {required && (
          <span className="form-required-span">{i18next.t('required')}</span>
        )}
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
              onBlur={blurIfOutsideField}
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
              onBlur={blurIfOutsideField}
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
              onBlur={blurIfOutsideField}
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
   * Used to create unique name attributes for each input.
   */
  name: PropTypes.string.isRequired,

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
