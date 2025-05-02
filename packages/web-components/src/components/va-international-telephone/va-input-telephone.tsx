import {
  Component,
  Element,
  Host,
  Prop,
  h,
  Listen,
  State
} from '@stencil/core';

import { AsYouType, isValidPhoneNumber, CountryCode, getExampleNumber, getCountries } from 'libphonenumber-js/min'; 
import examples from 'libphonenumber-js/examples.mobile.json';
import classnames from 'classnames';

/**
 * @componentName International Telephone
 * @maturityCategory caution
 * @maturityLevel proposal
 * @guidanceHref form/international-telephone
 * @translations English
 */

@Component({
  tag: 'va-input-telephone',
  styleUrls: ['va-input-telephone.scss', 'flags.scss'],
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
  @Prop() country?: CountryCode = 'US';

  @State() formattedContact: string;
  @State() error: string = '';
  @State() countries: string[] = null;

  @Listen('input')
  hack() {
    const { value } = this.textInputRef;
    this.formattedContact = new AsYouType(this.country).input(value);
  }

  @Listen('blur')
  hacker() {
    if (!isValidPhoneNumber(this.formattedContact, this.country)) {
      const example = getExampleNumber(this.country, examples).format('NATIONAL');
      this.error = `Wrong format, dude! Try something like: ${example}`;
    } else {
      this.error = '';
    }
  }

  formatContact(value: string) {
    return new AsYouType(this.country).input(value);
  }

  buildCountryList() {
    const allButUS = getCountries().filter(country => country !== 'US');
    // put US in front
    return ['US', ...allButUS];
  }

  renderFlag(country: string) {
    return <span class={`flag flag-${country.toLowerCase()}`} aria-hidden="true"></span>;
  }

  componentWillLoad() {
    if (this.contact) {
      this.formattedContact = this.formatContact(this.contact);
    }
    this.countries = this.buildCountryList();
  }

  render() {
    return (
      <Host>
        {this.error && <span class="usa-error-message">{this.error}</span>}
        <div class="va-international-telephone-wrapper" tabIndex={0}>
          <va-combo-box label="Country code" name="test" data-use-html="true">
            {this.countries.map(country => (
              <option value={country} key={country}>
                {this.renderFlag(country)} +{new AsYouType(country as CountryCode).getCallingCode()} ({country})
              </option>
            ))}
          </va-combo-box>
          <va-text-input
            label="Phone number"
            ref={(el) => this.textInputRef = el}
            value={this.formattedContact}
          />
        </div>
      </Host>
    );
  }
}
