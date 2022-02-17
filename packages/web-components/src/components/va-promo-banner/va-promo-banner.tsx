import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
} from '@stencil/core';
import classnames from 'classnames';

@Component({
  tag: 'va-promo-banner',
  styleUrl: 'va-promo-banner.css',
  shadow: true,
})
export class VaPromoBanner {
  @Element() el: HTMLElement;

  /**
   * The rendering custom markup via the slot instead of the `<a>` with `text` in it
   * */
  @Prop() renderCustom: boolean = false;

  /**
   * `href` attribute for the `<a>` tag. Only gets used if `render` is _not_ used
   */
  @Prop() href: string;

  /**
   * `target` attribute for the `<a>` tag. Only gets used if `render` is _not_ used
   */
  @Prop() target: string;

  /**
   * Controls which icon gets used. Options are 'announcement', 'news', or 'email-signup'.
   * */
  @Prop() type: string = 'announcement';

  /**
   * Analytics tracking function(s) will not be called
   */
  @Prop() disableAnalytics: boolean;

  /**
   * Fires when the component is closed by clicking on the close icon.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  closeEvent: EventEmitter;

  /**
   * The event used to track usage of the component. This is emitted when an
   * anchor link or the dismiss icon is clicked and disableAnalytics is not true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private closeHandler(e: MouseEvent): void {
    this.closeEvent.emit(e);
  }

  private handleLinkClick(e: MouseEvent): void {
    if (!this.disableAnalytics) {
      const target = e.target as HTMLElement;
      // If it's a link being clicked, dispatch an analytics event
      if (target?.tagName === 'A') {
        const detail = {
          componentName: 'va-promo-banner',
          action: 'linkClick',
          details: {
            text: target.innerText,
            href: this.href,
            target: this.target,
            type: this.type,
          },
        };
        this.componentLibraryAnalytics.emit(detail);
      }
    }
  }

  render() {
    const PROMO_BANNER_ICONS = new Map([
      ['announcement', 'fa-bullhorn'],
      ['news', 'fa-newspaper'],
      ['email-signup', 'fa-envelope'],
    ]);
    const iconClasses = classnames(
      'fas',
      'fa-stack-1x',
      PROMO_BANNER_ICONS.get(this.type),
    );
    return (
      <Host>
        <div class="vads-c-promo-banner">
          <div class="vads-c-promo-banner__body">
            <div class="vads-c-promo-banner__icon">
              <span class="fa-stack fa-lg">
                <i
                  aria-hidden="true"
                  class="vads-u-color--white fa fa-circle fa-stack-2x"
                  role="presentation"
                />
                <i aria-hidden="true" class={iconClasses} role="presentation" />
              </span>
            </div>

            <div class="vads-c-promo-banner__content">
              {this.renderCustom ? (
                <slot></slot>
              ) : (
                <a
                  class="vads-c-promo-banner__content-link"
                  href={this.href}
                  target={this.target}
                  onClick={this.handleLinkClick.bind(this)}
                >
                  <slot></slot>{' '}
                  <i
                    aria-hidden="true"
                    class="fas fa-angle-right"
                    role="presentation"
                  />
                </a>
              )}
            </div>

            <div class="vads-c-promo-banner__close">
              <button
                type="button"
                aria-label="Dismiss this announcement"
                onClick={this.closeHandler.bind(this)}
                class="va-button-link vads-u-margin-top--1"
              >
                <i
                  aria-hidden="true"
                  class="fas fa-times-circle vads-u-font-size--lg"
                  role="presentation"
                />
              </button>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
