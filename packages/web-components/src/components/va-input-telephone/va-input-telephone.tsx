import {
  Component,
  Element,
  Host,
  Prop,
  h,
  State,
  EventEmitter,
  Event
} from '@stencil/core';

import {
  AsYouType,
  isPossiblePhoneNumber,
  CountryCode,
  getExampleNumber,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumber,
  PhoneNumber
} from 'libphonenumber-js/min';
import examples from 'libphonenumber-js/examples.mobile.json';
import classNames from 'classnames';
import { i18next } from '../..';
import { DATA_MAP, mapCountry } from './utils';

/**
 * @componentName Input Telephone
 * @maturityCategory caution
 * @maturityLevel proposal
 * @guidanceHref form/input-telephone
 * @translations English
 */

@Component({
  tag: 'va-input-telephone',
  styleUrl: 'va-input-telephone.scss',
  shadow: true,
})
export class VaInputTelephone {
  @Element() el: HTMLElement;
  textInputRef: HTMLVaTextInputElement;
  DEFAULT_COUNTRY: CountryCode = 'US';

  /**
   * The telephone contact information
   */
  @Prop({ reflect: true, mutable: true }) contact?: string = '';

  /**
   * The 2 letter ISO country code for a country
   */
  @Prop({ reflect: true, mutable: true }) country?: CountryCode = this.DEFAULT_COUNTRY;

  /**
   * Header text for the component
   */
  @Prop() header?: string = 'Primary phone number';

  /**
   * Hint string text
   */
  @Prop() hint?: string;

  /**
   * The error for the component
   */
  @Prop({ reflect: true, mutable: true }) error?: string = '';

  /**
   * Whether the country select should be included. Set to true to exclude it.
   */
  @Prop() noCountry?: boolean = false;

  /**
   * Render marker indicating field is required.
   */
  @Prop() required?: boolean = false;

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

  resetErrors() {
    this.countryError = '';
    this.contactError = '';
    this.error = '';
  }

  updateContact(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    this.contact = value;
    this.formattedContact = this.formatContact(value);
  }

  // get an error message for a country that includes the template of a valid phone number for that country
  getErrorMessageForCountry() {
    const _country = mapCountry(this.country);
    let example = getExampleNumber(_country, examples).format('NATIONAL');
    const asYouType = new AsYouType(_country);
    asYouType.input(example);
    const msg = asYouType.getTemplate();
    return `Enter a ${this.getCountryName(_country)} phone number in a valid format, for example, [${msg}]`;
  }

  // validate the contact and emit the contact and validation state
  validateContact() {
    this.resetErrors();
    if (this.country) {
      const _country = mapCountry(this.country);
      this.isValid = !!this.contact
        ? isPossiblePhoneNumber(this.contact, _country)
        : false;
      this.error = this.isValid
        ? ''
        : this.getErrorMessageForCountry();
      this.contactError = this.error;
    } else {
      this.validateCountry();
    }
    this.handelEmit();
  }

  handelEmit() {
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
    this.vaContact.emit({
      callingCode: (tryParse && phoneNumber !== null) ? phoneNumber.countryCallingCode : undefined,
      countryCode: this.country,
      contact: (tryParse && phoneNumber !== null) ? phoneNumber.nationalNumber : this.contact,
      isValid: this.isValid
    });
  }

  // make sure country has been selected
  validateCountry() {
    this.resetErrors();
    if (!this.country) {
      this.error = 'Please choose a country';
      this.countryError = this.error;
      this.handelEmit();
    } else {
      this.validateContact();
    }
  }

  // when country is selected, do validation
  countryChange(event: CustomEvent<{ value: CountryCode }>) {
    const { value } = event.detail;
    this.country = value;
    this.validateCountry();
  }

  formatContact(value: string) {
    // some territories are formatted / validated as if they were a different, larger country
    const _country = mapCountry(this.country);
    const _formatted = new AsYouType(_country).input(value);
    // if input has no numbers return it for sake of error correction
    return _formatted === '' ? value : _formatted
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

  render() {
    const {
      header,
      hint,
      countries,
      error,
      formattedContact,
      country,
      countryError,
      contactError,
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
              {header}
              {required && (
                <span class="usa-label--required">
                  {' '}
                  {i18next.t('required')}
                </span>
              )}
              {hint && <div class="usa-hint">{hint}</div>}
            </legend>
            {error && <span id="error-message" role="alert">{error}</span>}
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
                onBlur={() => this.validateContact()}
              />
            </div>
          </fieldset>
        </div>
      </Host>
    );
  }
}
