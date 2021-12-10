import PropTypes from 'prop-types';
import React from 'react';
import { uniqueId, isString } from 'lodash';
import classNames from 'classnames';

import ExpandingGroup from '../ExpandingGroup/ExpandingGroup';

import { makeField } from '../../helpers/fields';

import dispatchAnalyticsEvent from '../../helpers/analytics';

/**
 * A radio button group with a label.
 */
class RadioButtons extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.getMatchingSubSection = this.getMatchingSubSection.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.inputId = this.props.id || uniqueId('errorable-radio-buttons-');
  }

  getMatchingSubSection(checked, optionValue) {
    if (checked && this.props.children) {
      const children = Array.isArray(this.props.children)
        ? this.props.children
        : [this.props.children];
      const subsections = children.filter(
        child => child.props.showIfValueChosen === optionValue,
      );
      return subsections.length > 0 ? subsections[0] : null;
    }

    return null;
  }

  handleChange(domEvent) {
    const optionValue = domEvent.target.value;
    const optionLabel = domEvent.target.parentElement?.querySelector(
      `label[for="${domEvent.target.id}"`,
    ).innerText;

    if (this.props.enableAnalytics) {
      dispatchAnalyticsEvent({
        componentName: 'RadioButtons',
        action: 'change',
        details: {
          label: this.props.label,
          optionLabel: optionLabel,
          required: this.props.required,
        },
      });
    }

    this.props.onValueChange(makeField(optionValue, true));
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

    const options = Array.isArray(this.props.options) ? this.props.options : [];
    const storedValue = this.props.value?.value;
    const optionElements = options.map((option, optionIndex) => {
      let optionLabel;
      let optionValue;
      let optionAdditional;
      if (isString(option)) {
        optionLabel = option;
        optionValue = option;
      } else {
        optionLabel = option.label;
        optionValue = option.value;
        if (option.additional) {
          optionAdditional = <div>{option.additional}</div>;
        }
      }
      const checked = optionValue === storedValue ? 'checked=true' : '';
      const matchingSubSection = this.getMatchingSubSection(
        optionValue === storedValue,
        optionValue,
      );
      const ariaDescribedby =
        (checked && this.props.ariaDescribedby?.[optionIndex]) || null;

      const radioButton = (
        <div
          key={optionAdditional ? undefined : optionIndex}
          className="form-radio-buttons"
        >
          <div className="errorable-radio-button">
            <input
              checked={checked}
              id={`${this.inputId}-${optionIndex}`}
              name={this.props.name}
              type="radio"
              onMouseDown={this.props.onMouseDown}
              onKeyDown={this.props.onKeyDown}
              value={optionValue}
              onChange={this.handleChange}
              aria-describedby={ariaDescribedby}
            />

            <label
              name={`${this.props.name}-${optionIndex}-label`}
              htmlFor={`${this.inputId}-${optionIndex}`}
            >
              {optionLabel}
            </label>
            {matchingSubSection}
            {option.content}
          </div>
        </div>
      );

      let output = radioButton;

      // Return an expanding group for buttons with additional content
      if (optionAdditional) {
        output = (
          <ExpandingGroup
            additionalClass="form-expanding-group-active-radio"
            open={!!checked}
            key={optionIndex}
          >
            {radioButton}
            <div>{optionAdditional}</div>
          </ExpandingGroup>
        );
      }

      return output;
    });

    const fieldsetClass = classNames('fieldset-input', {
      'usa-input-error': this.props.errorMessage,
      [this.props.additionalFieldsetClass]: this.props.additionalFieldsetClass,
    });

    const legendClass = classNames('legend-label', {
      'usa-input-error-label': this.props.errorMessage,
      [this.props.additionalLegendClass]: this.props.additionalLegendClass,
    });

    return (
      <fieldset className={fieldsetClass}>
        <legend className={legendClass}>
          {this.props.label}
          {requiredSpan}
        </legend>
        {errorSpan}
        {optionElements}
      </fieldset>
    );
  }
}

RadioButtons.propTypes = {
  /**
   * Additional fieldset classes
   */
  additionalFieldsetClass: PropTypes.string,
  /**
   * Additional legend classes
   */
  additionalLegendClass: PropTypes.string,
  /**
   * Child elements (content)
   */
  children: PropTypes.node,
  /**
   * Radio button group error message
   */
  errorMessage: PropTypes.string,
  /**
   * Radio button group field label
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  /**
   * Name attribute
   */
  name: PropTypes.string,
  id: PropTypes.string,
  /**
   * Keyboard tab order for radio button group
   */
  tabIndex: PropTypes.number,
  /**
   * Mouse Down handler
   */
  onMouseDown: PropTypes.func,
  /**
   * Key Down handler
   */
  onKeyDown: PropTypes.func,
  /**
   * Array of options to populate group. Each item is a string or an object
   * representing an Expanding Group.
   *
   * If the option is an object, it takes the following shape:
   *
   * `option.label` `<string|element>` - The text to display for the option
   *
   * `option.value` `<string|bool> - `The value of the option when selected
   *
   * `option.additional` `<string|element>` - Content to show conditionally beneath the option when selected
   */
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
          .isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
          .isRequired,
        additional: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      }),
    ]),
  ).isRequired,
  /**
   * Value object for selected field
   *
   * `value`: string value that matches radio button value
   *
   * `dirty`: indicates if form is dirty; should be true after any user input
   */
  value: PropTypes.shape({
    /**
     * Value of the select field.
     */
    value: PropTypes.string,
    dirty: PropTypes.bool,
  }).isRequired,
  /**
   * Handler for the value change
   */
  onValueChange: PropTypes.func.isRequired,
  /**
   * Toggles required field indicator
   */
  required: PropTypes.bool,
  /**
   * Analytics tracking function(s) will be called. Form components
   * are disabled by default due to PII/PHI concerns.
   */
  enableAnalytics: PropTypes.bool,
  /**
   * aria-describedby labels array based on the option index
   */
  ariaDescribedby: PropTypes.arrayOf(PropTypes.string),
};

export default RadioButtons;
