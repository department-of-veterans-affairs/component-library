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
import { getArticle } from '../../utils/utils';

/**
 * @componentName Input Telephone
 * @maturityCategory caution
 * @maturityLevel candidate
 * @guidanceHref form/telephone-input
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

  /**
   * Flag that signifies the user has interacted with the component and therefore can enter an error state
   */
  @State() touched: boolean = false;


  @Watch('error')
  syncErrorMessages(newValue: string) {
    if (newValue?.includes(this.CONTACT_ERROR)) {
      this.contactError = this.error;
    } else if (newValue === this.COUNTRY_ERROR) {
      this.countryError = newValue;
    }
  }

  resetErrors() {
    this.countryError = '';
    this.contactError = '';
    this.error = '';
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

  // return the template for a phone number for the selected country
  getTemplate() {
    const _country = mapCountry(this.country);
    let example = getExampleNumber(_country, examples).format('NATIONAL');
    const asYouType = new AsYouType(_country);
    asYouType.input(example);
    return asYouType.getTemplate();
  }

  // get an error message for a country that includes the template of a valid phone number for that country
  getErrorMessageForCountry() {
    const _country = mapCountry(this.country);
    const countryName = this.getCountryName(_country);
    const article = getArticle(countryName, false);
    return `Enter ${article} ${countryName} phone number in a valid format, for example, ${this.getTemplate()}`;
  }

  // validate the contact and show errors if appropriate
  validateContact() {
    if (this.country) {
      this.resetErrors();
      this.setValidityState();
      if (!this.isValid && this.touched) {
        this.error = this.getErrorMessageForCountry();
        this.contactError = this.error;
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

    // get the length of a valid phone number for a country
    // useful for validation in forms system
    let contactLength = null;
    if (this.contact && this.country) {
      contactLength = this.getTemplate().replace(/[^x]/g, '').length;
    }

    this.vaContact.emit({
      callingCode: (tryParse && phoneNumber !== null) ? phoneNumber.countryCallingCode : undefined,
      countryCode: this.country,
      contact: (tryParse && phoneNumber !== null) ? phoneNumber.nationalNumber : this.contact,
      contactLength,
      isValid: this.isValid,
      error,
      touched: this.touched,
    });
  }

  // make sure country has been selected
  validateCountry() {
    this.resetErrors();
    if (!this.touched) this.touched = true;
    if (!this.country) {
      this.error = this.COUNTRY_ERROR;
      this.countryError = this.error;
      this.isValid = false;
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
                onBlur={() => this.handleBlur()}
              />
            </div>
          </fieldset>
        </div>
      </Host>
    );
  }
}
