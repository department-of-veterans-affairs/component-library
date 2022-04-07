import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  //   Listen,
  Prop,
  h,
  //   State,
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
   */
  @Prop() error: string;

  /**
   * Add additional aria-describedby to the month, day & year elements.
   * Note: make sure the ID exists on the page before adding this, or you'll
   * have an WCAG violation
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

  private handleDateBlurEvent = (event: FocusEvent) => {
    console.log('DATE BLUR');
    this.dateBlurEvent.emit(event);
  };

  private handleDateChangeEvent = (event: Event) => {
    const target: HTMLSelectElement = event.target as HTMLSelectElement;
    this.month = target.value;
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
      //   ariaDescribedby,
      //   maxYear,
      //   minYear,
      handleDateBlurEvent,
      handleDateChangeEvent,
      month,
      day,
      //   year,
    } = this;

    const daysForSelectedMonth = month ? days[month] : [];
    return (
      <Host>
        <slot></slot>
        <fieldset>
          <legend>
            {label || 'Date of birth'}
            {required && <span>(*Required)</span>}
          </legend>
          <span role="alert">
            <span class="sr-only">Error</span> {error}
          </span>
          <div>
            <div>
              <div>
                <va-select
                  error={error}
                  label="Month"
                  name={`${name}Month`}
                  value={month}
                  onVaSelect={handleDateChangeEvent}
                  onBlur={handleDateBlurEvent}
                >
                  {months.map(month => (
                    <option value={month.value}>{month.label}</option>
                  ))}
                </va-select>
              </div>
              <div>
                <va-select
                  error={error}
                  label="Day"
                  name={`${name}Day`}
                  value={day}
                  onVaSelect={handleDateChangeEvent}
                  onBlur={handleDateBlurEvent}
                >
                  {daysForSelectedMonth.map(day => (
                    <option value={day}>{day}</option>
                  ))}
                </va-select>
              </div>
              <div>
                {/* <NumberInput
                  error={error}
                  label="Year"
                  name={`${name}Year`}
                  max={maxYear}
                  min={minYear}
                  pattern="[0-9]{4}"
                  field={year}
                  onValueChange={handleDateChangeEvent}
                  ariaDescribedby={ariaDescribedby}
                  onBlur={handleDateBlurEvent}
                /> */}
              </div>
            </div>
          </div>
        </fieldset>
      </Host>
    );
  }
}
