import {
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
  State,
} from '@stencil/core';

import {
  months,
  days,
} from '../../../../react-components/src/helpers/options-for-select.js';

import { isFullDate } from '../../../../react-components/src/helpers/validations.js';

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
  @Prop() value: string;

  /**
   * Fires when the date input loses focus after its value was changed
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  dateChangeEvent: EventEmitter;

  /**
   * Fires when the date input loses focus
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  dateBlurEvent: EventEmitter;

  @State() month: string;
  @State() day: string;
  @State() year: string;

  private minTwoDigits = n => {
    return (n < 10 ? '0' : '') + n;
  };

  private handleDateBlurEvent = (event: FocusEvent) => {
    this.dateBlurEvent.emit(event);
  };

  private handleDateChangeEvent = (event: Event) => {
    const target = event.target as HTMLSelectElement | HTMLInputElement;
    if (target.classList.contains('select-month')) {
      this.month = target.value;
    }
    if (target.classList.contains('select-day')) {
      this.day = target.value;
    }
    if (target.classList.contains('input-year')) {
      this.year = target.value;
    }
    this.dateChangeEvent.emit(event);
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
      handleDateBlurEvent,
      handleDateChangeEvent,
      value,
    } = this;

    let { month, day, year } = this;

    const [defaultYear, defaultMonth, defaultDay] = (value || '').split('-');

    const daysForSelectedMonth = month
      ? days[month]
      : parseInt(defaultMonth, 10) > 0
      ? days[parseInt(defaultMonth, 10)]
      : [];

    day = daysForSelectedMonth.length < day ? '' : day;

    let newDate = `${year || defaultYear}-${
      this.minTwoDigits(month) || defaultMonth
    }-${this.minTwoDigits(day) || defaultDay}`;

    return (
      <Host value={isFullDate(newDate) ? newDate : value}>
        <label htmlFor="date-element">
          {label || 'Date of birth'}{' '}
          {required && <span class="required">(*Required)</span>}
        </label>
        {error && (
          <span class="error-message" role="alert">
            <span class="sr-only">Error</span> {this.error}
          </span>
        )}
        <div>
          <va-select
            label="Month"
            name={`${name}Month`}
            value={
              month || (defaultMonth ? defaultMonth.replace(/^0+/, '') : '')
            }
            onVaSelect={handleDateChangeEvent}
            onBlur={handleDateBlurEvent}
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
            value={day || (defaultDay ? defaultDay.replace(/^0+/, '') : '')}
            onVaSelect={handleDateChangeEvent}
            onBlur={handleDateBlurEvent}
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
            value={year || defaultYear}
            onInput={handleDateChangeEvent}
            onBlur={handleDateBlurEvent}
            class="input-year"
            inputmode="numeric"
          />
        </div>
      </Host>
    );
  }
}
