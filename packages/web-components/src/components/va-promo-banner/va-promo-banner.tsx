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

/**
 * Reset the banner in storage by opening Developer Tools in the browser and
 * then clicking on the Application Tab. Under Storage you will see Local
 * Storage and check the Storage to see if a DISMISSED_PROMO_BANNERS Key exists.
 * If it does right click and delete it and refresh your page to see the banner
 * again. Alternatively you can change the id on the component since the new id
 * would not match the id in storage.
 */

/**
 * @componentName Banner - Promo
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref banner/promo
 */
@Component({
  tag: 'va-promo-banner',
  styleUrl: 'va-promo-banner.css',
  shadow: true,
})
export class VaPromoBanner {
  @Element() el: HTMLElement;

  /**
   * `href` attribute for the anchor tag.
   */
  @Prop() href: string;

  /**
   * Controls which icon gets used. Options are 'announcement', 'news', or 'email-signup'.
   * */
  @Prop() type: 'announcement' | 'news' | 'email-signup';

  /**
   * Analytics tracking function(s) will not be called
   */
  @Prop() disableAnalytics?: boolean = false;

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
    if (this.el.id) {
      // Derive the updated dismissed banners based on the id attribute set on the component.
      const updatedDismissedBanners = [...this.dismissedBanners, this.el.id];

      // Update dismissedBanners in state.
      this.dismissedBanners = updatedDismissedBanners;

      // Add the promo banner ID to local storage.
      localStorage.setItem(
        DISMISSED_PROMO_BANNERS_LOCAL_STORAGE_KEY,
        JSON.stringify(updatedDismissedBanners),
      );
    }

    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-promo-banner',
        action: 'close',
        details: {
          text: this.el.innerText,
          type: this.type,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  }

  private handleLinkClick(): void {
    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-promo-banner',
        action: 'linkClick',
        details: {
          text: this.el.innerText,
          href: this.href,
          type: this.type,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
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
    // Add additional padding on component load to prevent position fixed text overlap in footer
    document.body.classList.add('va-pad-promo-banner');
  }

  render() {
    // Derive if the banner is dismissed based on the id attribute set on the component.
    const isBannerDismissed = this.dismissedBanners?.includes(this.el.id);

    // Do not render if the promo banner is dismissed.
    if (isBannerDismissed) {
      // Remove additional padding set on the body during component load
      document.body.classList.remove('va-pad-promo-banner');
      return null;
    }

    return (
      <Host>
        <div class="va-banner-body" role="banner">
          <i aria-hidden="true" class={this.type} role="presentation" />
          <a
            class="va-banner-content-link"
            href={this.href}
            onClick={() => this.handleLinkClick()}
          >
            <slot></slot> <i aria-hidden="true" role="presentation" />
          </a>
          <button
            type="button"
            aria-label="Dismiss this promo banner"
            onClick={() => this.closeHandler()}
          >
            <i aria-hidden="true" role="presentation" />
          </button>
        </div>
      </Host>
    );
  }
}
