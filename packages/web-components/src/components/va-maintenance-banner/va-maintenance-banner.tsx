import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import classNames from 'classnames';
import {
  formatDate,
  isDateAfter,
  isDateBefore,
  isDateSameDay,
} from '../../utils/date-utils';

/**
 * @componentName Banner - Maintenance
 * @maturityCategory caution
 * @maturityLevel available
 */

@Component({
  tag: 'va-maintenance-banner',
  styleUrl: 'va-maintenance-banner.scss',
  shadow: true,
})
export class VaMaintenanceBanner {
  maintenanceBannerEl: HTMLDivElement;
  maintenanceBannerContent: HTMLDivElement;
  /**
   * Whether or not an analytics event will be fired.
   */
  @Prop() disableAnalytics?: boolean = false;
  /**
   * A unique ID that will be used for conditionally rendering the banner based on if the user has dismissed it already.
   */
  @Prop() bannerId!: string;
  /**
   * The Date/Time of when the maintenance is scheduled to begin.
   */
  @Prop() maintenanceStartDateTime!: string;
  /**
   * The Date/Time of when the maintenance is scheduled to end.
   */
  @Prop() maintenanceEndDateTime!: string;
  /**
   * The title of the banner shown during active maintenance.
   */
  @Prop() maintenanceTitle: string;
  /**
   * The Date/Time of when to be begin warning users of upcoming site maintenance.
   */
  @Prop() upcomingWarnStartDateTime!: string;
  /**
   * The title of the banner shown for upcoming site maintenance.
   */
  @Prop() upcomingWarnTitle: string;
  /**
   * Override logic for whether to show error or warning
   */
  @Prop() isError: boolean;
  /**
   * Fires when the component is closed by clicking on the close icon.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  closeEvent: EventEmitter;

  /**
   * The event used to track usage of the component. This is emitted when the
   * component renders and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  derivePostContent = ( maintenanceStartDateTime: Date, maintenanceEndDateTime: Date) => {
    let milliseconds = (maintenanceEndDateTime.getTime() - maintenanceStartDateTime.getTime());
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = ((milliseconds / (1000 * 60 * 60)) - hours) * 60 ;
    const duration = `${hours > 0 ? hours + ' hours ' : ''} ${minutes > 0 ? minutes + ' minutes' : ''}`;


    if (isDateSameDay(maintenanceStartDateTime, maintenanceEndDateTime)) {
      return (
        <div>
          <p>
            <strong>Date:</strong> {formatDate(maintenanceStartDateTime, {dateStyle: 'full'})}
          </p>
          <p>
            <strong>Time:</strong> {formatDate(maintenanceStartDateTime, {hour:'numeric', minute: 'numeric', timeZoneName: 'short'})}
          </p>
          <p>
            <strong>Duration:</strong> {duration}
          </p>
        </div>
      );
    }

    return (
      <div>
        <p>
          <strong>Date:</strong> {formatDate(maintenanceStartDateTime, {dateStyle: 'full'})}
        </p>
        <p>
          <strong>Time:</strong> {formatDate(maintenanceStartDateTime, {hour:'numeric', minute: 'numeric', timeZoneName: 'short'})}
        </p>
        <p>
          <strong>Duration:</strong> {duration}
        </p>
      </div>
    );
  };

  onCloseAlert = () => {
    this.closeEvent.emit();
    window.localStorage.setItem('MAINTENANCE_BANNER', this.bannerId);
    this.maintenanceBannerEl.remove();

    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-maintenance-banner',
        action: 'close',
        details: {
          header: isDateBefore(new Date(), new Date(this.maintenanceStartDateTime)) ? this.upcomingWarnTitle : this.maintenanceTitle,
          upcomingWarnStartDateTime: this.upcomingWarnStartDateTime,
          maintenanceStartDateTime: this.maintenanceStartDateTime,
          maintenanceEndDateTime: this.maintenanceEndDateTime,
          displayedContent: this.maintenanceBannerContent.innerText,
        }
      }
      this.componentLibraryAnalytics.emit(detail);
    }
  };

  render() {
    const {upcomingWarnStartDateTime, maintenanceEndDateTime, isError} = this,
      now = new Date();

    // Escape early if it's before when it should show.
    if (isDateBefore(now, new Date(upcomingWarnStartDateTime))) {
      return null;
    }

    // Escape early if it's after when it should show.
    if (isDateAfter(now, new Date(maintenanceEndDateTime))) {
      return null;
    }
    if (window.localStorage.getItem('MAINTENANCE_BANNER') !== this.bannerId) {
      const { upcomingWarnTitle, maintenanceStartDateTime, maintenanceTitle} = this;
      const isWarning = isDateBefore(now, new Date(maintenanceStartDateTime)) && !isError;

      const maintenanceBannerClass = classNames({
        'maintenance-banner': true,
        'maintenance-banner--warning': isWarning,
        'maintenance-banner--error': !isWarning
      })

      const bannerIconName = isError ? 'error' : 'warning';

      return (
        <Host>
          <div
            class={maintenanceBannerClass}
            ref={el => (this.maintenanceBannerEl = el as HTMLDivElement)}
          >
            <va-icon
              class="maintenance-banner__icon"
              icon={bannerIconName}
              size={3}
            ></va-icon>
            <div class="maintenance-banner__body">
              <h4 class="maintenance-banner__title">
                {isWarning ? upcomingWarnTitle : maintenanceTitle}
              </h4>
              <div
                class="maintenance-banner__content"
                ref={el =>
                  (this.maintenanceBannerContent = el as HTMLDivElement)
                }
              >
                {isWarning ? (
                  <slot name="warn-content"></slot>
                ) : (
                  <slot name="maintenance-content"></slot>
                )}
              </div>
              <div class="maintenance-banner__derived-content">
                {this.derivePostContent(
                  new Date(maintenanceStartDateTime),
                  new Date(maintenanceEndDateTime),
                )}
              </div>
            </div>
            <button
              aria-label="Close notification"
              class="maintenance-banner__close"
              onClick={this.onCloseAlert}
              type="button"
            >
              <va-icon icon="cancel" size={3}></va-icon>
            </button>
          </div>
        </Host>
      );
    } else {
      return null
    }

  }
}
