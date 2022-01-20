import PropTypes from 'prop-types';
import React from 'react';
import { uniqueId } from '../../helpers/utilities';
import classNames from 'classnames';

import { makeField } from '../../helpers/fields';

import dispatchAnalyticsEvent from '../../helpers/analytics';
/**
 * A form input with a label that can display error messages.
 */
class TextArea extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.inputId = uniqueId('errorable-textarea-');
  }

  handleChange(domEvent) {
    const val = domEvent.target.value;
    // IE9 doesn’t support max length on textareas
    if (!this.props.charMax || val.length <= this.props.charMax) {
      this.props.onValueChange(makeField(val, this.props.field.dirty));
    }
  }

  handleBlur() {
    // Only fire the analytics event if enabled and value is not null
    if (this.props.enableAnalytics && this.props.field.value) {
      dispatchAnalyticsEvent({
        componentName: 'TextArea',
        action: 'blur',

        details: {
          label: this.props.label,
          value: this.props.field.value,
        },
      });
    }

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

    const classes = classNames(this.props.additionalClass, {
      'input-disabled': this.props.disabled,
    });

    return (
      <div className={inputErrorClass}>
        <label
          id={`${this.inputId}-label`}
          className={labelErrorClass}
          htmlFor={this.inputId}
        >
          {this.props.label}
          {requiredSpan}
        </label>
        {errorSpan}
        <textarea
          disabled={this.props.disabled}
          className={classes}
          aria-describedby={errorSpanId}
          aria-labelledby={`${this.inputId}-label`}
          id={this.inputId}
          placeholder={this.props.placeholder}
          name={this.props.name}
          tabIndex={this.props.tabIndex}
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

TextArea.propTypes = {
  /**
   * Whether or not the `<textarea>` is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Error string to display in the component. When defined, indicates input has an error
   */
  errorMessage: PropTypes.string,

  /**
   * String for the input field label.
   */
  label: PropTypes.string.isRequired,

  /**
   * Placeholder string for input field.
   */
  placeholder: PropTypes.string,

  /**
   * String for the input name attribute.
   */
  name: PropTypes.string,

  /**
   * Render marker indicating field is required.
   */
  required: PropTypes.bool,

  /**
   * Value of the input field.
   */
  field: PropTypes.shape({
    value: PropTypes.string,
    dirty: PropTypes.bool,
  }).isRequired,

  /**
   * Extra attribute for use by CSS selector, specifically by tests
   */
  additionalClass: PropTypes.string,

  /**
   * Max number of characters the field will accept
   */
  charMax: PropTypes.number,

  /**
   * A function with this prototype: (newValue)
   */
  onValueChange: PropTypes.func.isRequired,
  /**
   * Keyboard tab order for radio button group
   */
  tabIndex: PropTypes.number,
  /**
   * Analytics tracking function(s) will be called. Form components
   * are disabled by default due to PII/PHI concerns.
   */
  enableAnalytics: PropTypes.bool,
};

export default TextArea;
