/* eslint-disable jsx-a11y/label-has-for */
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import ErrorableSelect from '../ErrorableSelect/ErrorableSelect';
import ErrorableNumberInput from '../ErrorableNumberInput/ErrorableNumberInput';

import {
  isValidPartialMonthYear,
  validateCustomFormComponent,
} from '../../helpers/validations';
import { months } from '../../helpers/options-for-select.js';

/**
 * A date input field that accepts values for month and year
 */
class ErrorableMonthYear extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.id = _.uniqueId('date-input-');
  }

  handleChange(path, update) {
    const date = {
      ...this.props.date,
      [path]: update,
    };

    this.props.onValueChange(date);
  }

  render() {
    const { month, year } = this.props.date;

    // we want to do validations in a specific order, so we show the message
    // that makes the most sense to the user
    let isValid = true;
    let errorMessage;
    if (month.dirty && year.dirty) {
      // make sure the user enters a full date first, if required
      if (this.props.required && (!month.value || !year.value)) {
        isValid = false;
        errorMessage = this.props.requiredMessage;
        // make sure the user has entered a minimally valid date
      } else if (!isValidPartialMonthYear(month.value, year.value)) {
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
      <div className={!isValid && 'input-error-date'}>
        <label>
          {this.props.label}
          {this.props.required && (
            <span className="form-required-span">(*Required)</span>
          )}
        </label>
        {errorSpan}
        <div
          className={isValid ? undefined : 'usa-input-error form-error-date'}
        >
          <div className="usa-date-of-birth row">
            <div className="form-datefield-month">
              <ErrorableSelect
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
            <div className="usa-datefield usa-form-group usa-form-group-year">
              <ErrorableNumberInput
                errorMessage={isValid ? undefined : ''}
                label="Year"
                name={`${this.props.name}Year`}
                max={moment()
                  .add(100, 'year')
                  .year()}
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

ErrorableMonthYear.propTypes = {
  /**
   * Render marker indicating field is required.
   */
  required: PropTypes.bool,
  /**
   * Result of custom validation. Should include a valid prop and a message prop.
   */
  validation: PropTypes.any,
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

ErrorableMonthYear.defaultProps = {
  requiredMessage: 'Please provide a response',
  invalidMessage: 'Please provide a valid month and/or year',
};

export default ErrorableMonthYear;
