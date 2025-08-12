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
  @State() visibleError: string = this.error;


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

  resetErrors() {
    this.countryError = '';
    this.contactError = '';
    this.visibleError = this.error;
  }

  setValidityState() {
    if (this.country && this.contact) {
      this.isValid = isPossiblePhoneNumber(this.contact, mapCountry(this.country));
      // country may have changed so reformat the number
      this.formattedContact = this.formatContact(this.contact);
    } else {
      this.isValid = false;
    }
  }

  updateContact(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    this.contact = value;
    this.formattedContact = this.formatContact(value);
    this.validateContact();
    this.handleEmit();
  }

  getNumberRange(lengths: number[]): string {
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

  // return the possible lengths of a phone number for the selected country
  getTemplate() {
    const _country = mapCountry(this.country);
    const metadata = new Metadata();
    metadata.selectNumberingPlan(_country);
    const possibleLengths = metadata.numberingPlan.possibleLengths();
    return this.getNumberRange(possibleLengths);
  }

  // get an error message for a country that includes the template of a valid phone number for that country
  getErrorMessageForCountry() {
    const _country = mapCountry(this.country);
    const countryName = this.getCountryName(_country);
    return `Enter a valid ${countryName} phone number. Use ${this.getTemplate()} digits.`;
  }

  // validate the contact and show errors if appropriate
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

  // make sure country has been selected
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

  // when country is selected, do validation
  countryChange(event: CustomEvent<{ value: CountryCode }>) {
    const { value } = event.detail;
    this.country = value;
    this.validateContact();
    this.handleEmit();
  }

  formatContact(value: string) {
    // some territories are formatted / validated as if they were a different, larger country
    const _country = mapCountry(this.country);
    const _formatted = new AsYouType(_country).input(value);
    // if input has no numbers return it for sake of error correction
    return _formatted === '' ? value : _formatted;
  }

  // get list of country codes alphabetized by name with US in front
  // add some territories not in library
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

  // return the name of a country using the country code
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
    if (!this.touched) this.touched = true;
    this.validateContact();
    this.handleEmit();
  }

  render() {
    const {
      label,
      hint,
      countries,
      error,
      formattedContact,
      country,
      countryError,
      contactError,
      visibleError,
      noCountry,
      required
    } = this;

    const legendClasses = classNames({
      'usa-legend': true,
      'usa-label--error': !!error
    });

    return (
      <Host>
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
            {visibleError && <span id="error-message" role="alert">{visibleError}</span>}
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
