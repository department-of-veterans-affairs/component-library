import {
  Component,
  Event,
  EventEmitter,
  Fragment,
  Prop,
  h,
} from '@stencil/core';

@Component({
  tag: 'va-telephone',
  styleUrl: 'va-telephone.css',
  shadow: true,
})
export class VaTelephone {
  /**
   * 3 or 10 digit string representing the contact number
   */
  @Prop() contact!: string;

  /**
   * Optional phone number extension
   */
  @Prop() extension: number;

  /**
   * Indicates if the phone number can be clicked or not
   */
  @Prop() notClickable: boolean = false;

  /**
   * Indicates if this is a number meant to be called from outside the US.
   * Prepends a "+1" to the formatted number.
   */
  @Prop() international: boolean = false;

  /**
   * Optional vanity phone number.
   * Replaces the last 4 digits with the vanity text input
   */
  @Prop() vanity: string;

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

  /**
   * Format telephone number for display.
   * `international` and `extension` args only work on 10 digit contacts
   */
  static formatPhoneNumber(
    num: string,
    extension: number,
    international: boolean = false,
    vanity: string,
  ): string {
    let formattedNum = num;
    if (num.length === 10) {
      const regex = /(?<area>\d{3})(?<local>\d{3})(?<last4>\d{4})/g;
      const { area, local, last4 } = regex.exec(num).groups;
      formattedNum = `${area}-${local}-${last4}`;
      if (international) formattedNum = `+1-${formattedNum}`;
      if (extension) formattedNum = `${formattedNum}, ext. ${extension}`;
      if (vanity) {
        formattedNum = `${area}-${local}-${vanity} (${last4})`;
      }
    }
    return formattedNum;
  }

  /**
   * Format telephone number for screen readers
   * @param {string} number - Expected a formatted phone number with or without extension
   * @param {string} vanity - Using vanity prop set on the component to remove extra text added
   * via formatPhoneNumber to create the vanity number
   * @return {string} - Combined phone number parts within the label separated by
   * periods, e.g. "800-555-1212" becomes "8 0 0. 5 5 5. 1 2 1 2"
   */
  static formatTelLabel(number: string, vanity: string): string {
    const numberType = vanity
      ? number.split(/[^\d]+/)
      : number.split(/[^\d\w]+/);
    return numberType
      .filter(n => n)
      .map(chunk => (chunk === 'ext' ? 'extension' : chunk.split('').join(' ')))
      .join('. ');
  }

  static createHref(contact: string, extension: number): string {
    const isN11 = contact.length === 3;
    // extension format ";ext=" from RFC3966 https://tools.ietf.org/html/rfc3966#page-5
    // but it seems that using a comma to pause for 2 seconds might be a better
    // solution - see https://dsva.slack.com/archives/C8E985R32/p1589814301103200
    const href = `tel:${isN11 ? contact : `+1${contact}`}`;
    return `${href}${extension ? `,${extension}` : ''}`;
  }

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
    const { contact, extension, notClickable, international, vanity } = this;
    const formattedNumber = VaTelephone.formatPhoneNumber(
      contact,
      extension,
      international,
      vanity,
    );
    const formattedAriaLabel = `${VaTelephone.formatTelLabel(
      formattedNumber,
      vanity,
    )}.`;

    return notClickable ? (
      <Fragment>
        <span aria-hidden="true">{formattedNumber}</span>
        <span class="sr-only">{formattedAriaLabel}</span>
      </Fragment>
    ) : (
      <a
        href={VaTelephone.createHref(contact, extension)}
        aria-label={formattedAriaLabel}
        onClick={this.handleClick.bind(this)}
      >
        {formattedNumber}
      </a>
    );
  }
}
