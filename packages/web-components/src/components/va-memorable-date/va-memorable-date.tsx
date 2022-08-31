import {
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
  Element,
  Fragment,
} from '@stencil/core';

import {
  validate,
  validKeys,
} from '../../utils/date-utils';

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
 */
@Component({
  tag: 'va-memorable-date',
  styleUrl: 'va-memorable-date.css',
  shadow: true,
})
export class VaMemorableDate {
  @Element() el: HTMLElement;
  /**
   * Render marker indicating field is required.
   */
  @Prop() required?: boolean = false;

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
  };

  private handleDateChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    let [currentYear, currentMonth, currentDay] = (this.value || '').split('-');
    if (target.classList.contains('input-month')) {
      currentMonth = target.value;
    }
    if (target.classList.contains('input-day')) {
      currentDay = target.value;
    }
    if (target.classList.contains('input-year')) {
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
    } = this;

    const [year, month, day] = (value || '').split('-');

    // Error attribute should be leveraged for custom error messaging
    // Fieldset has an implicit aria role of group
    return (
      <Host onBlur={handleDateBlur}>
        <fieldset>
          <legend>
            {label} {required && <span class="required">(*Required)</span>}
            <div id="dateHint">
              Please enter two digits for the month and day and four digits for
              the year.
            </div>
          </legend>
          <slot />
          <span id="error-message" role="alert">
            {error && (
              <Fragment>
                <span class="sr-only">Error</span> {error}
              </Fragment>
            )}
          </span>
          <div class="date-container">
            <va-text-input
              label="Month"
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
              label="Day"
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
              label="Year"
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
