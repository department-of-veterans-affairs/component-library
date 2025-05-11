import {
  Component,
  Element,
  Host,
  Prop,
  h,
  Listen,
  State,
  EventEmitter,
  Event
} from '@stencil/core';

import { AsYouType, isValidPhoneNumber, CountryCode, getExampleNumber, getCountries, getCountryCallingCode } from 'libphonenumber-js/min'; 
import examples from 'libphonenumber-js/examples.mobile.json';
import classNames from 'classnames';

/**
 * @componentName International Telephone
 * @maturityCategory caution
 * @maturityLevel proposal
 * @guidanceHref form/international-telephone
 * @translations English
 */

@Component({
  tag: 'va-input-telephone',
  styleUrl: 'va-input-telephone.scss',
  shadow: true,
})
export class VaInternationalTelephone {
  @Element() el: HTMLElement;
  textInputRef: HTMLVaTextInputElement;
  DEFAULT_COUNTRY: CountryCode = 'US';

  /**
   * The telephone contact information
   */
  @Prop() contact?: string;

  /**
   * The country code
   */
  @Prop({ reflect: true, mutable: true }) country?: CountryCode = this.DEFAULT_COUNTRY;

  @Prop() header?: string = 'Primary phone number';

  @Prop() hint?: string;

  @Prop({ reflect: true, mutable: true }) error?: string = '';

  /**
   * Whether the country select should be included. Set to true to exclude it.
   */
  @Prop() noCountry?: boolean = false;

  /**
   * The event emitted when the contact changes
   */
  @Event() vaContact: EventEmitter;

  /**
   * The event emitted when the country code changes
   */
  @Event() vaCountryCode: EventEmitter

  @State() formattedContact: string = '';
  @State() countries: string[] = null;
  @State() countryError: string = '';
  @State() contactError: string = '';

  resetErrors() {
    this.countryError = '';
    this.contactError = '';
    this.error = '';
  }

  updateContact(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    this.formattedContact = value ? this.formatContact(value) : '';
  }

  // get an error message for a country that includes the template of a valid phone number
  getErrorMessageForCountry() {
    let example = getExampleNumber(this.country, examples).format('NATIONAL');
    const asYouType = new AsYouType(this.country);
    asYouType.input(example);
    const msg = asYouType.getTemplate();
    return `Enter a ${this.getCountryName(this.country)} phone number in a valid format, for example, [${msg}]`;
  }

  // validate the contact and emit the contact and validation state
  validateContact() {
    this.resetErrors();
    let isValid = false;
    if (this.country) {
      if (this.formattedContact) {
        isValid = isValidPhoneNumber(this.formattedContact, this.country);
        this.error = isValid ? '' : this.getErrorMessageForCountry()
      } else {
        this.error = 'Please enter a phone number';
      }
      this.contactError = this.error;
    } else {
      this.validateCountry();
    }
    this.vaContact.emit({ contact: this.formattedContact, isValid });
  }

  // make sure country has been selected
  validateCountry() {
    this.resetErrors();
    if (!this.country) {
      this.error = 'Please choose a country';
      this.countryError = this.error;
    } else {
      this.validateContact();
    }
  }

  // when country is selected, do validation
  @Listen('vaSelect')
  countryChange(event: CustomEvent<{ value: CountryCode }>) {
    const { value } = event.detail;
    this.country = value;
    this.validateCountry();
    this.vaCountryCode.emit({ code: value });
  }

  formatContact(value: string) {
    return new AsYouType(this.country).input(value);
  }

  // get list of country codes alphabetized by name with US in front
  buildCountryList() {
    const allButUS = getCountries().filter(country => country !== this.DEFAULT_COUNTRY);
    const sortedAllButUs = allButUS.sort((a, b) => {
      const one = this.getCountryName(a);
      const two = this.getCountryName(b);
      return one.localeCompare(two);
    })
    // put US in front
    return [this.DEFAULT_COUNTRY, ...sortedAllButUs];
  }

  // return the name of a country using the country code
  getCountryName(countryCode: string) {
    const name = new Intl.DisplayNames(['en'], { type: 'region' });
    return name.of(countryCode.toUpperCase());
  }

  componentWillLoad() {
    if (this.contact) {
      this.formattedContact = this.formatContact(this.contact);
    }
    this.countries = this.buildCountryList();
  }

  // get the text for an option which includes name of country + calling prefix
  getOptionText(country: string) {
    let optionText = '';
    if (country) {
      optionText = `${this.getCountryName(country)} +${getCountryCallingCode(country as CountryCode)}`;
    }
    return optionText;
  }

  render() {
    const {
      header,
      hint,
      countries,
      error,
      formattedContact,
      countryError,
      contactError,
      noCountry
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
              {hint && <div class="usa-hint">{hint}</div>}
            </legend>
            {error && <span id="error-message" role="alert">{error}</span>}
            <div class="va-input-telephone-wrapper" tabIndex={0}>
              { !noCountry &&
              <va-combo-box
                label="Country"
                name="country-codes"
                show-input-error="false"
                error={countryError}
              >
                {countries.map(country => (
                  <option value={country} key={country}>
                    {this.getOptionText(country)}
                  </option>
                ))}
              </va-combo-box> }
              <va-text-input
                label="Phone number"
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
