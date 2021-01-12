import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import { makeField } from '../../helpers/fields';

/**
 * A form input with a label that can display error messages.
 *
 * Props:
 * `errorMessage` - Error string to display in the component.
 *                  When defined, indicates input has a validation error.
 * `label` - String for the input field label.
 * `name` - String for the input name attribute.
 * `tabIndex` - Number for keyboard tab order.
 * `autocomplete` - String for the input autocomplete attribute.
 * `placeholder` - placeholder string for input field.
 * `required` - boolean. Render marker indicating field is required.
 * `field` - string. Value of the input field.
 * `additionalClass` - Extra attribute for use by CSS selector, specifically
 *                     by tests
 * `onValueChange` - a function with this prototype: (newValue)
 */
class TextInput extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.inputId = _.uniqueId('errorable-text-input-');
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
    let maxCharacters;
    let errorSpanId = undefined;
    let inputErrorClass = undefined;
    let labelErrorClass = undefined;
    if (this.props.errorMessage) {
      errorSpanId = `${this.inputId}-error-message`;
      errorSpan = (
        <span className="usa-input-error-message" role="alert" id={errorSpanId}>
          <span className="sr-only">Error</span> {this.props.errorMessage}
        </span>
      );
      inputErrorClass = 'usa-input-error';
      labelErrorClass = 'usa-input-error-label';
    }

    // Calculate max characters and display '(Max. XX characters)' when max is hit.
    if (this.props.field.value) {
      if (this.props.charMax === this.props.field.value.length) {
        maxCharacters = <small>(Max. {this.props.charMax} characters)</small>;
      }
    }

    // Calculate required.
    let requiredSpan = undefined;
    if (this.props.required) {
      requiredSpan = <span className="form-required-span">(*Required)</span>;
    }

    // preventDefault on the div stops the form from submitting after a user
    // presses enter while the input is focused
    return (
      <div className={inputErrorClass}>
        <label className={labelErrorClass} htmlFor={this.inputId}>
          {this.props.label}
          {requiredSpan}
        </label>
        {errorSpan}
        <input
          className={this.props.additionalClass}
          aria-describedby={errorSpanId}
          id={this.inputId}
          placeholder={this.props.placeholder}
          name={this.props.name}
          tabIndex={this.props.tabIndex}
          autoComplete={this.props.autocomplete}
          type={this.props.type}
          maxLength={this.props.charMax}
          value={this.props.field.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {maxCharacters}
      </div>
    );
  }
}

TextInput.propTypes = {
  /**
   * Display error message for input that indicates a validation error
   */
  errorMessage: PropTypes.string,
  /**
   * Label for input field
   */
  label: PropTypes.any.isRequired,
  /**
   * Text displayed when input has no user-provided value
   */
  placeholder: PropTypes.string,
  /**
   * `<input>` name attribute
   */
  name: PropTypes.string,
  /**
   * `<input>` autocomplete attribute
   */
  autocomplete: PropTypes.string,
  /**
   * Render marker indicating field is required
   */
  required: PropTypes.bool,
  /**
   * Value of the input field and if its dirty status
   */
  field: PropTypes.shape({
    value: PropTypes.string,
    dirty: PropTypes.bool,
  }).isRequired,
  /**
   * CSS class that gets applied to the `<input>` element
   */
  additionalClass: PropTypes.string,
  /**
   * Maximum permitted input length
   */
  charMax: PropTypes.number,
  /**
   * Called when input value is changed
   */
  onValueChange: PropTypes.func.isRequired,
  /**
   * `<input>` type attribute
   */
  type: PropTypes.string,
};

TextInput.defaultProps = {
  type: 'text',
};

export default TextInput;
