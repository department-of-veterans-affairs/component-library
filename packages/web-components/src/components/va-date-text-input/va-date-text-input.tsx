import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

import { isFullDate } from '../../utils/date-utils';
@Component({
  tag: 'va-date-text-input',
  styleUrl: 'va-date-text-input.css',
  shadow: true,
})
export class VaDateTextInput {
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
      value,
    } = this;

    // Convert string to number to remove leading 0 on values less than 10
    const [year, month, day] = (value || '').split('-').map(val => val);

    // Check validity of date if invalid provide message and error state styling
    const dateInvalid =
      required && !isFullDate(value) ? 'Please provide a valid date' : null;

    // Setting new attribute to avoid conflicts with only using error attribute
    // Error attribute should be leveraged for custom error messaging
    // Fieldset has an implicit aria role of group
    return (
      <Host value={value} invalid={dateInvalid}>
        <fieldset aria-label="Select Month and two digit day XX and four digit year format XXXX">
          <legend>
            {label} {required && <span class="required">(*Required)</span>}
          </legend>
          {(error || dateInvalid) && (
            <span class="error-message" role="alert">
              <span class="sr-only">Error</span> {error || dateInvalid}
            </span>
          )}
          <div class="date-container">
            <va-text-input
              label="Month"
              name={`${name}Month`}
              maxlength={2}
              minlength={2}
              pattern="[0-9]*"
              // Value must be a string
              // Checking is NaN if so provide empty string
              value={month ? month.toString() : ''}
              onInput={handleDateChange}
              onBlur={handleDateBlur}
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
              // Value must be a string
              // if NaN provide empty string
              value={day ? day.toString() : ''}
              onInput={handleDateChange}
              onBlur={handleDateBlur}
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
              // Value must be a string
              // if NaN provide empty string
              value={year ? year.toString() : ''}
              onInput={handleDateChange}
              onBlur={handleDateBlur}
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
