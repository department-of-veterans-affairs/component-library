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
  @Prop() clickable: boolean = true;

  /**
   * Indicates if this is a number meant to be called from outside the US.
   * Prepends a "+1" to the formatted number.
   */
  @Prop() international: boolean = false;

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
  ): string {
    let formattedNum = num;
    if (num.length === 10) {
      const regex = /(?<area>\d{3})(?<local>\d{3})(?<last4>\d{4})/g;
      const { area, local, last4 } = regex.exec(num).groups;
      formattedNum = `${area}-${local}-${last4}`;
      if (international) formattedNum = `+1-${formattedNum}`;
      if (extension) formattedNum = `${formattedNum}, ext. ${extension}`;
    }
    return formattedNum;
  }

  /**
   * Format telephone number for screen readers
   * @param {string} number - Expected a formatted phone number with or without extension
   * @return {string} - Combined phone number parts within the label seperated by
   * periods, e.g. "800-555-1212" becomes "8 0 0. 5 5 5. 1 2 1 2"
   */
  static formatTelLabel(number: string): string {
    return number
      .split(/[^\d\w]+/)
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
    const { contact, extension, clickable, international } = this;
    const formattedNumber = VaTelephone.formatPhoneNumber(
      contact,
      extension,
      international,
    );
    const formattedAriaLabel = `${VaTelephone.formatTelLabel(
      formattedNumber,
    )}.`;

    return clickable ? (
      <a
        href={VaTelephone.createHref(contact, extension)}
        aria-label={formattedAriaLabel}
        onClick={this.handleClick.bind(this)}
      >
        {formattedNumber}
      </a>
    ) : (
      <Fragment>
        <span aria-hidden="true">{formattedNumber}</span>
        <span class="sr-only">{formattedAriaLabel}</span>
      </Fragment>
    );
  }
}
