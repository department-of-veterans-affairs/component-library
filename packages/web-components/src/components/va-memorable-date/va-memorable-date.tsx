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
} from '@stencil/core';

import {
  getErrorParameters,
  months,
  validate,
  zeroPadStart,
} from '../../utils/date-utils';
import { getHeaderLevel } from '../../utils/utils';

import i18next from 'i18next';
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
 * @maturityCategory caution
 * @maturityLevel available
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

  @Prop({ mutable: true }) invalidDay: boolean = false;
  @Prop({ mutable: true }) invalidMonth: boolean = false;
  @Prop({ mutable: true }) invalidYear: boolean = false;

  private dayTouched: boolean = false;
  private monthTouched: boolean = false;
  private yearTouched: boolean = false;

  private handleDateBlur = (event: FocusEvent) => {
    const [year, month, day] = (this.value || '').split('-');
    const yearNum = Number(year);
    const monthNum = Number(month);
    const dayNum = Number(day);

    validate({
                     component: this,
                     year: yearNum,
                     month: monthNum,
                     day: dayNum,
                     yearTouched: this.yearTouched,
                     monthTouched: this.monthTouched,
                     dayTouched: this.dayTouched
    });

    if (this.error) {
      return;
    }

    /* eslint-disable i18next/no-literal-string */
    this.value = year || month || day ? `${year}-${
      month ? zeroPadStart(monthNum) : ''}-${
      day ? zeroPadStart(dayNum) : ''
    }` : '';
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

  private handleDateChange = (event: CustomEvent) => {
    const target = event.target as HTMLInputElement;

    let [currentYear, currentMonth, currentDay] = (this.value || '').split('-');
    if (target.classList.contains('input-month') || target.classList.contains('usa-form-group--month-input') || target.classList.contains('usa-form-group--month-select')) {
      currentMonth = target.value;
    }
    if (target.classList.contains('input-day') || target.classList.contains('usa-form-group--day-input')) {
      currentDay = target.value;
    }
    if (target.classList.contains('input-year') || target.classList.contains('usa-form-group--year-input')) {
      currentYear = target.value;
    }

    /* eslint-disable i18next/no-literal-string */
    this.value = currentYear || currentMonth || currentDay ? `${currentYear}-${currentMonth ? currentMonth : ''}-${currentDay ? currentDay : ''}` : '';
    /* eslint-enable i18next/no-literal-string */

    // This event should always fire to allow for validation handling
    this.dateChange.emit(event);
  };

  private handleMonthBlur = () => {
    this.monthTouched = true;
  }

  private handleDayBlur = () => {
    this.dayTouched = true;
  }

  private handleYearBlur = () => {
    this.yearTouched = true;
  }

  /**
   * Whether or not an analytics event will be fired.
   */
  @Prop() enableAnalytics: boolean = false;

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

  render() {
    const {
      required,
      label,
      name,
      hint,
      error,
      handleDateBlur,
      handleDateChange,
      value,
      monthSelect,
      useFormsPattern,
      formHeadingLevel,
      formHeading,
    } = this;

    const [year, month, day] = (value || '').split('-');
    const describedbyIds = ['dateHint', hint ? 'hint' : '']
      .filter(Boolean)
      .join(' ');

    const hintText = monthSelect ? i18next.t('date-hint-with-select') : i18next.t('date-hint');

    const errorParameters = (error: string) => {
      const yearNum = parseInt(year);
      const monthNum = parseInt(month);
      return getErrorParameters(error, yearNum, monthNum);
    }

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
    }

    // get the default message if internal validation fails
    const getStandardErrorMessage = (error: string) => {
      let key = error;
      if (monthSelect && error === 'month-range') {
        key = 'month-select';
      }
      return i18next.t(key, errorParameters(error))
    }

    // Error attribute should be leveraged for custom error messaging
    // Fieldset has an implicit aria role of group
      const ariaLabeledByIds = 
      `${useFormsPattern && formHeading ? 'form-question' : ''} ${ 
        useFormsPattern ? 'form-description' : ''} ${
        useFormsPattern && label ? 'input-label' : ''}`.trim() || null;
        const isFormsPattern = useFormsPattern === 'single' || useFormsPattern === 'multiple' ? true : false;
        let formsHeading = null;
        if (isFormsPattern) {
          const HeaderLevel = getHeaderLevel(formHeadingLevel);
          formsHeading = (
            <Fragment>
              {formHeading &&
                <HeaderLevel id="form-question" part="form-header">
                  {formHeading}
                </HeaderLevel>
              }
              <div id="form-description">
                <slot name="form-description"></slot>
              </div>
          </Fragment>
        )
      }
      const monthDisplay = monthSelect
        ? <div class="usa-form-group usa-form-group--month usa-form-group--select">
          <va-select
            label={i18next.t('month')}
            name={name ? `${name}Month` : 'Month'}
            aria-describedby={describedbyIds}
            aria-labelledby={ariaLabeledByIds}
            invalid={this.invalidMonth}
            onVaSelect={handleDateChange}
            onBlur={this.handleMonthBlur}
            class='usa-form-group--month-select'
            reflectInputError={error === 'month-range' ? true : false}
            value={month ? String(parseInt(month)) : month}
            error={this.invalidMonth ? getStandardErrorMessage(error) : null}
          >
            {months &&
              months.map(monthOption => (
                <option value={monthOption.value} selected={monthOption.value === parseInt(month)}>
                  {monthOption.label}
                </option>
              ))
            }
          </va-select>
        </div>
      : <div class="usa-form-group usa-form-group--month">
        <va-text-input
          label={i18next.t('month')}
          name={name ? `${name}Month` : 'Month'}
          maxlength={2}
          pattern="[0-9]*"
          aria-describedby={describedbyIds}
          aria-labelledby={ariaLabeledByIds}
          invalid={this.invalidMonth}
          // Value must be a string
          // if NaN provide empty string
          value={month?.toString()}
          onInput={handleDateChange}
          onBlur={this.handleMonthBlur}
          class="usa-form-group--month-input memorable-date-input"
          reflectInputError={error === 'month-range' ? true : false}
          inputmode="numeric"
          type="text"
          error={this.invalidMonth ? getStandardErrorMessage(error) : null}
          show-input-error="false"
        />
      </div>;
      const legendClass = classnames({
        'usa-legend': true,
        'usa-label--error': error
      });
      return (
        <Host onBlur={handleDateBlur}>
          {formsHeading}
          <div class="input-wrap">
            <fieldset class="usa-form usa-fieldset">
              <legend class={legendClass} id="input-label" part="legend">
                {label}
                {required && <span class="usa-label--required"> {i18next.t('required')}</span>}
                {hint && <div class="usa-hint" id="hint">{hint}</div>}
                <span class="usa-hint" id="dateHint">{hintText}</span>
              </legend>
              <span id="error-message" role="alert">
                {error && (
                  <Fragment>
                    <span class="usa-sr-only">{i18next.t('error')}</span>
                    <span class="usa-error-message">{getErrorMessage(error)}</span>
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
                    aria-describedby={describedbyIds}
                    invalid={this.invalidDay}
                    // Value must be a string
                    // if NaN provide empty string
                    value={day?.toString()}
                    onInput={handleDateChange}
                    onBlur={this.handleDayBlur}
                    class="usa-form-group--day-input memorable-date-input"
                    reflectInputError={error === 'day-range' ? true : false}
                    inputmode="numeric"
                    type="text"
                    error={this.invalidDay ? getStandardErrorMessage(error) : null}
                    show-input-error="false"
                  />
                </div>
                <div class="usa-form-group usa-form-group--year">
                  <va-text-input
                    label={i18next.t('year')}
                    name={name ? `${name}Year` : 'Year'}
                    maxlength={4}
                    pattern="[0-9]*"
                    aria-describedby={describedbyIds}
                    invalid={this.invalidYear}
                    // Value must be a string
                    // if NaN provide empty string
                    value={year?.toString()}
                    onInput={handleDateChange}
                    onBlur={this.handleYearBlur}
                    class="usa-form-group--year-input memorable-date-input"
                    reflectInputError={error === 'year-range' ? true : false}
                    inputmode="numeric"
                    type="text"
                    error={this.invalidYear ? getStandardErrorMessage(error) : null}
                    show-input-error="false"
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </Host>
      );
  }
}
