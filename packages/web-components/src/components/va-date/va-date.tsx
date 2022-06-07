import {
  Build,
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
  forceUpdate,
  Element,
} from '@stencil/core';
import i18next from 'i18next';

import {
  months,
  days,
  isFullDate,
  checkLeapYear,
  maxMonths,
  maxYear,
  minMonths,
  minYear,
} from '../../utils/date-utils';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

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

    this.value = `${currentYear}-${currentMonth ? currentMonth : ''}-${
      currentDay ? currentDay : ''
    }`;

    // This event should always fire to allow for validation handling
    this.dateChange.emit(event);
  };

  private handleDateKey = (event: KeyboardEvent) => {
    // Allow 0-9, Backspace, Delete, Left and Right Arrow, and Tab to clear data or move to next field
    const validKeys = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'Backspace',
      'ArrowRight',
      'ArrowLeft',
      'Tab',
      'Delete',
    ];
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

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

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

    const [year, month, day] = (value || '').split('-').map(val => val);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    const daysForSelectedMonth = monthNum > 0 ? days[monthNum] : [];

    // Error attribute should be leveraged for custom error messaging
    // Fieldset has an implicit aria role of group
    return (
      <Host value={value} error={error} onBlur={handleDateBlur}>
        <fieldset aria-label="Select month and day fields are in two digit format XX and input year field is in four digit format XXXX">
          <legend>
            {label}{' '}
            {required && (
              <span class="required">(*{i18next.t('required')})</span>
            )}
          </legend>
          <slot />
          {error && (
            <span class="error-message" role="alert">
              <span class="sr-only">{i18next.t('error')}</span> {error}
            </span>
          )}
          <div class="date-container">
            <va-select
              label="Month"
              name={`${name}Month`}
              // Value must be a string
              value={monthNum?.toString()}
              onVaSelect={handleDateChange}
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
              value={
                daysForSelectedMonth.length < dayNum ? '' : dayNum?.toString()
              }
              onVaSelect={handleDateChange}
              class="select-day"
            >
              <option value=""></option>
              {daysForSelectedMonth &&
                daysForSelectedMonth.map(day => (
                  <option value={day}>{day}</option>
                ))}
            </va-select>
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
            />
          </div>
        </fieldset>
      </Host>
    );
  }
}
