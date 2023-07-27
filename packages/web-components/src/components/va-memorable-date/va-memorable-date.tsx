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
  checkIsNaN,
  zeroPadStart,
} from '../../utils/date-utils';

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
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;

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

  private handleDateBlur = (event: FocusEvent) => {
    const [year, month, day] = (this.value || '').split('-');
    const yearNum = Number(year);
    const monthNum = Number(month);
    const dayNum = Number(day);

    if(!checkIsNaN(this, yearNum, monthNum, dayNum)) {
      // if any fields are NaN do not continue validation
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

    // Built-in validation is run after custom so internal errors override
    // custom errors, e.g. Show invalid date instead of custom error
    validate(this, yearNum, monthNum, dayNum);

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
      uswds,
      monthSelect,
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

    // Error attribute should be leveraged for custom error messaging
    // Fieldset has an implicit aria role of group
    if (uswds) {
      const monthDisplay = monthSelect
        ? <div class="usa-form-group usa-form-group--month usa-form-group--select">
          <va-select
            uswds
            label={i18next.t('month')}
            name={`${name}Month`}
            aria-describedby={describedbyIds}
            invalid={this.invalidMonth}
            onVaSelect={handleDateChange}
            class='usa-form-group--month-select'
            reflectInputError={error ? true : false}
            value={month ? String(parseInt(month)) : month}
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
          uswds
          label={i18next.t('month')}
          name={`${name}Month`}
          maxlength={2}
          minlength={2}
          pattern="[0-9]*"
          aria-describedby={describedbyIds}
          invalid={this.invalidMonth}
          // Value must be a string
          // if NaN provide empty string
          value={month?.toString()}
          onInput={handleDateChange}
          class="usa-form-group--month-input"
          reflectInputError={error ? true : false}
          inputmode="numeric"
          type="text"
        />
      </div>;
      const legendClass = classnames({
        'usa-legend': true,
        'usa-label--error': error
      });
      return (
        <Host onBlur={handleDateBlur}>
          <fieldset class="usa-form usa-fieldset">
            <legend class={legendClass} part="legend">
              {label}
              {required && <span class="usa-label--required"> {i18next.t('required')}</span>}
              {hint && <div id="hint">{hint}</div>}
            </legend>
            <span class="usa-hint" id="dateHint">{hintText}.</span>
            <slot />
            <span id="error-message" role="alert">
              {error && (
                <Fragment>
                  <span class="usa-sr-only">{i18next.t('error')}</span>
                  <span class="usa-error-message">{i18next.t(error, errorParameters(error))}</span>
                </Fragment>
              )}
            </span>
            <div class="usa-memorable-date">
              {monthDisplay}
              <div class="usa-form-group usa-form-group--day">
                <va-text-input
                  uswds
                  label={i18next.t('day')}
                  name={`${name}Day`}
                  maxlength={2}
                  minlength={2}
                  pattern="[0-9]*"
                  aria-describedby={describedbyIds}
                  invalid={this.invalidDay}
                  // Value must be a string
                  // if NaN provide empty string
                  value={day?.toString()}
                  onInput={handleDateChange}
                  class="usa-form-group--day-input"
                  reflectInputError={error ? true : false}
                  inputmode="numeric"
                  type="text"
                />
              </div>
              <div class="usa-form-group usa-form-group--year">
                <va-text-input
                  uswds
                  label={i18next.t('year')}
                  name={`${name}Year`}
                  maxlength={4}
                  minlength={4}
                  pattern="[0-9]*"
                  aria-describedby={describedbyIds}
                  invalid={this.invalidYear}
                  // Value must be a string
                  // if NaN provide empty string
                  value={year?.toString()}
                  onInput={handleDateChange}
                  class="usa-form-group--year-input"
                  reflectInputError={error ? true : false}
                  inputmode="numeric"
                  type="text"
                />
              </div>
            </div>
          </fieldset>
        </Host>
      );
    } else {
      return (
        <Host onBlur={handleDateBlur}>
          <fieldset>
            <legend>
              {label} {required && <span class="required">{i18next.t('required')}</span>}
              {hint && <div id="hint">{hint}</div>}
              <div id="dateHint">{i18next.t('date-hint')}.</div>
            </legend>
            <slot />
            <span id="error-message" role="alert">
              {error && (
                <Fragment>
                  <span class="sr-only">{i18next.t('error')}</span> {i18next.t(error, errorParameters(error))}
                </Fragment>
              )}
            </span>
            <div class="date-container">
              <va-text-input
                label={i18next.t('month')}
                name={`${name}Month`}
                maxlength={2}
                minlength={2}
                pattern="[0-9]*"
                aria-describedby={describedbyIds}
                invalid={this.invalidMonth}
                // Value must be a string
                // if NaN provide empty string
                value={month?.toString()}
                onInput={handleDateChange}
                class="input-month"
                inputmode="numeric"
                type="text"
                />
              <va-text-input
                label={i18next.t('day')}
                name={`${name}Day`}
                maxlength={2}
                minlength={2}
                pattern="[0-9]*"
                aria-describedby={describedbyIds}
                invalid={this.invalidDay}
                // Value must be a string
                // if NaN provide empty string
                value={day?.toString()}
                onInput={handleDateChange}
                class="input-day"
                inputmode="numeric"
                type="text"
                />
              <va-text-input
                label={i18next.t('year')}
                name={`${name}Year`}
                maxlength={4}
                minlength={4}
                pattern="[0-9]*"
                aria-describedby={describedbyIds}
                invalid={this.invalidYear}
                // Value must be a string
                // if NaN provide empty string
                value={year?.toString()}
                onInput={handleDateChange}
                class="input-year"
                inputmode="numeric"
                type="text"
                />
            </div>
          </fieldset>
        </Host>
      );
    }
  }
}
