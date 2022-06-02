import PropTypes from 'prop-types';
import React from 'react';
import i18next from 'i18next';
import { uniqueId, isString } from '../../helpers/utilities';
import { makeField } from '../../helpers/fields';

import dispatchAnalyticsEvent from '../../helpers/analytics';

if (!i18next.exists('collapse-all-aria-label')) {
  console.log('SETTING UP DEPENDENCY IN COMPONENT');
  import('../../../i18n-setup').then(() =>
    console.log('INITIALIZED', i18next.exists('collapse-all-aria-label')),
  );
}

/**
 * A form select with a label that can display error messages.
 *
 * **Note:** This component is deprecated in favor of the `<va-select>` Web Component.
 */

class Select extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    i18next.on('languageChanged', () => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    i18next.off('languageChanged');
  }

  UNSAFE_componentWillMount() {
    this.selectId = uniqueId('errorable-select-');
  }

  handleChange(domEvent) {
    const selectLabel = domEvent.target.value;

    if (this.props.enableAnalytics) {
      dispatchAnalyticsEvent({
        componentName: 'Select',
        action: 'change',

        details: {
          label: this.props.label,
          selectLabel: selectLabel,
        },
      });
    }

    this.props.onValueChange(makeField(selectLabel, true));
  }

  render() {
    const selectedValue = this.props.value.value;

    // Calculate error state.
    let errorSpan = '';
    let errorSpanId = undefined;
    if (this.props.errorMessage) {
      errorSpanId = `${this.selectId}-error-message`;
      errorSpan = (
        <span
          className="usa-input-error-message"
          id={`${errorSpanId}`}
          role="alert"
        >
          {this.props.errorMessage}
        </span>
      );
    }

    // Calculate required.
    let requiredSpan = undefined;
    if (this.props.required) {
      requiredSpan = (
        <span className="form-required-span">{`(*${i18next.t(
          'required',
        )})`}</span>
      );
    }

    const ariaDescribedby =
      [errorSpanId, this.props.ariaDescribedby || ''].join(' ').trim() ||
      undefined;

    // Calculate options for select
    let reactKey = 0;
    // TODO(awong): Remove this hack to handle options prop and use invariants instead.
    const options = Array.isArray(this.props.options) ? this.props.options : [];
    const optionElements = options.map(obj => {
      let label;
      let value;
      if (isString(obj)) {
        label = obj;
        value = obj;
      } else {
        label = obj.label;
        value = obj.value;
      }
      return (
        <option key={++reactKey} value={value}>
          {label}
        </option>
      );
    });

    return (
      <div className={this.props.errorMessage ? 'usa-input-error' : undefined}>
        <label
          className={
            this.props.errorMessage
              ? 'usa-input-error-label'
              : this.props.labelClass
          }
          htmlFor={this.selectId}
        >
          {this.props.label}
          {requiredSpan}
        </label>
        {errorSpan}
        <select
          className={this.props.additionalClass}
          aria-describedby={ariaDescribedby}
          id={this.selectId}
          name={this.props.name}
          value={selectedValue}
          onKeyDown={this.props.onKeyDown}
          onChange={this.handleChange}
          onBlur={this.props.onBlur}
        >
          {this.props.includeBlankOption && (
            <option value="">{this.props.emptyDescription}</option>
          )}
          {optionElements}
        </select>
        {this.props.ariaLiveRegionText && (
          <span
            role="region"
            id="selectAliveRegionInfo"
            className="vads-u-visibility--screen-reader"
            aria-live="assertive"
          >
            {`${this.props.ariaLiveRegionText} ${selectedValue}`}
          </span>
        )}
      </div>
    );
  }
}

Select.propTypes = {
  /**
   * Error string to display in the component.
   * When defined, indicates select has a validation error.
   */
  errorMessage: PropTypes.string,

  /**
   * Select name attribute.
   */
  name: PropTypes.string,

  /**
   * Select field label.
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,

  /**
   * Class name(s) for the label.
   */
  labelClass: PropTypes.string,

  /**
   * KeyDown handler
   */
  onKeyDown: PropTypes.func,
  /**
   * Array of options to populate select.
   */
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.number,
      }),
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ]),
  ).isRequired,

  /**
   * Render marker indicating field is required.
   */
  required: PropTypes.bool,

  /**
   * Is there an empty selectable option
   */
  includeBlankOption: PropTypes.bool,

  /**
   * Description that shows up for the blank option, when `includeBlankOption` is true
   */
  emptyDescription: PropTypes.string,

  /** Object containing:
   *
   *   - `value`: Value of the select field.
   *   - `dirty`: Whether a field has been touched by the user.
   */
  value: PropTypes.shape({
    value: PropTypes.string,
    dirty: PropTypes.bool,
  }).isRequired,

  /**
   * A function with this prototype: (newValue)
   */
  onValueChange: PropTypes.func.isRequired,

  /**
   * Additional css class that is added to the select element.
   */
  additionalClass: PropTypes.string,

  /**
   * Additional css class that is added to the select element.
   */
  ariaLiveRegionText: PropTypes.string,

  /**
   * Analytics tracking function(s) will be called. Form components
   * are disabled by default due to PII/PHI concerns.
   */
  enableAnalytics: PropTypes.bool,

  /**
   * Add additional aria-describedby to the `<select>`
   */
  ariaDescribedby: PropTypes.string,

  /**
   * Call this function when the field is blurred.
   * Function signature: () => void
   */
  onBlur: PropTypes.func,
};

Select.defaultProps = {
  includeBlankOption: true,
};

export default Select;
