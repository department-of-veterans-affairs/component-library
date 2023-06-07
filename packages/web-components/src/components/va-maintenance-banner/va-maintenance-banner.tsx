import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import classNames from 'classnames';
import {
  formatDate,
  isDateAfter,
  isDateBefore,
  isDateSameDay,
} from '../../utils/date-utils';

/**
 * @componentName Maintenance Banner
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref form/maintenance-banner
 */

@Component({
  tag: 'va-maintenance-banner',
  styleUrl: 'va-maintenance-banner.scss',
  shadow: true,
})
export class VaMaintenanceBanner {

  maintenanceBannerEl: HTMLDivElement;
  /**
   * Whether or not an analytics event will be fired.
   */
  @Prop() enableAnalytics?: boolean = false;
  /**
   * A unique ID that will be used for conditionally rendering the banner based on if the user has dismissed it already.
   */
  @Prop() bannerId: string;
  /**
   * A Date object used when downtime starts.
   */
  @Prop() startsAt: string;
  /**
   * A Date object used when downtime expires.
   */
  @Prop() expiresAt: string;
  /**
   * The title of the banner for downtime.
   */
  @Prop() maintenanceTitle: string;
  /**
   * The content of the banner for downtime.
   */
  @Prop() maintenanceContent: string;
  /**
   * A Date object used when pre-downtime starts.
   */
  @Prop() warnStartsAt: string;
  /**
   * The title of the banner for pre-downtime.
   */
  @Prop() warnTitle: string;
  /**
   * The content of the banner for pre-downtime.
   */
  @Prop() warnContent: string;
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

  derivePostContent = ( startsAt: Date, expiresAt: Date) => {
    if (isDateSameDay(startsAt, expiresAt)) {
      return (
        <div>
          <p>
            <strong>Date:</strong> {formatDate(startsAt, {})}
          </p>
          <p>
            <strong>Start/End time:</strong> {formatDate(startsAt, {timeStyle: 'short'})}{' '}
            to {formatDate(expiresAt, {timeStyle: 'short'})} ET
          </p>
        </div>
      );
    }

    return (
      <div>
        <p>
          <strong>Start:</strong> {formatDate(startsAt)} ET
        </p>
        <p>
          <strong>End:</strong> {formatDate(expiresAt)} ET
        </p>
      </div>
    );
  };

  onCloseAlert = () => {
      window.localStorage.setItem('MAINTENANCE_BANNER', this.bannerId);
      this.maintenanceBannerEl.remove();
  };

  render() {
    const {warnStartsAt, expiresAt} = this,
      now = new Date();

    // Escape early if it's before when it should show.
    if (isDateBefore(now, new Date(warnStartsAt))) {
      return null;
    }

    // Escape early if it's after when it should show.
    if (isDateAfter(now, new Date(expiresAt))) {
      return null;
    }
    if (window.localStorage.getItem('MAINTENANCE_BANNER') !== this.bannerId) {
      const { warnTitle, warnContent, startsAt, maintenanceTitle, maintenanceContent } = this;
      const isWarning = isDateBefore(now, new Date(startsAt));
      const maintenanceBannerClass = classNames({
        'usa-maintenance-banner': true,
        'usa-maintenance-banner--warning': isWarning,
        'usa-maintenance-banner--error': !isWarning
      })

      return (
        <Host>
            <div class={maintenanceBannerClass} ref={el => (this.maintenanceBannerEl = el as HTMLDivElement)}>
                <div class="usa-maintenance-banner__body">
                  <h4 class="usa-maintenance-banner__title">{isWarning ? warnTitle : maintenanceTitle}</h4>
                  <div class="usa-maintenance-banner__content">{ isWarning ? warnContent : maintenanceContent}</div>
                  <div class="usa-maintenance-banner__derived-content">{this.derivePostContent(new Date(startsAt), new Date(expiresAt))}</div>
                </div>
                <button
                  aria-label="Close notification"
                  class="usa-maintenance-banner__close"
                  onClick={this.onCloseAlert}
                  type="button"
                >
                  <i aria-hidden="true" />
                </button>
            </div>
        </Host>
      )
    } else {
      return null
    }
    
  }
}
