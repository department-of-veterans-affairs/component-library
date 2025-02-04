import {
  Component,
  Event,
  EventEmitter,
  Fragment,
  Prop,
  h,
  Host,
} from '@stencil/core';

/**
 * @componentName Telephone
 * @maturityCategory use
 * @maturityLevel best_practice
 */

@Component({
  tag: 'va-telephone',
  styleUrl: 'va-telephone.css',
  shadow: true,
})
export class VaTelephone {
  /**
   * Numeric string representing the contact number. Typical length is 3 or 10 digits - SMS short codes will be 5 or 6 digits.
   */
  @Prop() contact!: string;

  /**
   * Optional numeric string phone number extension
   */
  @Prop() extension?: string;

  /**
   * Indicates if the phone number can be clicked or not
   */
  @Prop() notClickable?: boolean = false;

  /**
   * Indicates if this is a number meant to be called from outside the US.
   * Prepends a "+1" to the formatted number.
   */
  @Prop() international?: boolean = false;

  /**
   * Prepends the country code to the given contact number. Do NOT include the '+'
   */
  @Prop() countryCode?: string;

  /**
   * Indicates if this is a number meant to be called
   * from a teletypewriter for deaf users.
   */
  @Prop() tty?: boolean = false;

  /**
   * Indicates if this is a number meant to be used
   * to text.
   */
  @Prop() sms?: boolean = false;

  /**
   * Optional vanity phone number.
   * Replaces the last 4 digits with the vanity text input
   */
  @Prop() vanity?: string;

  /**
   * An optional message that will be read by screen readers when the phone number is focused.
   */
  @Prop() messageAriaDescribedby?: string;

  /**
   * The event used to track usage of the component. This is emitted when
   * clicking on an anchor link.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  static cleanContact(contact: string): string {
    return (contact || '').replace(/[^\d]/g, '');
  }

  static splitContact(contact: string): string[] {
    const cleanedContact = VaTelephone.cleanContact(contact);
    if (cleanedContact.length === 10) {
      // const regex = /(?<area>\d{3})(?<local>\d{3})(?<last4>\d{4})/g;
      // const { area, local, last4 } = regex.exec(contact).groups;
      // *******
      // Many Veterans are still using older browsers that do not support regexp
      // named capture groups (e.g. Safari 11.0); see
      // vets-design-system-documentation #1834
      const regex = /^(\d{3})(\d{3})(\d{4})$/g;
      const result = [...regex.exec(cleanedContact)];
      return result.length === 4 ? result.slice(-3) : [cleanedContact];
    }
    return [cleanedContact];
  }

  /**
   * Format telephone number for display.
   * `international` and `extension` args only work on 10 digit contacts
   */
  /* eslint-disable i18next/no-literal-string */
  static formatPhoneNumber({
    contact: num,
    extension,
    international = false,
    countryCode,
    vanity,
    tty = false,
  }: {
    contact: string;
    extension?: string;
    international?: boolean;
    countryCode?: string;
    vanity?: string;
    tty?: boolean;
  }): string {
    const splitNumber = countryCode ? [num] : VaTelephone.splitContact(num);
    let formattedNum = splitNumber.join('');

    if (formattedNum.length === 10 && !countryCode) {
      const [area, local, last4] = splitNumber;
      formattedNum = `${area}-${local}-${last4}`;
      if (international) formattedNum = `+1-${formattedNum}`;
      if (extension) formattedNum = `${formattedNum}, ext. ${extension}`;
      if (vanity) {
        formattedNum = `${area}-${local}-${vanity} (${last4})`;
      }
    }

    if (countryCode) {
      formattedNum = `+${countryCode} ${formattedNum}`;
    }

    if (tty) {
      formattedNum = `TTY: ${formattedNum}`;
    }

    return formattedNum;
  }

  static createHref({
    contact,
    extension,
    sms,
    countryCode,
  }: {
    contact: string;
    extension?: string;
    sms?: boolean;
    countryCode?: string;
  }): string {
    const cleanedContact = VaTelephone.cleanContact(contact);
    const isN11 = cleanedContact.length === 3;
    // extension format ";ext=" from RFC3966 https://tools.ietf.org/html/rfc3966#page-5
    // but it seems that using a comma to pause for 2 seconds might be a better
    // solution - see https://dsva.slack.com/archives/C8E985R32/p1589814301103200
    let href = null;
    if (sms) {
      href = `sms:${cleanedContact}`;
    } else if (isN11) {
      href = `tel:${cleanedContact}`;
    } else if (countryCode) {
      href = `tel:+${countryCode}${cleanedContact}`;
    } else {
      // RFC3966 (https://www.rfc-editor.org/rfc/rfc3966#section-5.1.5) calls for the inclusion of country codes whenever possible, so we add the +1 unless we know there's a different country code (above)
      href = `tel:+1${cleanedContact}`;
    }
    return `${href}${extension ? `,${extension}` : ''}`;
  }
  /* eslint-enable i18next/no-literal-string */

  private handleClick(): void {
    this.componentLibraryAnalytics.emit({
      componentName: 'va-telephone',
      action: 'click',
      details: {
        contact: this.contact,
        extension: this.extension,
      },
    });
  }

  render() {
    const {
      contact,
      extension,
      notClickable,
      international,
      countryCode,
      tty,
      vanity,
      sms,
      messageAriaDescribedby,
    } = this;
    const formattedNumber = VaTelephone.formatPhoneNumber({
      contact: contact,
      extension,
      international,
      countryCode,
      vanity,
      tty,
    });
    const href = VaTelephone.createHref({
      contact,
      extension,
      sms,
      countryCode,
    });

    // Null so we don't add the attribute if we have an empty string
    const ariaDescribedbyIds = messageAriaDescribedby
      ? // eslint-disable-next-line i18next/no-literal-string
        'number-description'
      : null;

    return (
      <Host>
        {notClickable ? (
          <Fragment>
            <span aria-describedby={ariaDescribedbyIds}>{formattedNumber}</span>
          </Fragment>
        ) : (
          <a
            aria-describedby={ariaDescribedbyIds}
            href={href}
            onClick={this.handleClick.bind(this)}
          >
            {formattedNumber}
          </a>
        )}
        {messageAriaDescribedby && (
          <span id="number-description" class="sr-only">
            {messageAriaDescribedby}
          </span>
        )}
      </Host>
    );
  }
}
