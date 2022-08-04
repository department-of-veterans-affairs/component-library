import {
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  h,
  Element,
  Fragment,
} from '@stencil/core';

import {
  months,
  days,
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
  @Prop({ reflect: true }) error?: string;

  /**
   * Whether or not only the Month and Year inputs should be displayed.
   */
  @Prop() monthYearOnly?: boolean = false;

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

  @State() invalidDay: boolean = false;
  @State() invalidMonth: boolean = false;
  @State() invalidYear: boolean = false;

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
    /* eslint-disable i18next/no-literal-string */
    const val = `${year ? year : ''}-${
      month ? numFormatter.format(month) : ''
    }-${day ? numFormatter.format(day) : ''}`.replace(/-+$/, '');
    /* eslint-enable i18next/no-literal-string */

    this.value = val ? val : null;
  }

  private handleDateBlur = (event: FocusEvent) => {
    const [year, month, day] = (this.value || '')
      .split('-')
      .map(val => parseInt(val) || null);
    this.setValue(year, month, day);

    const leapYear = checkLeapYear(year);
    const daysForSelectedMonth = leapYear && month == 2 ? 29 : days[month]?.length || 0;

    // Begin built-in validation
    if (year && (year < minYear || year > maxYear)) {
      this.invalidYear = true;
      this.error = `Please enter a year between ${minYear} and ${maxYear}`;
    }
    else {
      this.invalidYear = false;
    }

    if (month && (month < minMonths || month > maxMonths)) {
      this.invalidMonth = true;
      this.error = `Please enter a month between ${minMonths} and ${maxMonths}`;
    }
    else {
      this.invalidMonth = false;
    }

    if (!this.monthYearOnly && (day &&
      (day < minMonths || day > daysForSelectedMonth))) {
      this.invalidDay = true;
      this.error = `Please enter a day between ${minMonths} and ${daysForSelectedMonth}`;
    }
    else {
      this.invalidDay = false;
    }

    if (this.required && (!year || !month || (!this.monthYearOnly && !day))) {
      this.invalidYear = !year;
      this.invalidMonth = !month;
      this.invalidDay = this.monthYearOnly ? false : !day;
      this.error = "Please enter a complete date";
    }

    if (!this.invalidYear && !this.invalidMonth && !this.invalidDay) {
      this.error = null;
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

    this.setValue(
      parseInt(currentYear),
      parseInt(currentMonth),
      parseInt(currentDay),
    );

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
      <Host value={value} onBlur={handleDateBlur}>
        <fieldset>
          <legend>
            {label} {required && <span class="required">(*Required)</span>}
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
            <va-select
              label="Month"
              aria-describedby={error ? 'error-message' : undefined}
              name={`${name}Month`}
              // Value must be a string
              value={month?.toString()}
              onVaSelect={handleDateChange}
              invalid={this.invalidMonth}
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
                aria-describedby={error ? 'error-message' : undefined}
                name={`${name}Day`}
                // If day value set is greater than amount of days in the month
                // set to empty string instead
                // Value must be a string
                value={daysForSelectedMonth.length < day ? '' : day?.toString()}
                onVaSelect={handleDateChange}
                invalid={this.invalidDay}
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
              aria-describedby={error ? 'error-message' : undefined}
              name={`${name}Year`}
              maxlength={4}
              minlength={4}
              pattern="[0-9]{4}"
              // Value must be a string
              // Checking is NaN if so provide empty string
              value={year ? year.toString() : ''}
              invalid={this.invalidYear}
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
