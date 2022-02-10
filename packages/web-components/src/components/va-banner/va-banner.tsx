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

const DISMISSED_BANNERS_KEY = 'DISMISSED_BANNERS';
@Component({
  tag: 'va-banner',
  styleUrl: 'va-banner.css',
  shadow: true,
})
export class VaBanner {
  @Element() el!: any;

  /**
   * If true, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics: boolean = false;

  /**
   * Enable the close functionality. The banner will be closed until storage is cleared.
   * */
  @Prop() showClose: boolean = false;

  /**
   * The headline of the banner.
   * */
  @Prop() headline: string;

  /**
   * The type of the banner. One of 'info', 'error', 'success', 'continue', or 'warning'. This affects both the icon of the AlertBox and the top border color.
   * */
  @Prop() type: string = 'info';

  /**
   * A boolean that when false makes it so that the banner does not render.
   * */
  @Prop() visible: boolean = true;

  /**
   * Enable sessionStorage for the Banner otherwise storage
   * if showClose is enabled will default to localStorage
   * */
  @Prop() windowSession: boolean = false;

  /**
   * Keep track of locally dismissed Banners
   * */
  @State() dismissedBanners: Array<String> = [];

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

  private prepareBannerID = () => `${this.headline}:${this.el.innerHTML}`;

  private dismiss = () => {
    // Derive the current banner ID.
    const currentBannerID = this.prepareBannerID();

    // Escape early if the banner is already dismissed.
    if (this.dismissedBanners.includes(currentBannerID)) {
      return;
    }

    // Add the banner ID to the list of dismissed banners. If showClose enabled
    if (this.showClose) {
      // Derive the updated dismissed banners.
      const updatedDismissedBanners = [
        ...this.dismissedBanners,
        currentBannerID,
      ];

      //   Set storage type
      const storageType = this.windowSession
        ? window.sessionStorage
        : window.localStorage;

      // Set banner dismissed in storage
      storageType.setItem(
        DISMISSED_BANNERS_KEY,
        JSON.stringify(updatedDismissedBanners),
      );

      // Update dismissedBanners in state.
      this.dismissedBanners = updatedDismissedBanners;

      // Track the dismiss event in Google Analytics
      if (!this.disableAnalytics) {
        const detail = {
          componentName: 'Banner',
          action: 'dismissIconClick',
          details: {
            clickLabel: 'Dismiss Banner',
            headline: this.headline,
            showClose: this.showClose,
            windowSession: this.windowSession,
            type: this.type,
          },
        };
        this.componentLibraryAnalytics.emit(detail);
      }
    }
  };

  private handleAlertBodyClick(e: MouseEvent): void {
    if (!this.disableAnalytics) {
      const target = e.target as HTMLElement;
      // If it's a link being clicked, dispatch an analytics event
      if (target?.tagName === 'A') {
        const detail = {
          componentName: 'Banner',
          action: 'linkClick',
          details: {
            clickLabel: target.innerText,
            headline: this.headline,
            showClose: this.showClose,
            type: this.type,
          },
        };
        this.componentLibraryAnalytics.emit(detail);
      }
    }
  }

  render() {
    // Set the storage type
    const storageType = this.windowSession
      ? window.sessionStorage
      : window.localStorage;

    // Derive dismissed banners from storage.
    const dismissedBannersString = storageType.getItem(DISMISSED_BANNERS_KEY);
    this.dismissedBanners = dismissedBannersString
      ? JSON.parse(dismissedBannersString)
      : [];

    // Derive if the banner is dismissed.
    const isBannerDismissed =
      this.showClose && this.dismissedBanners?.includes(this.prepareBannerID());

    // Escape early if the banner isn't visible or is dismissed.
    if (!this.visible || isBannerDismissed) {
      return null;
    }

    // Derive onCloseAlert depending if the close icon is shown.
    const onCloseAlert = this.showClose ? this.dismiss : undefined;

    return (
      <Host
        data-e2e-id="emergency-banner"
        onClick={this.handleAlertBodyClick.bind(this)}
      >
        <va-alert
          visible
          full-width
          closeable={this.showClose}
          onCloseEvent={onCloseAlert}
          status={this.type}
        >
          <h3 slot="headline">{this.headline}</h3>
          <slot></slot>
        </va-alert>
      </Host>
    );
  }
}
