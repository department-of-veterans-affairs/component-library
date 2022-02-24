import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  State,
} from '@stencil/core';

const DISMISSED_PROMO_BANNERS_LOCAL_STORAGE_KEY = 'DISMISSED_PROMO_BANNERS';
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
  @Prop() type: 'announcement' | 'news' | 'email-signup';

  /**
   * Analytics tracking function(s) will not be called
   */
  @Prop() disableAnalytics: boolean;

  /**
   * Id of Promo Banner Instance for tracking in Storage
   */
  @Prop() bannerId: string;

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

  /**
   * Keep track of locally dismissed Banners
   * */
  @State() dismissedBanners: Array<String> = [];

  private closeHandler(): void {
    this.closeEvent.emit();
    // Derive the updated dismissed banners.
    const updatedDismissedBanners = [...this.dismissedBanners, this.bannerId];

    // Update dismissedBanners in state.
    this.dismissedBanners = updatedDismissedBanners;

    // Add the promo banner ID to local storage.
    localStorage.setItem(
      DISMISSED_PROMO_BANNERS_LOCAL_STORAGE_KEY,
      JSON.stringify(updatedDismissedBanners),
    );
  }

  private handleLinkClick(e: MouseEvent): void {
    if (!this.disableAnalytics) {
      const targetEl = e.target as HTMLElement;
      const targetAnchor =
        targetEl?.tagName === 'A' ||
        (targetEl?.tagName === 'SLOT' &&
          targetEl?.parentElement.tagName === 'A');
      // If it's a link being clicked, dispatch an analytics event
      if (targetAnchor) {
        const detail = {
          componentName: 'va-promo-banner',
          action: 'linkClick',
          details: {
            text:
              targetEl.tagName === 'A' ? targetEl.innerText : this.el.innerText,
            href: this.href,
            target: this.target,
            type: this.type,
          },
        };
        this.componentLibraryAnalytics.emit(detail);
      }
    }
  }

  componentWillLoad() {
    // Derive dismissed banners from storage.
    const dismissedBannersString = localStorage.getItem(
      DISMISSED_PROMO_BANNERS_LOCAL_STORAGE_KEY,
    );
    this.dismissedBanners = dismissedBannersString
      ? JSON.parse(dismissedBannersString)
      : [];
  }

  render() {
    // Derive if the banner is dismissed.
    const isBannerDismissed = this.dismissedBanners?.includes(this.bannerId);

    // Do not render if the promo banner is dismissed.
    if (isBannerDismissed) {
      return null;
    }

    return (
      <Host>
        <div class="va-banner-body">
          <div class="va-banner-icon">
            <div class="va-banner-icon-contents">
              <i aria-hidden="true" class={this.type} role="presentation" />
            </div>
          </div>
          <div class="va-banner-content">
            {this.renderCustom ? (
              <slot></slot>
            ) : (
              <a
                class="va-banner-content-link"
                href={this.href}
                target={this.target}
                onClick={e => this.handleLinkClick(e)}
              >
                <slot></slot> <i aria-hidden="true" role="presentation" />
              </a>
            )}
          </div>
          <div class="va-banner-close">
            <button
              type="button"
              aria-label="Dismiss this promo banner"
              onClick={() => this.closeHandler()}
            >
              <i aria-hidden="true" role="presentation" />
            </button>
          </div>
        </div>
      </Host>
    );
  }
}
