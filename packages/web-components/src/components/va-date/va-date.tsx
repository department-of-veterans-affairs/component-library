import {
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
} from '@stencil/core';

import {
  months,
  days,
} from '../../../../react-components/src/helpers/options-for-select.js';

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
   * Add additional aria-describedby to the month, day & year elements.
   */
  @Prop() ariaDescribedby: string;

  /**
   * Set the `min` value on the year input.
   */
  @Prop() minYear: number;

  /**
   * Set the `max` value on the year input.
   */
  @Prop() maxYear: number;

  /**
   * Set the default month on the month input.
   */
  @Prop() month: string;

  /**
   * Set the default day on the day input.
   */
  @Prop() day: string;

  /**
   * Set the default year on the year input.
   */
  @Prop() year: string;

  /**
   * Fires when the month input loses focus after its value was changed
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  monthChangeEvent: EventEmitter;

  /**
   * Fires when the month input loses focus
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  monthBlurEvent: EventEmitter;

  /**
   * Fires when the day input loses focus after its value was changed
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  dayChangeEvent: EventEmitter;

  /**
   * Fires when the day input loses focus
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  dayBlurEvent: EventEmitter;

  /**
   * Fires when the year input loses focus after its value was changed
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  yearChangeEvent: EventEmitter;

  /**
   * Fires when the year input loses focus
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  yearBlurEvent: EventEmitter;

  private handleMonthBlurEvent = (event: FocusEvent) => {
    this.monthBlurEvent.emit(event);
  };

  private handleMonthChangeEvent = (event: Event) => {
    const target: HTMLSelectElement = event.target as HTMLSelectElement;
    this.month = target.value;
    this.monthChangeEvent.emit(event);
  };

  private handleDayBlurEvent = (event: FocusEvent) => {
    this.dayBlurEvent.emit(event);
  };

  private handleDayChangeEvent = (event: Event) => {
    const target: HTMLSelectElement = event.target as HTMLSelectElement;
    this.day = target.value;
    this.dayChangeEvent.emit(event);
  };

  private handleYearBlurEvent = (event: FocusEvent) => {
    this.yearBlurEvent.emit(event);
  };

  private handleYearChangeEvent = (event: Event) => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.year = target.value;
    this.yearChangeEvent.emit(event);
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
      ariaDescribedby,
      maxYear,
      minYear,
      handleMonthBlurEvent,
      handleMonthChangeEvent,
      handleDayBlurEvent,
      handleDayChangeEvent,
      handleYearBlurEvent,
      handleYearChangeEvent,
      month,
      day,
      year,
    } = this;

    const daysForSelectedMonth = month ? days[month] : [];
    return (
      <Host>
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
            value={month}
            onVaSelect={handleMonthChangeEvent}
            onBlur={handleMonthBlurEvent}
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
            value={daysForSelectedMonth.length < day ? '' : day}
            onVaSelect={handleDayChangeEvent}
            onBlur={handleDayBlurEvent}
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
            value={year}
            onInput={handleYearChangeEvent}
            ariaDescribedby={ariaDescribedby}
            onBlur={handleYearBlurEvent}
            class="input-year"
            inputmode="numeric"
          />
        </div>
      </Host>
    );
  }
}
