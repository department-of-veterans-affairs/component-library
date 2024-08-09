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
import i18next from 'i18next';

import {
  months,
  days,
  validate,
  getErrorParameters,
  zeroPadStart,
} from '../../utils/date-utils';

/**
 * By default all date components have the following validation:
 * - Cannot have blank values
 * - Month and Day must be valid numbers
 * - The Year cannot fall outside of the range of 1900 through the current year plus 100 years
 */

/**
 * @componentName Date input
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref form/date-input
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
   * Optional hint text.
   */
  @Prop() hint?: string;

  /**
   * The error message to render (if any)
   * This prop should be leveraged to display any custom validations needed for this component
   */
  @Prop({
    mutable: true,
    reflect: true
  }) error?: string;

  /**
   * Whether or not only the Month and Year inputs should be displayed.
   */
  @Prop() monthYearOnly?: boolean = false;

  /**
   * Set the default date value must be in YYYY-MM-DD format.
   */
  @Prop({
    mutable: true,
    reflect: true
  }) value?: string;

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

  /**
   * Set the value prop as an ISO-8601 date using provided arguments.
   * Strips trailing hyphens and sets date to be null if the
   * date values are all NaNs.
   */
  private setValue(year: number, month: number, day: number): void {
    // Ternary to prevent NaN displaying as value for Year
    // Ternary to prevent Month or Day from displaying as single digit
    /* eslint-disable i18next/no-literal-string */
    const val = `${year ? year : ''}-${
      month ? zeroPadStart(month) : ''
    }-${day ? zeroPadStart(day) : ''}`.replace(/-+$/, '');
    /* eslint-enable i18next/no-literal-string */

    this.value = val ? val : null;
  }

  private handleDateBlur = (event: FocusEvent) => {
    const [year, month, day] = (this.value || '')
      .split('-')
      .map(val => Number(val));

    validate({
               component: this,
               year,
               month,
               day,
               yearTouched: this.yearTouched,
               monthTouched: this.monthTouched,
               dayTouched: this.dayTouched
             });

    if (this.error) {
      return;
    }

    this.setValue(year, month, day);
    this.dateBlur.emit(event);

    if (this.enableAnalytics) {
      const detail = {
        componentName: 'va-date',
        action: 'blur',
        details: {
          year,
          month,
          day,
          'month-year-only': this.monthYearOnly,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
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

  private handleMonthBlur = () => {
    this.monthTouched = true;
  }

  private handleDayBlur = () => {
    this.dayTouched = true;
  }

  private handleYearBlur = () => {
    this.yearTouched = true;
  }

  render() {
    const {
      required,
      label,
      name,
      error,
      handleDateBlur,
      handleDateChange,
      monthYearOnly,
      value,
      hint,
    } = this;

    const [year, month, day] = (value || '')
      .split('-')
      .map(val => parseInt(val));
    const daysForSelectedMonth = month > 0 ? days[month] : [];
    const errorParameters = (error: string) => {
      return getErrorParameters(error, year, month);
    }

    // Fieldset has an implicit aria role of group
    return (
      <Host onBlur={handleDateBlur}>
        <fieldset>
          <legend>
            {label} {required && <span class="required">(*Required)</span>}
          </legend>
          {hint && <span class="hint-text">{hint}</span>}
          <slot />
          <span id="error-message" role="alert">
            {error && (
              <Fragment>
                <span class="sr-only">Error</span> {i18next.t(error, errorParameters(error))}
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
              onBlur={this.handleMonthBlur}
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
                onBlur={this.handleDayBlur}
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
              pattern="[0-9]{4}"
              // Value must be a string
              // Checking is NaN if so provide empty string
              value={year ? year.toString() : ''}
              invalid={this.invalidYear}
              onInput={handleDateChange}
              onBlur={this.handleYearBlur}
              showInputError={false}
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
