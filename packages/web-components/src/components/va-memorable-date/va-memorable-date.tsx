import {
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
  Element,
} from '@stencil/core';

import {
  days,
  isFullDate,
  checkLeapYear,
  maxMonths,
  maxYear,
  minMonths,
  minYear,
  validKeys,
} from '../../utils/date-utils';

/**
 * By default all date components have the following validation:
 * - Cannot have blank values
 * - Month and Day must be valid numbers
 * - The Year cannot fall outside of the range of 1900 through the current year plus 100 years
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
  @Prop() error?: string;

  /**
   * Set the default date value must be in YYYY-MM-DD format.
   */
  @Prop({ mutable: true }) value?: string;

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

  private handleDateBlur = (event: FocusEvent) => {
    const [year, month, day] = (this.value || '').split('-').map(val => val);
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    // Use a leading zero for numbers < 10
    const numFormatter = new Intl.NumberFormat('en-US', {
      minimumIntegerDigits: 2,
    });
    this.value = `${year}-${month ? numFormatter.format(monthNum) : ''}-${
      day ? numFormatter.format(dayNum) : ''
    }`;

    const daysForSelectedMonth = monthNum > 0 ? days[monthNum] : [];
    const leapYear = checkLeapYear(yearNum);
    // Check validity of date if invalid provide message and error state styling
    if (
      yearNum < minYear ||
      yearNum > maxYear ||
      monthNum < minMonths ||
      monthNum > maxMonths ||
      dayNum < minMonths ||
      dayNum > daysForSelectedMonth.length ||
      day === '' ||
      month === '' ||
      year === '' ||
      (!leapYear && monthNum === 2 && dayNum > 28) ||
      (this.required && !isFullDate(this.value))
    ) {
      this.error = 'Please enter a valid date';
    } else if (this.error !== 'Please enter a valid date') {
      this.error;
    } else {
      this.error = '';
    }
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

    this.value = `${currentYear}-${currentMonth ? currentMonth : ''}-${
      currentDay ? currentDay : ''
    }`;

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
      <Host value={value} error={error} onBlur={handleDateBlur}>
        <fieldset>
          <legend>
            {label} {required && <span class="required">(*Required)</span>}
            <div id="dateHint">
              Please enter two digits for the month and day and four digits for
              the year.
            </div>
          </legend>
          <slot />
          {error && (
            <span class="error-message" role="alert">
              <span class="sr-only">Error</span> {error}
            </span>
          )}
          <div class="date-container">
            <va-text-input
              label="Month"
              name={`${name}Month`}
              maxlength={2}
              minlength={2}
              pattern="[0-9]*"
              aria-describedby="dateHint"
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
