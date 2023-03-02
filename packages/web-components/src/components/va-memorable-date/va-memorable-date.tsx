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
  // Listen,
} from '@stencil/core';

import {
  validate,
  validKeys,
} from '../../utils/date-utils';

import i18next from 'i18next';
import { Build } from '@stencil/core';

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
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    // Use a leading zero for numbers < 10
    const numFormatter = new Intl.NumberFormat('en-US', {
      minimumIntegerDigits: 2,
    });
    /* eslint-disable i18next/no-literal-string */
    this.value = `${year}-${month ? numFormatter.format(monthNum) : ''}-${
      day ? numFormatter.format(dayNum) : ''
    }`;
    /* eslint-enable i18next/no-literal-string */

    // Run built-in validation. Any custom validation
    // will happen afterwards
    validate(this, yearNum, monthNum, dayNum);
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
    this.value = `${currentYear}-${currentMonth ? currentMonth : ''}-${
      currentDay ? currentDay : ''
    }`;
    /* eslint-enable i18next/no-literal-string */

    // This event should always fire to allow for validation handling
    this.dateChange.emit(event);
  };

  private handleDateKey = (event: KeyboardEvent) => {
    if (validKeys.indexOf(event.key) < 0) {
      event.preventDefault();
      return false;
    }
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
      this.handleDateChange;
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
      error,
      handleDateBlur,
      handleDateChange,
      handleDateKey,
      value,
      uswds,
      monthSelect,
    } = this;

    const [year, month, day] = (value || '').split('-');

    const options = [
      <option key="1" value="1">01 - {i18next.t('january')}</option>,
      <option key="2" value="2">02 - {i18next.t('february')}</option>,
      <option key="3" value="3">03 - {i18next.t('march')}</option>,
      <option key="4" value="4">04 - {i18next.t('april')}</option>,
      <option key="5" value="5">05 - {i18next.t('may')}</option>,
      <option key="6" value="6">06 - {i18next.t('june')}</option>,
      <option key="7" value="7">07 - {i18next.t('july')}</option>,
      <option key="8" value="8">08 - {i18next.t('august')}</option>,
      <option key="9" value="9">09 - {i18next.t('september')}</option>,
      <option key="10" value="10">10 - {i18next.t('october')}</option>,
      <option key="11" value="11">11 - {i18next.t('november')}</option>,
      <option key="12" value="12">12 - {i18next.t('december')}</option>,
    ]

    const hintText = monthSelect ? i18next.t('date-hint-with-select') : i18next.t('date-hint');
    const monthDisplay = monthSelect
    ? <div class="usa-form-group usa-form-group--month usa-form-group--select">
      <va-select
        uswds
        label={i18next.t('month')}
        name={`${name}Month`}
        aria-describedby="dateHint"
        invalid={this.invalidMonth}
        onVaSelect={handleDateChange}
        class="usa-form-group--month-select"
      >
        {options}
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
        aria-describedby="dateHint"
        invalid={this.invalidMonth}
        // Value must be a string
        // if NaN provide empty string
        value={month?.toString()}
        onInput={handleDateChange}
        onKeyDown={handleDateKey}
        class="usa-form-group--month-input"
        inputmode="numeric"
        type="text"
      />
    </div>;

    // Error attribute should be leveraged for custom error messaging
    // Fieldset has an implicit aria role of group
    if(uswds) {
      return (
        <Host onBlur={handleDateBlur}>
          <fieldset class="usa-fieldset">
            <legend class="usa-legend">
              {label}
              {required && <span class="usa-label--required"> {i18next.t('required')}</span>}
            </legend>
            <span class="usa-hint" id="dateHint">{hintText}.</span>
            <slot />
            <span id="input-error-message" role="alert">
              {error && (
                <Fragment>
                  <span class="usa-sr-only">{i18next.t('error')}</span> 
                  <span class="usa-error-message">{error}</span>
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
                  aria-describedby="dateHint"
                  invalid={this.invalidDay}
                  // Value must be a string
                  // if NaN provide empty string
                  value={day?.toString()}
                  onInput={handleDateChange}
                  onKeyDown={handleDateKey}
                  class="usa-form-group--day-input"
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
                  aria-describedby="dateHint"
                  invalid={this.invalidYear}
                  // Value must be a string
                  // if NaN provide empty string
                  value={year?.toString()}
                  onInput={handleDateChange}
                  onKeyDown={handleDateKey}
                  class="usa-form-group--year-input"
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
              <div id="dateHint">{i18next.t('date-hint')}.</div>
            </legend>
            <slot />
            <span id="error-message" role="alert">
              {error && (
                <Fragment>
                  <span class="sr-only">{i18next.t('error')}</span> {error}
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
                aria-describedby="dateHint"
                invalid={this.invalidMonth}
                // Value must be a string
                // if NaN provide empty string
                value={month?.toString()}
                onInput={handleDateChange}
                onKeyDown={handleDateKey}
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
                aria-describedby="dateHint"
                invalid={this.invalidDay}
                // Value must be a string
                // if NaN provide empty string
                value={day?.toString()}
                onInput={handleDateChange}
                onKeyDown={handleDateKey}
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
                aria-describedby="dateHint"
                invalid={this.invalidYear}
                // Value must be a string
                // if NaN provide empty string
                value={year?.toString()}
                onInput={handleDateChange}
                onKeyDown={handleDateKey}
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
