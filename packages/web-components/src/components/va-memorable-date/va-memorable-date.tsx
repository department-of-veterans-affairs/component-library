import {
  Component,
  Event,
  EventEmitter,
  forceUpdate,
  Host,
  Prop,
  h,
  Element,
  Fragment,
  Watch,
} from '@stencil/core';

import {
  getErrorParameters,
  months,
  validate,
  zeroPadStart,
} from '../../utils/date-utils';
import { getHeaderLevel } from '../../utils/utils';

import { i18next } from '../..';
import { Build } from '@stencil/core';
import classnames from 'classnames';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

/**
 * By default all date components have the following validation:
 * - Cannot have blank values
 * - Month and Day must be valid numbers
 * - The Year cannot fall outside of the range of 1900 through the current year plus 100 years
 */

/**
 * @componentName Memorable date
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref form/memorable-date
 * @translations English
 * @translations Spanish
 */
@Component({
  tag: 'va-memorable-date',
  styleUrl: 'va-memorable-date.scss',
  shadow: true,
})
export class VaMemorableDate {
  @Element() el: HTMLElement;
  /**
   * Render marker indicating field is required.
   */
  @Prop() required?: boolean = false;

  /**
   * Enabling this will add a heading and description for integrating into the forms pattern. Accepts `single` or `multiple` to indicate if the form is a single input or will have multiple inputs.
   */
  @Prop() useFormsPattern?: string;

  /**
   * The heading level for the heading if `useFormsPattern`.
   */
  @Prop() formHeadingLevel?: number = 3;

  /**
   * The content of the heading if `useFormsPattern`.
   */
  @Prop() formHeading?: string;

  /**
   * Whether or not to use the month as an input or select.
   */
  @Prop() monthSelect?: boolean = false;

  /**
   * Label for the field.
   */
  @Prop() label!: string;

  /**
   * Used to create unique name attributes for each input.
   */
  @Prop() name!: string;

  /**
   * Hint text string
   */
  @Prop() hint?: string;

  /**
   * The error message to render (if any)
   * This prop should be leveraged to display any custom validations needed for this component
   */
  @Prop({ reflect: true, mutable: true }) error?: string;

  /**
   * Set the default date value must be in YYYY-MM-DD format.
   */
  @Prop({ mutable: true, reflect: true }) value?: string;

  /**
   * A custom error message to display if the day is invalid
   */
  @Prop() customDayErrorMessage?: string;

  /**
   * A custom error message to display if the month is invalid
   */
  @Prop() customMonthErrorMessage?: string;

  /**
   * A custom error message to display if the year is invalid
   */
  @Prop() customYearErrorMessage?: string;

  /**
   * Removes the default date hint text
   */
  @Prop() removeDateHint?: boolean = false;

  /**
   * Set this flag to true if component will recieve external validation that might conflict 
   * with internal validation due to race conditions,
   * i.e. if both internal and external validation will be set in response to same user input.
   */
  @Prop() externalValidation?: boolean = false;

  /**
   * Fires when the date input loses focus after its value was changed
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  dateChange: EventEmitter;

  /**
   * Fires when the date input loses focus
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  dateBlur: EventEmitter;

  @Prop({ mutable: true }) invalidDay?: boolean = false;
  @Prop({ mutable: true }) invalidMonth?: boolean = false;
  @Prop({ mutable: true }) invalidYear?: boolean = false;

  private currentDay: string;
  private currentMonth: string;
  private currentYear: string;

  private dayTouched: boolean = false;
  private monthTouched: boolean = false;
  private yearTouched: boolean = false;

  private handleDateBlur = (event: FocusEvent) => {
    let undef;
    const { currentYear, currentMonth, currentDay } = this;
    // Fallback to undefined to preserve validation of empty strings
    const yearNum = Number(currentYear || undef);
    const monthNum = Number(currentMonth || undef);
    const dayNum = Number(currentDay || undef);

    this.yearTouched = this.yearTouched || yearNum !== undefined;
    this.monthTouched = this.monthTouched || monthNum !== undefined;
    this.dayTouched = this.dayTouched || dayNum !== undefined;

      validate({
        component: this,
        year: yearNum,
        month: monthNum,
        day: dayNum,
        yearTouched: this.yearTouched,
        monthTouched: this.monthTouched,
        dayTouched: this.dayTouched,
        monthSelect: this.monthSelect,
      });

      if (this.error) {
        // fire blur event for external validation handling
        if (this.externalValidation) {
          this.dateBlur.emit(event);
        }
        return;
      }

    /* eslint-disable i18next/no-literal-string */
    this.value =
      currentYear || currentMonth || currentDay
        ? [
            currentYear,
            currentMonth ? zeroPadStart(monthNum) : '',
            currentDay ? zeroPadStart(dayNum) : '',
          ].join('-')
        : '';
    /* eslint-enable i18next/no-literal-string */

    // Any custom validation will happen first; otherwise consumer code clearing
    // errors will also remove internal errors.
      this.dateBlur.emit(event);

    if (this.enableAnalytics) {
      const detail = {
        componentName: 'va-memorable-date',
        action: 'blur',
        details: {
          label: this.label,
          year: yearNum,
          month: monthNum,
          day: dayNum,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  };

  private handleMonthChange = event => {
    const target = event.target as HTMLInputElement;
    this.currentMonth = target.value;
    this.handleDateChange(event);
  };

  private handleDayChange = event => {
    const target = event.target as HTMLInputElement;
    this.currentDay = target.value;
    this.handleDateChange(event);
  };

  private handleYearChange = event => {
    const target = event.target as HTMLInputElement;
    this.currentYear = target.value;
    this.handleDateChange(event);
  };

  private handleDateChange = (event: InputEvent) => {
    const { currentYear, currentMonth, currentDay } = this;
    /* eslint-disable i18next/no-literal-string */
    this.value =
      currentYear || currentMonth || currentDay
        ? [currentYear || '', currentMonth || '', currentDay || ''].join('-')
        : '';
    /* eslint-enable i18next/no-literal-string */

    // This event should always fire to allow for validation handling
    this.dateChange.emit(event);
  };

  private handleMonthBlur = () => {
    this.monthTouched = true;
  };

  private handleDayBlur = () => {
    this.dayTouched = true;
  };

  private handleYearBlur = () => {
    this.yearTouched = true;
  };

  /**
   * Whether or not an analytics event will be fired.
   */
  @Prop() enableAnalytics: boolean = false;

  /**
   * Insert a header with defined level inside the label (legend)
   */
  @Prop() labelHeaderLevel?: string;

  /**
   * An optional message that will be read by screen readers when the header is focused. The label-header-level
   * prop must be set for this to be active.
   */
  @Prop() headerAriaDescribedby?: string;

  /**
   * The event used to track usage of the component. This is emitted when an
   * input value changes and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

  componentWillLoad() {
    // Set initial values
    this.parseValueProp();
  }

  /**
   * Parse the value prop and update internal state
   */
  private parseValueProp() {
    const [year, month, day] = (this.value || '').split('-');
    this.currentYear = year;
    this.currentMonth = month;
    this.currentDay = day;
  }

  /**
   * Watch for changes to the value prop and update input fields.
   * The value prop will be a string in the YYYY-MM-DD format.
   */
  @Watch('value')
  handleValueChange() {
    this.parseValueProp();
    // Clear any existing validation errors when value changes externally
    this.error = null;
    this.invalidDay = false;
    this.invalidMonth = false;
    this.invalidYear = false;
  }

  render() {
    const {
      required,
      label,
      name,
      hint,
      error,
      handleDateBlur,
      monthSelect,
      useFormsPattern,
      formHeadingLevel,
      formHeading,
      removeDateHint,
      headerAriaDescribedby
    } = this;

    // due to race conditions with external validation and internal validation, 
    // sometimes the error prop is not set to the most recent error, which is the error attribute in the DOM
    const _error = !this.externalValidation ? error : this.el?.getAttribute('error') || error;

    const { currentYear, currentMonth, currentDay } = this;

    const hintText = monthSelect
      ? i18next.t('date-hint-with-select')
      : i18next.t('date-hint');

    const errorParameters = (error: string) => {
      const yearNum = parseInt(currentYear, 10);
      const monthNum = parseInt(currentMonth, 10);
      return getErrorParameters(error, yearNum, monthNum);
    };

    // get a custom error method if existent when internal validation fails
    // otherwise take standard error message
    const getErrorMessage = (error: string) => {
      let errorMessage: string = '';

      if (this.invalidDay) {
        errorMessage = this.customDayErrorMessage;
      } else if (this.invalidMonth) {
        errorMessage = this.customMonthErrorMessage;
      } else if (this.invalidYear) {
        errorMessage = this.customYearErrorMessage;
      }

      return errorMessage ? errorMessage : getStandardErrorMessage(error);
    };

    // get the default message if internal validation fails
    const getStandardErrorMessage = (error: string) => {
      return i18next.t(error, errorParameters(error));
    };

    // Error attribute should be leveraged for custom error messaging
    // Fieldset has an implicit aria role of group
    const ariaLabeledByIds =
      `${useFormsPattern && formHeading ? 'form-question' : ''} ${
        useFormsPattern ? 'form-description' : ''
      } ${useFormsPattern && label ? 'input-label' : ''}`.trim() || null;
    const isFormsPattern =
      useFormsPattern === 'single' || useFormsPattern === 'multiple'
        ? true
        : false;
    const HeaderLevel = getHeaderLevel(this.labelHeaderLevel);

    /* eslint-disable i18next/no-literal-string */
    const headerAriaDescribedbyId = headerAriaDescribedby
      ? 'header-message'
      : null;

    let formsHeading = null;
    if (isFormsPattern) {
      const HeaderLevel = getHeaderLevel(formHeadingLevel);
      formsHeading = (
        <Fragment>
          {formHeading && (
            <HeaderLevel id="form-question" part="form-header">
              {formHeading}
            </HeaderLevel>
          )}
          <div id="form-description">
            <slot name="form-description"></slot>
          </div>
        </Fragment>
      );
    }
    const monthDisplay = monthSelect ? (
      <div class="usa-form-group usa-form-group--month usa-form-group--select">
        <va-select
          label={i18next.t('month')}
          name={name ? `${name}Month` : 'Month'}
          aria-labelledby={ariaLabeledByIds}
          invalid={this.invalidMonth}
          onVaSelect={this.handleMonthChange}
          onBlur={this.handleMonthBlur}
          class="usa-form-group--month-select"
          reflectInputError={_error === 'month-range' ? true : false}
          value={
            currentMonth ? String(parseInt(currentMonth, 10)) : currentMonth
          }
          required={required}
          hideRequiredText={true}
          error={this.invalidMonth ? getStandardErrorMessage(_error) : null}
          showError={false}
          messageAriaDescribedby={i18next.t('date-hint-month-select')}
        >
          {months &&
            months.map(monthOption => (
              <option
                value={monthOption.value}
                selected={monthOption.value === parseInt(currentMonth, 10)}
              >
                {monthOption.label}
              </option>
            ))}
        </va-select>
      </div>
    ) : (
      <div class="usa-form-group usa-form-group--month">
        <va-text-input
          label={i18next.t('month')}
          name={name ? `${name}Month` : 'Month'}
          maxlength={2}
          pattern="[0-9]*"
          aria-labelledby={ariaLabeledByIds}
          invalid={this.invalidMonth}
          // Value must be a string
          // if NaN provide empty string
          value={currentMonth?.toString()}
          onInput={this.handleMonthChange}
          onBlur={this.handleMonthBlur}
          class="usa-form-group--month-input memorable-date-input"
          reflectInputError={_error === 'month-range' ? true : false}
          inputmode="numeric"
          type="text"
          required={required}
          hideRequiredText={true}
          error={this.invalidMonth ? getStandardErrorMessage(_error) : null}
          show-input-error="false"
          messageAriaDescribedby={i18next.t('date-hint-month')}
        />
      </div>
    );
    const legendClass = classnames({
      'usa-legend': true,
      'usa-label--error': _error,
    });

    const InnerLabelPart = (
      <Fragment>
        {label}

        {useFormsPattern === 'multiple' ? (
          <span id="header-message" class="usa-sr-only">
            {label}
          </span>
        ) : headerAriaDescribedby && (
          <span id="header-message" class="usa-sr-only">
            {headerAriaDescribedby}
          </span>
        )}
      </Fragment>
    );

    return (
      <Host onBlur={handleDateBlur}>
        {formsHeading}
        <div class="input-wrap">
          <fieldset class="usa-form usa-fieldset">
            <legend class={legendClass} id="input-label" part="legend">
              {label && HeaderLevel ? (
                  <HeaderLevel
                    aria-describedby={headerAriaDescribedbyId}
                  >
                    {InnerLabelPart}
                  </HeaderLevel>
                ) : (
                  <Fragment>{InnerLabelPart}</Fragment>
              )}
              {required && (
                <span class="usa-label--required">
                  {' '}
                  {i18next.t('required')}
                </span>
              )}
              {hint && (
                <div class="usa-hint" id="hint">
                  {hint}
                </div>
              )}
            </legend>

            {!removeDateHint && (
              <span class="usa-hint" id="dateHint">
                {hintText}
              </span>
            )}

            <span id="error-message" role="alert">
              {_error && (
                <Fragment>
                  <span class="usa-sr-only">{i18next.t('error')}</span>
                  <span class="usa-error-message">
                    {getErrorMessage(_error)}
                  </span>
                </Fragment>
              )}
            </span>
            <slot />

            <div class="usa-memorable-date">
              {monthDisplay}
              <div class="usa-form-group usa-form-group--day">
                <va-text-input
                  label={i18next.t('day')}
                  name={name ? `${name}Day` : 'Day'}
                  maxlength={2}
                  pattern="[0-9]*"
                  invalid={this.invalidDay}
                  // Value must be a string
                  // if NaN provide empty string
                  value={currentDay?.toString()}
                  onInput={this.handleDayChange}
                  onBlur={this.handleDayBlur}
                  class="usa-form-group--day-input memorable-date-input"
                  reflectInputError={_error === 'day-range' ? true : false}
                  inputmode="numeric"
                  type="text"
                  required={required}
                  hideRequiredText={true}
                  error={
                    this.invalidDay ? getStandardErrorMessage(_error) : null
                  }
                  show-input-error="false"
                  messageAriaDescribedby={i18next.t('date-hint-day')}
                />
              </div>
              <div class="usa-form-group usa-form-group--year">
                <va-text-input
                  label={i18next.t('year')}
                  name={name ? `${name}Year` : 'Year'}
                  maxlength={4}
                  pattern="[0-9]*"
                  invalid={this.invalidYear}
                  // Value must be a string
                  // if NaN provide empty string
                  value={currentYear?.toString()}
                  onInput={this.handleYearChange}
                  onBlur={this.handleYearBlur}
                  class="usa-form-group--year-input memorable-date-input"
                  reflectInputError={_error === 'year-range' ? true : false}
                  inputmode="numeric"
                  type="text"
                  required={required}
                  hideRequiredText={true}
                  error={
                    this.invalidYear ? getStandardErrorMessage(_error) : null
                  }
                  show-input-error="false"
                  messageAriaDescribedby={i18next.t('date-hint-year')}
                />
              </div>
            </div>
          </fieldset>
        </div>
      </Host>
    );
  }
}
