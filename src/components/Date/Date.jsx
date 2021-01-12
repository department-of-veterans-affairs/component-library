/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import Select from '../Select/Select';
import NumberInput from '../NumberInput/NumberInput';

import {
  isDirtyDate,
  isValidPartialDate,
  isNotBlankDateField,
  validateCustomFormComponent,
} from '../../helpers/validations';
import { months, days } from '../../helpers/options-for-select.js';

/**
 * A date input field that accepts values for month and year
 */

class Date extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.id = _.uniqueId('date-input-');
  }

  handleChange(path, update) {
    const date = {
      ...this.props.date,
      [path]: update,
    };

    if (!date.month.value) {
      date.day.value = '';
    }

    this.props.onValueChange(date);
  }

  render() {
    const { day, month, year } = this.props.date;

    let daysForSelectedMonth = [];
    if (month.value) {
      daysForSelectedMonth = days[month.value];
    }

    // we want to do validations in a specific order, so we show the message
    // that makes the most sense to the user
    let isValid = true;
    let errorMessage;
    if (isDirtyDate(this.props.date)) {
      // make sure the user enters a full date first, if required
      if (this.props.required && !isNotBlankDateField(this.props.date)) {
        isValid = false;
        errorMessage = this.props.requiredMessage;
        // make sure the user has entered a minimally valid date
      } else if (!isValidPartialDate(day.value, month.value, year.value)) {
        isValid = false;
        errorMessage = this.props.invalidMessage;
      } else {
        const validationResult = validateCustomFormComponent(
          this.props.validation,
        );
        isValid = validationResult.valid;
        errorMessage = validationResult.message;
      }
    }

    let errorSpanId;
    let errorSpan = '';
    if (!isValid) {
      errorSpanId = `${this.inputId}-error-message`;
      errorSpan = (
        <span className="usa-input-error-message" role="alert" id={errorSpanId}>
          <span className="sr-only">Error</span> {errorMessage}
        </span>
      );
    }

    return (
      <div className={!isValid ? 'input-error-date' : undefined}>
        <label>
          {this.props.label ? this.props.label : 'Date of birth'}
          {this.props.required && (
            <span className="form-required-span">(*Required)</span>
          )}
        </label>
        {errorSpan}
        <div
          className={isValid ? undefined : 'usa-input-error form-error-date'}
        >
          <div className="usa-date-of-birth">
            <div className="form-datefield-month">
              <Select
                errorMessage={isValid ? undefined : ''}
                label="Month"
                name={`${this.props.name}Month`}
                options={months}
                value={month}
                onValueChange={update => {
                  this.handleChange('month', update);
                }}
              />
            </div>
            <div className="form-datefield-day">
              <Select
                errorMessage={isValid ? undefined : ''}
                label="Day"
                name={`${this.props.name}Day`}
                options={daysForSelectedMonth}
                value={day}
                onValueChange={update => {
                  this.handleChange('day', update);
                }}
              />
            </div>
            <div className="usa-datefield usa-form-group usa-form-group-year">
              <NumberInput
                errorMessage={isValid ? undefined : ''}
                label="Year"
                name={`${this.props.name}Year`}
                max={moment().add(100, 'year').year()}
                min="1900"
                pattern="[0-9]{4}"
                field={year}
                onValueChange={update => {
                  this.handleChange('year', update);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Date.propTypes = {
  /**
   * Render marker indicating field is required.
   */
  required: PropTypes.bool,
  /**
   * object or array. Result of custom validation. Should include a valid prop and a message prop
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
};

Date.defaultProps = {
  requiredMessage: 'Please provide a response',
  invalidMessage: 'Please provide a valid date',
};

export default Date;
