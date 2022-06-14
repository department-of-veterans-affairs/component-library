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
  months,
  days,
  isFullDate,
  isMonthYearDate,
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
  tag: 'va-date',
  styleUrl: 'va-date.css',
  shadow: true,
})
export class VaDate {
  @Element() el: HTMLElement;
  /**
   * Render marker indicating field is required.
   */
  @Prop() required: boolean;

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
  @Prop() error: string;

  /**
   * Whether or not only the Month and Year inputs should be displayed
   */
  @Prop() monthYearOnly: boolean = false;

  /**
   * Set the default date value must be in YYYY-MM-DD format.
   */
  @Prop({ mutable: true }) value: string;

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

  /**
   * Set the value prop as an ISO-8601 date using provided arguments.
   * Strips trailing hyphens and sets date to be null if the
   * date values are all NaNs.
   */
  private setValue(year: number, month: number, day: number): void {
    // Use a leading zero for numbers < 10
    const numFormatter = new Intl.NumberFormat('en-US', {
      minimumIntegerDigits: 2,
    });
    // Ternary to prevent NaN displaying as value for Year
    // Ternary to prevent Month or Day from displaying as single digit
    const val = `${year ? year : ''}-${
      month ? numFormatter.format(month) : ''
    }-${day ? numFormatter.format(day) : ''}`.replace(/-+$/, '');

    this.value = val ? val : null;
  }

  private handleDateBlur = (event: FocusEvent) => {
    const [year, month, day] = (this.value || '')
      .split('-')
      .map(val => parseInt(val));
    this.setValue(year, month, day);

    const daysForSelectedMonth = month > 0 ? days[month] : [];
    const leapYear = checkLeapYear(year);

    const dateFormatChecker = this.monthYearOnly ? isMonthYearDate : isFullDate;

    // Check validity of date if invalid provide message and error state styling
    if (
      !this.error && (
      year < minYear ||
      year > maxYear ||
      month < minMonths ||
      month > maxMonths ||
      (!this.monthYearOnly && (
        day < minMonths ||
        day > daysForSelectedMonth.length ||
        !day)) ||
      !month ||
      !year ||
      (!leapYear && month === 2 && day > 28) ||
      (this.required && !dateFormatChecker(this.value))
      this.error = 'Please enter a valid date';
    )) {
    } else if (this.error !== 'Please enter a valid date') {
      this.error;
    } else {
      this.error = '';
    }
    this.dateBlur.emit(event);
  };

  private handleDateChange = (event: Event) => {
    const target = event.target as HTMLSelectElement | HTMLInputElement;
    let [currentYear, currentMonth, currentDay] = (this.value || '').split('-');
    if (target.classList.contains('select-month')) {
      currentMonth = target.value;
    }
    // This won't happen for monthYearOnly dates
    if (target.classList.contains('select-day')) {
      currentDay = target.value;
    }
    if (target.classList.contains('input-year')) {
      currentYear = target.value;
    }

    this.setValue(parseInt(currentYear), parseInt(currentMonth), parseInt(currentDay))

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
  @Prop() enableAnalytics: boolean;

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
      monthYearOnly,
      value,
    } = this;

    const [year, month, day] = (value || '')
      .split('-')
      .map(val => parseInt(val));
    const daysForSelectedMonth = month > 0 ? days[month] : [];

    // Error attribute should be leveraged for custom error messaging
    // Fieldset has an implicit aria role of group
    return (
      <Host value={value} error={error} onBlur={handleDateBlur}>
        <fieldset>
          <legend>
            {label} {required && <span class="required">(*Required)</span>}
          </legend>
          <slot />
          {error && (
            <span class="error-message" role="alert">
              <span class="sr-only">Error</span> {error}
            </span>
          )}
          <div class="date-container">
            <va-select
              label="Month"
              name={`${name}Month`}
              // Value must be a string
              value={month?.toString()}
              onVaSelect={handleDateChange}
              class="select-month"
              aria-label="Please enter two digits for the month"
            >
              <option value=""></option>
              {months &&
                months.map(month => (
                  <option value={month.value}>{month.label}</option>
                ))}
            </va-select>
            {!monthYearOnly && (
              <va-select
                label="Day"
                name={`${name}Day`}
                // If day value set is greater than amount of days in the month
                // set to empty string instead
                // Value must be a string
                value={daysForSelectedMonth.length < day ? '' : day?.toString()}
                onVaSelect={handleDateChange}
                class="select-day"
                aria-label="Please enter two digits for the day"
              >
                <option value=""></option>
                {daysForSelectedMonth &&
                  daysForSelectedMonth.map(day => (
                    <option value={day}>{day}</option>
                  ))}
              </va-select>
            )}
            <va-text-input
              label="Year"
              name={`${name}Year`}
              maxlength={4}
              minlength={4}
              pattern="[0-9]{4}"
              // Value must be a string
              // Checking is NaN if so provide empty string
              value={year ? year.toString() : ''}
              onInput={handleDateChange}
              onKeyDown={handleDateKey}
              class="input-year"
              inputmode="numeric"
              type="text"
              aria-label="Please enter four digits for the year"
            />
          </div>
        </fieldset>
      </Host>
    );
  }
}
