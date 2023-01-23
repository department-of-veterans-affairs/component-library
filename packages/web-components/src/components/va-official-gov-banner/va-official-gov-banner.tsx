import { Component, Host, h, EventEmitter, Event, Prop } from '@stencil/core';

/**
 * @componentName Banner - Official Gov
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-official-gov-banner',
  styleUrl: 'va-official-gov-banner.css',
  shadow: true,
})
export class VaOfficialGovBanner {
  /**
   * The event used to track usage of the component.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * If `true`, the component-library-analytics event is disabled.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * Accepts a top level domain (TLD) value of either `gov` or `mil`.
   * Default is `gov`.
   */
  @Prop() tld: string = 'gov';

  // TODO: Add analytics details.
  // private handleClick = (e: MouseEvent): void => {
  //   if (!this.disableAnalytics) {
  //     const detail = {
  //       componentName: 'va-official-gov-banner',
  //       action: 'click',
  //       details: { },
  //     }
  //     this.componentLibraryAnalytics.emit(detail);
  //   }
  // };

  render() {
    return (
      <Host>
        <p>hello world: {this.tld}</p>
        <slot></slot>
      </Host>
    );
  }

}
