import PropTypes from 'prop-types';
import React from 'react';
import { uniqueId } from '../../helpers/utilities';
import { makeField } from '../../helpers/fields';
import i18next from 'i18next';

import dispatchAnalyticsEvent from '../../helpers/analytics';

/**
 * **Note:** This component is deprecated in favor of the <va-text-input> web
 * component.
 *
 * A form input with a label that can display error messages.
 *
 */
class TextInput extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.inputId = uniqueId('errorable-text-input-');
  }

  handleChange(domEvent) {
    this.props.onValueChange(
      makeField(domEvent.target.value, this.props.field.dirty),
    );
  }

  handleBlur() {
    // Only fire the analytics event if enabled and value is not null
    if (this.props.enableAnalytics && this.props.field.value) {
      dispatchAnalyticsEvent({
        componentName: 'TextInput',
        action: 'blur',

        details: {
          label: this.props.label,
          value: this.props.field.value,
        },
      });
    }

    this.props.onValueChange(makeField(this.props.field.value, true));
  }

  componentDidMount() {
    i18next.on('languageChanged', () => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    i18next.off('languageChanged');
  }
  
  render() {
    let ariaDescribedBy = this.props.ariaDescribedBy;
    // Calculate error state.
    let errorSpan = '';
    let maxCharacters;
    let inputErrorClass = undefined;
    let labelErrorClass = undefined;
    if (this.props.errorMessage) {
      const errorSpanId = `${this.inputId}-error-message`;
      errorSpan = (
        <span className="usa-input-error-message" role="alert" id={errorSpanId}>
          <span className="sr-only">{i18next.t('Error')}</span> {this.props.errorMessage}
        </span>
      );
      inputErrorClass = 'usa-input-error';
      labelErrorClass = 'usa-input-error-label';
      ariaDescribedBy = ariaDescribedBy
        ? `${ariaDescribedBy} ${errorSpanId}`
        : errorSpanId;
    }

    // Calculate max characters and display '(Max. XX characters)' when max is hit.
    if (this.props.field.value) {
      if (this.props.charMax === this.props.field.value.length) {
        maxCharacters = <small>({i18next.t('max-chars', { length: this.maxlength })})</small>;
      }
    }

    // Calculate required.
    let requiredSpan = undefined;
    if (this.props.required) {
      requiredSpan = <span className="form-required-span">{i18next.t('required')}</span>;
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
          aria-describedby={ariaDescribedBy}
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
   * Sets the aria-describedby attribute
   */
  /* eslint-disable consistent-return */
  ariaDescribedBy: PropTypes.string,
  /**
   * `<input>` type attribute
   */
  type: PropTypes.string,
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

TextInput.defaultProps = {
  type: 'text',
};

export default TextInput;
