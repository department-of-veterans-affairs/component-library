import {
  Component,
  Event,
  EventEmitter,
  forceUpdate,
  Host,
  Prop,
  h,
  Element,
  Fragment,
} from '@stencil/core';

import {
  getErrorParameters,
  months,
  validate,
  zeroPadStart,
} from '../../utils/date-utils';
import { getHeaderLevel } from '../../utils/utils';

import { i18next } from '../..';
import { Build } from '@stencil/core';
import classnames from 'classnames';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

/**
 * By default all date components have the following validation:
 * - Cannot have blank values
 * - Month and Day must be valid numbers
 * - The Year cannot fall outside of the range of 1900 through the current year plus 100 years
 */

/**
 * @componentName Memorable date
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref form/memorable-date
 * @translations English
 * @translations Spanish
 */
@Component({
  tag: 'va-memorable-date',
  styleUrl: 'va-memorable-date.scss',
  shadow: true,
})
export class VaMemorableDate {
  @Element() el: HTMLElement;

  /**
   * Render marker indicating field is required.
   */
  @Prop() required?: boolean = false;

  /**
   * Enabling this will add a heading and description for integrating into the forms pattern. Accepts `single` or `multiple` to indicate if the form is a single input or will have multiple inputs.
   */
  @Prop() useFormsPattern?: string;

  /**
   * The heading level for the heading if `useFormsPattern`.
   */
  @Prop() formHeadingLevel?: number = 3;

  /**
   * The content of the heading if `useFormsPattern`.
   */
  @Prop() formHeading?: string;

  /**
   * Whether or not to use the month as an input or select.
   */
  @Prop() monthSelect?: boolean = false;

  /**
   * Label for the field.
   */
  @Prop() label!: string;

  /**
   * Used to create unique name attributes for each input.
   */
  @Prop() name!: string;

  /**
   * Hint text string
   */
  @Prop() hint?: string;

  /**
   * The error message to render (if any)
   * This prop should be leveraged to display any custom validations needed for this component
   */
  @Prop({ reflect: true, mutable: true }) error?: string;

  /**
   * Set the default date value must be in YYYY-MM-DD format.
   */
  @Prop({ mutable: true, reflect: true }) value?: string;

  /**
   * A custom error message to display if the day is invalid
   */
  @Prop() customDayErrorMessage?: string;

  /**
   * A custom error message to display if the month is invalid
   */
  @Prop() customMonthErrorMessage?: string;

  /**
   * A custom error message to display if the year is invalid
   */
  @Prop() customYearErrorMessage?: string;

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

  @Prop({ mutable: true }) invalidDay?: boolean = false;
  @Prop({ mutable: true }) invalidMonth?: boolean = false;
  @Prop({ mutable: true }) invalidYear?: boolean = false;

  private currentDay: string;
  private currentMonth: string;
  private currentYear: string;

  private dayTouched: boolean = false;
  private monthTouched: boolean = false;
  private yearTouched: boolean = false;

  private hasValidHintSlot: boolean = false;
  private slotHintValues: { [key: string]: string | null} = {
    dayHint: null,
    monthHint: null,
    yearHint: null,
  };

  private handleDateBlur = (event: FocusEvent) => {
    let undef;
    const { currentYear, currentMonth, currentDay } = this;
    // Fallback to undefined to preserve validation of empty strings
    const yearNum = Number(currentYear || undef);
    const monthNum = Number(currentMonth || undef);
    const dayNum = Number(currentDay || undef);

    validate({
      component: this,
      year: yearNum,
      month: monthNum,
      day: dayNum,
      yearTouched: this.yearTouched,
      monthTouched: this.monthTouched,
      dayTouched: this.dayTouched,
      monthSelect: this.monthSelect,
    });

    if (this.error) {
      return;
    }

    /* eslint-disable i18next/no-literal-string */
    this.value =
      currentYear || currentMonth || currentDay
        ? [
            currentYear,
            currentMonth ? zeroPadStart(monthNum) : '',
            currentDay ? zeroPadStart(dayNum) : '',
          ].join('-')
        : '';
    /* eslint-enable i18next/no-literal-string */

    // Any custom validation will happen first; otherwise consumer code clearing
    // errors will also remove internal errors.
    this.dateBlur.emit(event);

    if (this.enableAnalytics) {
      const detail = {
        componentName: 'va-memorable-date',
        action: 'blur',
        details: {
          label: this.label,
          year: yearNum,
          month: monthNum,
          day: dayNum,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  };

  private handleMonthChange = event => {
    const target = event.target as HTMLInputElement;
    this.currentMonth = target.value;
    this.handleDateChange(event);
  };

  private handleDayChange = event => {
    const target = event.target as HTMLInputElement;
    this.currentDay = target.value;
    this.handleDateChange(event);
  };

  private handleYearChange = event => {
    const target = event.target as HTMLInputElement;
    this.currentYear = target.value;
    this.handleDateChange(event);
  };

  private handleDateChange = (event: InputEvent) => {
    const { currentYear, currentMonth, currentDay } = this;
    /* eslint-disable i18next/no-literal-string */
    this.value =
      currentYear || currentMonth || currentDay
        ? [currentYear || '', currentMonth || '', currentDay || ''].join('-')
        : '';
    /* eslint-enable i18next/no-literal-string */

    // This event should always fire to allow for validation handling
    this.dateChange.emit(event);
  };

  private handleMonthBlur = () => {
    this.monthTouched = true;
  };

  private handleDayBlur = () => {
    this.dayTouched = true;
  };

  private handleYearBlur = () => {
    this.yearTouched = true;
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

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

  componentWillLoad() {
    // Set initial values
    const [year, month, day] = (this.value || '').split('-');
    this.currentYear = year;
    this.currentMonth = month;
    this.currentDay = day;

    // Check validity of hint slot and populate slotHintValues - if there are hints
    // with "monthHint", "dayHint", and "yearHint" are all present
    const hintSlot = this.el.querySelector('[slot="slotted-hint"]');
    const slotChildrenArr = Array.from(hintSlot.children);
    if (hintSlot && slotChildrenArr?.length) {
      // Add aria-hidden to slot outer to prevent it from being read in its entirety
      // in addition to individual hints.
      hintSlot.setAttribute('aria-hidden', 'true');
      // Populate slotHintValues object
      for (let i = 0; i < slotChildrenArr.length; i++) {
        const child = slotChildrenArr[i] as HTMLElement;
        this.slotHintValues[child.id] = child.innerText;
      }

      // Check that every value in this.slotHintValues is not null
      this.hasValidHintSlot = Object.values(this.slotHintValues).every(value => value !== null);
    }
  }

  render() {
    const {
      required,
      label,
      name,
      hint,
      error,
      handleDateBlur,
      monthSelect,
      useFormsPattern,
      formHeadingLevel,
      formHeading,
    } = this;

    const { currentYear, currentMonth, currentDay } = this;
    // eslint-disable-next-line i18next/no-literal-string
    const describedbyIds = ['dateHint', hint ? 'hint' : '']
      .filter(Boolean)
      .join(' ');

    const hintText = monthSelect
      ? i18next.t('date-hint-with-select')
      : i18next.t('date-hint');

    const errorParameters = (error: string) => {
      const yearNum = parseInt(currentYear, 10);
      const monthNum = parseInt(currentMonth, 10);
      return getErrorParameters(error, yearNum, monthNum);
    };

    // get a custom error method if existent when internal validation fails
    // otherwise take standard error message
    const getErrorMessage = (error: string) => {
      let errorMessage: string = '';

      if (this.invalidDay) {
        errorMessage = this.customDayErrorMessage;
      } else if (this.invalidMonth) {
        errorMessage = this.customMonthErrorMessage;
      } else if (this.invalidYear) {
        errorMessage = this.customYearErrorMessage;
      }

      return errorMessage ? errorMessage : getStandardErrorMessage(error);
    };

    // get the default message if internal validation fails
    const getStandardErrorMessage = (error: string) => {
      return i18next.t(error, errorParameters(error));
    };

    // Construct forms heading for when the form pattern is being used.
    let formsHeading = null;
    if (useFormsPattern === 'single' || useFormsPattern === 'multiple') {
      const HeaderLevel = getHeaderLevel(formHeadingLevel);
      formsHeading = (
        <Fragment>
          {formHeading && (
            <HeaderLevel id="form-question" part="form-header">
              {formHeading}
            </HeaderLevel>
          )}
          <div id="form-description">
            <slot name="form-description"></slot>
          </div>
        </Fragment>
      );
    }

    // Construct aria-labelledby attribute values to be passed to <va-text-input>
    // and <va-select>. The value is conditional based upon the forms pattern and
    // the presence of formHeading and label.
    const ariaLabeledByIds =
      `${useFormsPattern && formHeading ? 'form-question' : ''} ${
        useFormsPattern ? 'form-description' : ''
      } ${useFormsPattern && label ? 'input-label' : ''}`.trim() || null;

    // Construct month input - either <va-select> or <va-text-input> based on value
    // of monthSelect prop
    const monthDisplay = monthSelect ? (
      <div class="usa-form-group usa-form-group--month usa-form-group--select">
        <va-select
          label={i18next.t('month')}
          name={name ? `${name}Month` : 'Month'}
          aria-describedby={!this.hasValidHintSlot && describedbyIds}
          aria-labelledby={ariaLabeledByIds}
          invalid={this.invalidMonth}
          onVaSelect={this.handleMonthChange}
          onBlur={this.handleMonthBlur}
          class="usa-form-group--month-select"
          reflectInputError={error === 'month-range' ? true : false}
          value={
            currentMonth ? String(parseInt(currentMonth, 10)) : currentMonth
          }
          error={this.invalidMonth ? getStandardErrorMessage(error) : null}
          showError={false}
          message-aria-describedby={this.hasValidHintSlot && this.slotHintValues.monthHint}
        >
          {months &&
            months.map(monthOption => (
              <option
                value={monthOption.value}
                selected={monthOption.value === parseInt(currentMonth, 10)}
              >
                {monthOption.label}
              </option>
            ))}
        </va-select>
      </div>
    ) : (
      <div class="usa-form-group usa-form-group--month">
        <va-text-input
          label={i18next.t('month')}
          name={name ? `${name}Month` : 'Month'}
          maxlength={2}
          pattern="[0-9]*"
          aria-describedby={!this.hasValidHintSlot && describedbyIds}
          aria-labelledby={ariaLabeledByIds}
          invalid={this.invalidMonth}
          // Value must be a string
          // if NaN provide empty string
          value={currentMonth?.toString()}
          onInput={this.handleMonthChange}
          onBlur={this.handleMonthBlur}
          class="usa-form-group--month-input memorable-date-input"
          reflectInputError={error === 'month-range' ? true : false}
          inputmode="numeric"
          type="text"
          error={this.invalidMonth ? getStandardErrorMessage(error) : null}
          show-input-error="false"
          message-aria-describedby={this.hasValidHintSlot && this.slotHintValues.monthHint}
        />
      </div>
    );
    const legendClass = classnames({
      'usa-legend': true,
      'usa-label--error': error,
    });

    return (
      <Host onBlur={handleDateBlur}>
        {formsHeading}
        <div class="input-wrap">
          {/* Note: fieldset has an implicit aria role of group */}
          <fieldset class="usa-form usa-fieldset">
            <legend class={legendClass} id="input-label" part="legend">
              {label}

              {required && (
                <span class="usa-label--required">
                  {' '}
                  {i18next.t('required')}
                </span>
              )}

              {/* Additional hint to be rendered if passed as prop */}
              {hint && (
                <div class="usa-hint" id="hint">
                  {hint}
                </div>
              )}

              {/* Render either default hint or slotted hint if a valid one is passed */}
              {!this.hasValidHintSlot ? (
                <span class="usa-hint" id="dateHint">
                  {hintText}
                </span>
              ) : (
                <slot name="slotted-hint" />
              )}
            </legend>

            <span id="error-message" role="alert">
              {error && (
                <Fragment>
                  <span class="usa-sr-only">{i18next.t('error')}</span>
                  <span class="usa-error-message">
                    {getErrorMessage(error)}
                  </span>
                </Fragment>
              )}
            </span>
            <slot />

            <div class="usa-memorable-date">
              {monthDisplay}
              <div class="usa-form-group usa-form-group--day">
                <va-text-input
                  label={i18next.t('day')}
                  name={name ? `${name}Day` : 'Day'}
                  maxlength={2}
                  pattern="[0-9]*"
                  aria-describedby={!this.hasValidHintSlot && describedbyIds}
                  invalid={this.invalidDay}
                  // Value must be a string
                  // if NaN provide empty string
                  value={currentDay?.toString()}
                  onInput={this.handleDayChange}
                  onBlur={this.handleDayBlur}
                  class="usa-form-group--day-input memorable-date-input"
                  reflectInputError={error === 'day-range' ? true : false}
                  inputmode="numeric"
                  type="text"
                  error={
                    this.invalidDay ? getStandardErrorMessage(error) : null
                  }
                  show-input-error="false"
                  message-aria-describedby={this.hasValidHintSlot && this.slotHintValues.dayHint}
                />
              </div>
              <div class="usa-form-group usa-form-group--year">
                <va-text-input
                  label={i18next.t('year')}
                  name={name ? `${name}Year` : 'Year'}
                  maxlength={4}
                  pattern="[0-9]*"
                  aria-describedby={!this.hasValidHintSlot && describedbyIds}
                  invalid={this.invalidYear}
                  // Value must be a string
                  // if NaN provide empty string
                  value={currentYear?.toString()}
                  onInput={this.handleYearChange}
                  onBlur={this.handleYearBlur}
                  class="usa-form-group--year-input memorable-date-input"
                  reflectInputError={error === 'year-range' ? true : false}
                  inputmode="numeric"
                  type="text"
                  error={
                    this.invalidYear ? getStandardErrorMessage(error) : null
                  }
                  show-input-error="false"
                  message-aria-describedby={this.hasValidHintSlot && this.slotHintValues.yearHint}
                />
              </div>
            </div>
          </fieldset>
        </div>
      </Host>
    );
  }
}
