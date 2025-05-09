import {
  Component,
  Element,
  Host,
  Prop,
  h,
  Listen,
  State
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

  /**
   * The telephone contact information
   */
  @Prop() contact?: string;

  /**
   * The country code
   */
  @Prop({ reflect: true, mutable: true }) country?: CountryCode = 'US';

  @Prop() header?: string = 'Primary phone number';

  @Prop() hint?: string;

  @Prop({ reflect: true, mutable: true }) error?: string = '';

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

  getErrorMessageForCountry() {
    let example = getExampleNumber(this.country, examples).format('NATIONAL');
    const asYouType = new AsYouType(this.country);
    asYouType.input(example);
    const msg = asYouType.getTemplate();
    return `Enter a ${this.getCountryName(this.country)} phone number in a valid format, for example, ${msg}`;
  }

  validateContact() {
    this.resetErrors();
    if (this.country) {
      if (this.formattedContact) {
        const isValid = isValidPhoneNumber(this.formattedContact, this.country);
        this.error = isValid ? '' : this.getErrorMessageForCountry()
      } else {
        this.error = 'Please enter a phone number';
      }
      this.contactError = this.error;
    } else {
      this.validateCountry();
    }
  }

  validateCountry() {
    this.resetErrors();
    if (!this.country) {
      this.error = 'Please choose a country';
      this.countryError = this.error;
    } else {
      this.validateContact();
    }
  }

  @Listen('vaSelect')
  countryChange(event: CustomEvent<{ value: CountryCode }>) {
    const { value } = event.detail;
    this.country = value;
    console.log('va select....', event);
    this.validateCountry();
  }

  formatContact(value: string) {
    return new AsYouType(this.country).input(value);
  }

  buildCountryList() {
    const allButUS = getCountries().filter(country => country !== 'US');
    // put US in front
    return ['US', ...allButUS];
  }

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

  getOptionText(country: string) {
    let optionText = '';
    if (country) {
      optionText = `${this.getCountryName(country)} +${getCountryCallingCode(country as CountryCode)}`;
    }
    return optionText;
  }

  render() {
    const { header, hint, countries, error, country, formattedContact, countryError, contactError } = this;
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
              <va-combo-box
                label="Country code"
                name="country-codes"
                // value={this.getOptionText(country)}
                show-input-error="false"
                error={countryError}
              >
                {countries.map(country => (
                  <option value={country} key={country}>
                    {this.getOptionText(country)}
                  </option>
                ))}
              </va-combo-box>
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
