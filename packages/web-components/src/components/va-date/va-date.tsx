import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

import { months, days, isFullDate } from '../../utils/date-utils';
@Component({
  tag: 'va-date',
  styleUrl: 'va-date.css',
  shadow: true,
})
export class VaDate {
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
   * Set the `min` value on the year input.
   */
  @Prop() minYear: number;

  /**
   * Set the `max` value on the year input.
   */
  @Prop() maxYear: number;

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

  private handleDateBlur = (event: FocusEvent) => {
    this.dateBlur.emit(event);
  };

  private handleDateChange = (event: Event) => {
    const target = event.target as HTMLSelectElement | HTMLInputElement;
    let [currentYear, currentMonth, currentDay] = (this.value || '').split('-');
    if (target.classList.contains('select-month')) {
      currentMonth = target.value;
    }
    if (target.classList.contains('select-day')) {
      currentDay = target.value;
    }
    if (target.classList.contains('input-year')) {
      currentYear = target.value;
    }
    // Use a leading zero for numbers < 10
    const numFormatter = new Intl.NumberFormat('en-US', {
      minimumIntegerDigits: 2,
    });

    // If Month or Date Select are chosen as empty return ''
    // Otherwise convert numbers less than 10 to have a leading 0
    this.value = `${currentYear}-${
      currentMonth ? numFormatter.format(parseInt(currentMonth)) : ''
    }-${currentDay ? numFormatter.format(parseInt(currentDay)) : ''}`;

    // This event should always fire to allow for validation handling
    this.dateChange.emit(event);
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
      maxYear,
      minYear,
      handleDateBlur,
      handleDateChange,
      value,
    } = this;

    // Convert string to number to remove leading 0 on values less than 10
    const [year, month, day] = (value || '')
      .split('-')
      .map(val => parseInt(val, 10));

    const daysForSelectedMonth = month > 0 ? days[month] : [];

    // Check validity of date if invalid provide message and error state styling
    const dateInvalid =
      required && (!isFullDate(value) || day > daysForSelectedMonth.length)
        ? 'Please provide a valid date'
        : null;

    // Setting new attribute to avoid conflicts with only using error attribute
    // Error attribute should be leveraged for custom error messaging
    // Fieldset has an implicit aria role of group
    return (
      <Host value={value} invalid={dateInvalid}>
        <fieldset aria-label="Select Month and two digit day XX and four digit year format XXX">
          <legend>
            {label || 'Date of birth'}{' '}
            {required && (
              <span class="required">
                (*Required)
              </span>
            )}
          </legend>
          {(error || dateInvalid) && (
            <span class="error-message" role="alert">
              <span class="sr-only">Error</span> {error || dateInvalid}
            </span>
          )}
          <div class="date-container">
            <va-select
              label="Month"
              name={`${name}Month`}
              // Value must be a string
              value={month?.toString()}
              onVaSelect={handleDateChange}
              onBlur={handleDateBlur}
              class="select-month"
            >
              <option value=""></option>
              {months &&
                months.map(month => (
                  <option value={month.value}>{month.label}</option>
                ))}
            </va-select>
            <va-select
              label="Day"
              name={`${name}Day`}
              // If day value set is greater than amount of days in the month
              // set to empty string instead
              // Value must be a string
              value={daysForSelectedMonth.length < day ? '' : day?.toString()}
              onVaSelect={handleDateChange}
              onBlur={handleDateBlur}
              class="select-day"
            >
              <option value=""></option>
              {daysForSelectedMonth &&
                daysForSelectedMonth.map(day => (
                  <option value={day}>{day}</option>
                ))}
            </va-select>
            <va-number-input
              label="Year"
              name={`${name}Year`}
              max={maxYear}
              min={minYear}
              // Value must be a string
              value={year?.toString()}
              onInput={handleDateChange}
              onBlur={handleDateBlur}
              class="input-year"
              inputmode="numeric"
            />
          </div>
        </fieldset>
      </Host>
    );
  }
}
