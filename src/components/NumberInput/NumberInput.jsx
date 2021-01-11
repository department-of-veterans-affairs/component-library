import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import { makeField } from '../../helpers/fields';

/*
 * A form input with a label that can display error messages.
 *
 */

class NumberInput extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.inputId = _.uniqueId('errorable-number-input-');
  }

  handleChange(domEvent) {
    this.props.onValueChange(
      makeField(domEvent.target.value, this.props.field.dirty),
    );
  }

  handleBlur() {
    this.props.onValueChange(makeField(this.props.field.value, true));
  }

  render() {
    // Calculate error state.
    let errorSpan = '';
    let errorSpanId = undefined;

    // TODO: Look into an alternate way of adding error styling not based on presence of errorMessage:
    // There could be cases where there is an error but we don’t want a message to appear, and this
    // is not clear right now
    if (this.props.errorMessage) {
      errorSpanId = `${this.inputId}-error-message`;
      errorSpan = (
        <span className="usa-input-error-message" role="alert" id={errorSpanId}>
          <span className="sr-only">Error</span> {this.props.errorMessage}
        </span>
      );
    }

    // Calculate required.
    let requiredSpan = undefined;
    if (this.props.required) {
      requiredSpan = <span className="form-required-span">(*Required)</span>;
    }

    return (
      <div className={this.props.errorMessage ? 'usa-input-error' : undefined}>
        <label
          className={
            this.props.errorMessage !== undefined
              ? 'usa-input-error-label'
              : undefined
          }
          htmlFor={this.inputId}
        >
          {this.props.label}
          {requiredSpan}
        </label>
        {errorSpan}
        <input
          className={this.props.additionalClass}
          aria-describedby={errorSpanId}
          id={this.inputId}
          name={this.props.name}
          max={this.props.max}
          min={this.props.min}
          pattern={this.props.pattern}
          placeholder={this.props.placeholder}
          type="number"
          value={this.props.field.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

NumberInput.propTypes = {
  /**
   * Error string to display in the component. When defined, indicates input has a validation error.
   */
  errorMessage: PropTypes.string,

  /**
   * An object that contains a `value` field which controls the value of the `<input>`.
   * `dirty` just gets passed through as part of the `field` when `onValueChange` is called for a blur event
   */
  field: PropTypes.shape({
    value: PropTypes.string,
    dirty: PropTypes.bool,
  }).isRequired,
  /**
   * String for the input field label.
   */
  label: PropTypes.string.isRequired,
  /**
   * String for `name` attribute for the `<input>`.
   */
  name: PropTypes.string,
  /**
   * Minimum number value
   */
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Maximum number value
   */
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * String specifying the pattern for the input.
   */
  pattern: PropTypes.string,
  /**
   * Placeholder string for input field.
   */
  placeholder: PropTypes.string,
  /**
   * Render marker indicating field is required.
   */
  required: PropTypes.bool,
  /**
   * Handler for the value change with this prototype: (newField)
   */
  onValueChange: PropTypes.func.isRequired,

  /**
   * Will be applied as a class name on the `<input>`
   */
  additionalClass: PropTypes.string,
};

export default NumberInput;
