import {
  Component,
  Element,
  Host,
  Prop,
  h,
  State,
  EventEmitter,
  Event,
  Watch
} from '@stencil/core';

import {
  AsYouType,
  CountryCode,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumber,
  PhoneNumber,
  Metadata,
  isPossiblePhoneNumber
} from 'libphonenumber-js/min';
import classNames from 'classnames';
import { i18next } from '../..';
import { DATA_MAP, mapCountry } from './utils';

/**
 * @componentName Telephone Input
 * @maturityCategory caution
 * @maturityLevel candidate
 * @guidanceHref form/telephone-input
 * @translations English
 */

@Component({
  tag: 'va-telephone-input',
  styleUrl: 'va-telephone-input.scss',
  shadow: true,
})
export class VaTelephoneInput {
  @Element() el: HTMLElement;
  textInputRef: HTMLVaTextInputElement;
  DEFAULT_COUNTRY: CountryCode = 'US';
  COUNTRY_ERROR = 'Please choose a country';
  CONTACT_ERROR = 'phone number in a valid format, for example,';

  /**
   * The telephone contact information
   */
  @Prop({ reflect: true, mutable: true }) contact?: string = '';

  /**
   * The 2 letter ISO country code for a country
   */
  @Prop({ reflect: true, mutable: true }) country?: CountryCode = this.DEFAULT_COUNTRY;

  /**
   * Label text for the component
   */
  @Prop() label?: string = 'Home phone number';

  /**
   * Hint string text
   */
  @Prop() hint?: string;

  /**
   * The error for the component
   */
  @Prop({ reflect: true }) error?: string = '';

  /**
   * Whether the country select should be included. Set to true to exclude it.
   */
  @Prop() noCountry?: boolean = false;

  /**
   * Render marker indicating field is required.
   */
  @Prop() required?: boolean = false;

  /**
   * If true, this prop instructs the component to display error messages in response to the internal error state.
   * If false, error messages must be passed in from consumer.
   */
  @Prop() showInternalErrors?: boolean = true;

  /**
   * The event emitted when the contact changes
   */
  @Event() vaContact: EventEmitter;

  /**
   * The contact formatted according to the selected country
   */
  @State() formattedContact: string = '';

  /**
   * List of sorted countries used in the country combo-box
   */
  @State() countries: string[] = null;

  /**
   * Error for the country combo-box
   */
  @State() countryError: string = '';

  /**
   * Error for the contact input
   */
  @State() contactError: string = '';

  /**
   * Is the phone number valid for the selected country
   */
  @State() isValid: boolean = false;

  /**
   * Flag that signifies the user has interacted with the component and therefore can enter an error state
   */
  @State() touched: boolean = false;

  /**
   * Visible error message for the component
   * This is used to display the error in the UI
   */
  @State() visibleError: string;


  @Watch('error')
  syncErrorMessages(newValue: string) {
    if (newValue?.includes(this.CONTACT_ERROR)) {
      this.contactError = this.error;
    } else if (newValue === this.COUNTRY_ERROR) {
      this.countryError = newValue;
    } else {
      this.resetErrors();
    }
  }

  /**
   * Resets all error states for the country and contact fields, and sets visibleError to the current error prop.
   */
  resetErrors() {
    this.countryError = '';
    this.contactError = '';
    this.visibleError = this.error;
  }

  /**
   * Sets the validity state of the phone number for the selected country.
   * Updates isValid and formattedContact based on the current contact and country values.
   */
  setValidityState() {
    if (this.country && this.contact) {
      this.isValid = isPossiblePhoneNumber(this.contact, mapCountry(this.country));
      // country may have changed so reformat the number
      this.formattedContact = this.formatContact(this.contact);
    } else {
      this.isValid = false;
    }
  }

  /**
   * Handles input events for the contact field.
   * Updates the contact and formattedContact state, triggers validation, and emits the updated contact event.
   *
   * @param event - InputEvent from the contact input field
   */
  updateContact(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    this.contact = value;
    this.formattedContact = this.formatContact(value);
    this.validateContact();
    this.handleEmit();
  }

  /**
   * Returns a string describing the valid phone number lengths for a country.
   * If all numbers are consecutive, returns a range (e.g. "8 to 10").
   * If not, returns a comma-separated list with 'or' before the last number (e.g. "6, 8 or 9").
   *
   * @param lengths - Array of valid phone number lengths for a country
   * @returns A formatted string representing the valid lengths or ranges
   */
  getPhoneNumberLengthString(lengths: number[]): string {
    if (!lengths.length) return '';
    const sorted = lengths.slice().sort((a, b) => a - b);
    // Check if all numbers are consecutive
    let isConsecutive = true;
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] !== sorted[i - 1] + 1) {
        isConsecutive = false;
        break;
      }
    }
    if (isConsecutive && sorted.length > 1) {
      return `${sorted[0]} to ${sorted[sorted.length - 1]}`;
    }
    if (sorted.length === 1) return String(sorted[0]);
    if (sorted.length === 2 && sorted[1] === sorted[0] + 1) return `${sorted[0]} to ${sorted[1]}`;
    if (sorted.length === 2) return `${sorted[0]} or ${sorted[1]}`;
    return `${sorted.slice(0, -1).join(', ')} or ${sorted[sorted.length - 1]}`;
  }

  /**
   * Gets a formatted string representing the valid phone number lengths for the selected country.
   * Uses getPhoneNumberLengthString to format the result as a range or list.
   *
   * @returns A formatted string of valid phone number lengths for the selected country
   */
  getValidPhoneNumberLengths() {
    const _country = mapCountry(this.country);
    const metadata = new Metadata();
    metadata.selectNumberingPlan(_country);
    const possibleLengths = metadata.numberingPlan.possibleLengths();
    return this.getPhoneNumberLengthString(possibleLengths);
  }

  /**
   * Returns an error message for the selected country, including the valid phone number digit length(s).
   * Uses getValidPhoneNumberLengths to format the digit length(s) as a range or list.
   *
   * @returns A formatted error message string for the selected country
   */
  getErrorMessageForCountry() {
    const _country = mapCountry(this.country);
    const countryName = this.getCountryName(_country);
    return `Enter a valid ${countryName} phone number. Use ${this.getValidPhoneNumberLengths()} digits.`;
  }

  /**
   * Validates the contact and country fields, sets error messages, and updates validity state.
   * If the country is selected, checks the phone number validity and sets error messages as needed.
   * If the country is not selected, triggers country validation and error state.
   */
  validateContact() {
    if (this.country) {
      this.resetErrors();
      this.setValidityState();
      if (!this.isValid && this.touched && this.showInternalErrors) {
        this.visibleError = this.getErrorMessageForCountry();
        this.contactError = this.visibleError;
      }
    } else {
      this.validateCountry();
    }
  }


  /**
   * Emits the vaContact event with the current phone number, country, validity, and error state.
   * Attempts to parse the phone number and includes calling code and national number if valid.
   *
   * @emits vaContact - Event containing callingCode, countryCode, contact, isValid, error, and touched
   */
  handleEmit() {
    const tryParse = !!this.contact && !!this.country;
    let phoneNumber: PhoneNumber | null;
    try {
      phoneNumber = tryParse
        ? parsePhoneNumber(this.contact, mapCountry(this.country))
        : null;
    } catch {
      // there was a parse error of some kind due to invalid input, i.e. input like "abc"
      // not screening contact via regex because it is difficult to handle all possibilities for all countries
      phoneNumber = null;
    }
    let error = null;
    if (!this.isValid) {
      if (this.country) {
        error = this.getErrorMessageForCountry();
      } else {
        error = this.COUNTRY_ERROR;
      }
    }

    this.vaContact.emit({
      callingCode: (tryParse && phoneNumber !== null) ? phoneNumber.countryCallingCode : undefined,
      countryCode: this.country,
      contact: (tryParse && phoneNumber !== null) ? phoneNumber.nationalNumber : this.contact,
      isValid: this.isValid,
      error,
      touched: this.touched,
    });
  }

  /**
   * Validates that a country has been selected.
   * Sets error messages and validity state if no country is selected.
   * Updates touched state to indicate user interaction.
   */
  validateCountry() {
    this.resetErrors();
    if (!this.touched) this.touched = true;
    if (this.country) return;
    this.isValid = false;
    if (this.showInternalErrors) {
      this.visibleError = this.COUNTRY_ERROR;
      this.countryError = this.visibleError;
    }
  }

  /**
   * Handles the event when the country is changed in the combo box.
   * Updates the country property, triggers validation, and emits the updated contact event.
   *
   * @param event - CustomEvent containing the new country value
   */
  countryChange(event: CustomEvent<{ value: CountryCode }>) {
    const { value } = event.detail;
    this.country = value;
    this.validateContact();
    this.handleEmit();
  }

  /**
   * Formats the input phone number value according to the selected country.
   * Uses AsYouType from libphonenumber-js for formatting. If no numbers are present, returns the input value.
   *
   * @param value - The phone number string to format
   * @returns The formatted phone number string, or the original value if formatting is not possible
   */
  formatContact(value: string) {
    // some territories are formatted / validated as if they were a different, larger country
    const _country = mapCountry(this.country);
    const _formatted = new AsYouType(_country).input(value);
    // if input has no numbers return it for sake of error correction
    return _formatted === '' ? value : _formatted;
  }

  /**
   * Builds and returns a list of country codes alphabetized by name, with US at the front.
   * Also adds territories not present in the default country list.
   *
   * @returns An array of country codes, with US first and the rest sorted alphabetically
   */
  buildCountryList() {
    const allButUS = getCountries()
      .filter(country => country !== this.DEFAULT_COUNTRY);
    allButUS.push(...Object.keys(DATA_MAP.countries) as CountryCode[]);

    const sortedAllButUs = allButUS.sort((a, b) => {
      const one = this.getCountryName(a);
      const two = this.getCountryName(b);
      return one.localeCompare(two);
    });
    // put US in front
    return [this.DEFAULT_COUNTRY, ...sortedAllButUs];
  }

  /**
   * Returns the display name for a given country code.
   * Handles special cases using DATA_MAP.names, otherwise uses Intl.DisplayNames.
   *
   * @param countryCode - The ISO country code to get the display name for
   * @returns The display name for the country
   */
  getCountryName(countryCode: string) {
    // some country names must be handled explicitly
    if (countryCode in DATA_MAP.names) {
      return DATA_MAP.names[countryCode];
    }

    const nameUtil = new Intl.DisplayNames(['en'], { type: 'region' });
    const name = nameUtil.of(countryCode.toUpperCase());
    // make name conform to iso standards
    return name.replace(/&/g, 'and').replace(/St\./, 'Saint');
  }

  componentWillLoad() {
    this.countries = this.buildCountryList();
    if (this.country === '' as CountryCode) this.country = this.DEFAULT_COUNTRY;
    this.visibleError = this.error;
  }

  componentDidLoad() {
    // if a contact was provided, check if it's valid for the country
    if (this.contact) {
      this.formattedContact = this.formatContact(this.contact);
      this.validateContact();
    }
    const comboBox = this.el.shadowRoot.querySelector('va-combo-box');
    if (comboBox) {
      // add listener manually (instead of via @Listen) to prevent this event from appearing in storybook
      comboBox.addEventListener('vaSelect', this.countryChange.bind(this));
    }
    this.handleEmit();
  }

  disconnectedCallback() {
    const comboBox = this.el.shadowRoot.querySelector('va-combo-box');
    if (comboBox) {
      comboBox.removeEventListener('vaSelect', this.countryChange.bind(this));
    }
  }

  // get the text for an option which includes name of country + calling prefix
  getOptionText(country: CountryCode) {
    const _country = mapCountry(country);
    return country
      ? `${this.getCountryName(country)} +${getCountryCallingCode(_country)}`
      : '';
  }

  handleBlur() {
    if (this.formattedContact) {
      if (!this.touched) this.touched = true;

      this.validateContact();
      this.handleEmit();
    }
  }

  render() {
    const {
      label,
      hint,
      countries,
      formattedContact,
      country,
      countryError,
      contactError,
      visibleError,
      noCountry,
      required
    } = this;

    const hostClasses = classNames({
      'va-form-group--error': !!visibleError,
    })

    const legendClasses = classNames({
      'usa-legend': true,
      'usa-label--error': !!visibleError
    });

    return (
      <Host class={hostClasses}>
        <div class="input-wrap">
          <fieldset class="usa-form usa-fieldset">
            <legend class={legendClasses}>
              {label}
              {required && (
                <span class="usa-label--required">
                  {' '}
                  {i18next.t('required')}
                </span>
              )}
              {hint && <div class="usa-hint">{hint}</div>}
            </legend>
            <span id="error-message" role="alert">
              {visibleError && visibleError}
            </span>
            <div class="va-input-telephone-wrapper" tabIndex={0}>
              { !noCountry &&
              <va-combo-box
                label="Country code"
                name="country-codes"
                show-input-error="false"
                error={countryError}
                value={country}
              >
                {countries.map((country: CountryCode) => (
                  <option value={country} key={country}>
                    {this.getOptionText(country)}
                  </option>
                ))}
              </va-combo-box> }
              <va-text-input
                label="Phone number"
                type="tel"
                autocomplete="tel"
                inputmode="tel"
                value={formattedContact}
                show-input-error="false"
                required={required}
                showRequiredText={false}
                error={contactError}
                onInput={(e) => this.updateContact(e)}
                onBlur={() => this.handleBlur()}
              />
            </div>
          </fieldset>
        </div>
      </Host>
    );
  }
}
