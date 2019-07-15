import PropTypes from 'prop-types';
import React from 'react';
import { isUndefined, uniqueId } from 'lodash';

class ErrorableCheckbox extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.inputId = uniqueId('errorable-checkbox-');
  }

  handleChange(domEvent) {
    this.props.onValueChange(domEvent.target.checked);
  }

  render() {
    // TODO: extract error logic into a utility function
    // Calculate error state.
    let errorSpan = '';
    let errorSpanId = undefined;
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

    let className = `form-checkbox${
      this.props.errorMessage ? ' usa-input-error' : ''
    }`;
    if (!isUndefined(this.props.className)) {
      className = `${className} ${this.props.className}`;
    }

    return (
      <div className={className}>
        {this.props.labelAboveCheckbox && (
          <span className="label-above-checkbox">
            {this.props.labelAboveCheckbox}
          </span>
        )}
        <input
          aria-labelledby={this.props.ariaLabelledBy}
          aria-describedby={errorSpanId}
          checked={this.props.checked}
          id={this.inputId}
          name={this.props.name}
          type="checkbox"
          onChange={this.handleChange}
        />
        <label
          className={
            this.props.errorMessage ? 'usa-input-error-label' : undefined
          }
          name={`${this.props.name}-label`}
          htmlFor={this.inputId}
        >
          {this.props.label}
          {requiredSpan}
        </label>
        {errorSpan}
      </div>
    );
  }
}

ErrorableCheckbox.propTypes = {
  /**
   * If the checkbox is checked or not
   */
  checked: PropTypes.bool,
  /**
   * Error message for the modal
   */
  errorMessage: PropTypes.string,
  /**
   * Name for the modal
   */
  name: PropTypes.string,
  /**
   * Label [string or object] for the checkbox. Either this or ariaLabelledBy is required.
   */
  /* eslint-disable consistent-return */
  label: (props, propName, componentName) => {
    const validTypes = ['string', 'object'];

    if (!props.label && !props.ariaLabelledBy) {
      return new Error(
        `Either ${propName} or ariaLabelledBy property is required in ${componentName}, but both are missing.`,
      );
    }

    if (props.label && !validTypes.includes(typeof props.label)) {
      return new Error(
        `${componentName}’s label property type is invalid -- should be one of
        these types: ${validTypes.join(', ')}.`,
      );
    }
  },
  /* eslint-enable consistent-return */
  /**
   * Descriptive text to sit above the checkbox and label
   */
  labelAboveCheckbox: PropTypes.string,
  /**
   * aria-labelledby attribute [string] (external-heading ID). Either this or label is required.
   */
  /* eslint-disable consistent-return */
  ariaLabelledBy: (props, propName, componentName) => {
    if (!props.label && !props.ariaLabelledBy) {
      return new Error(
        `Either ${propName} or label property is required in ${componentName}, but both are missing.`,
      );
    }

    if (props.ariaLabelledBy && typeof props.ariaLabelledBy !== 'string') {
      return new Error(
        `${componentName}’s ariaLabelledBy property type is invalid -- should be
        string.`,
      );
    }
  },
  /* eslint-enable consistent-return */
  /**
   * Handler for when the checkbox is changed
   */
  onValueChange: PropTypes.func.isRequired,
  /**
   * If the checkbox is required or not
   */
  required: PropTypes.bool,
};

export default ErrorableCheckbox;
