import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h
} from '@stencil/core';
import classNames from 'classnames';
import {
  formatDate,
  isDateAfter,
  isDateBefore,
  isDateSameDay,
} from '../../utils/date-utils';
import { getHeaderLevel } from '../../utils/utils';

/**
 * @componentName Banner - Maintenance
 * @maturityCategory use
 * @maturityLevel deployed
 */

@Component({
  tag: 'va-maintenance-banner',
  styleUrl: 'va-maintenance-banner.scss',
  shadow: true,
})
export class VaMaintenanceBanner {
  isWarning: boolean = false;
  maintenanceBannerEl: HTMLDivElement;
  maintenanceBannerContent: HTMLDivElement;
  preventRender: boolean = false;

  @Element() el: HTMLElement;

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
   * The level of the header for the maintenance title. Default is h2.
   */
  @Prop() maintenanceTitleHeaderLevel: number = 2;
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

  /**
   * Logic to run before the component loads.
   * - Check if value of passed props meet the criteria for rendering the
   *   banner, and if not, set a flag to prevent rendering.
   * - Determine whether the banner is an error or warning based on the current
   *   date and the passed maintenance start date, unless the isError prop is
   *   set to true.
   * - Remove the unused slot from the DOM to prevent confusion for screen
   *   readers and assistive technologies.
   */
  componentWillLoad() {
    const {
      bannerId,
      isError,
      upcomingWarnStartDateTime,
      maintenanceEndDateTime,
      maintenanceStartDateTime,
    } = this;

    const now = new Date();
    const maintenanceStart = new Date(maintenanceStartDateTime);
    const maintenanceEnd = new Date(maintenanceEndDateTime);
    const upcomingWarnStart = new Date(upcomingWarnStartDateTime);

    // Time checks to be used multiple times in the logic below
    const maintenanceStartInFuture = isDateBefore(now, maintenanceStart);
    const maintenanceEndInPast = isDateAfter(now, maintenanceEnd);
    const warningStartInFuture = isDateBefore(now, upcomingWarnStart);

    const bothWindowsInPast =
      isDateAfter(now, maintenanceStart) &&
      maintenanceEndInPast &&
      isDateAfter(now, upcomingWarnStart);

    const bothWindowsInFuture =
      maintenanceStartInFuture &&
      isDateBefore(now, maintenanceEnd) &&
      warningStartInFuture;

    // Flip the flag to prevent rendering if any of the following conditions are
    // true:
    // - it's before or after when it should show
    // - both the maintenance and warning windows are in the past
    // - both the maintenance and warning windows are in the future
    // - the user has already dismissed the banner.
    if (
      warningStartInFuture ||
      maintenanceEndInPast ||
      bothWindowsInPast ||
      bothWindowsInFuture ||
      window.localStorage.getItem('MAINTENANCE_BANNER') === bannerId
    ) {
      this.preventRender = true;
    }

    // Designate as a warning if it's before the maintenance start time and not
    // an error
    this.isWarning = maintenanceStartInFuture && !isError;

    const maintenanceSlot = this.el.querySelector('[slot="maintenance-content"]');
    const warnSlot = this.el.querySelector('[slot="warn-content"]');

    // Ensure that unnecessary slots are removed from the DOM to prevent
    // confusion for screen readers and assistive technologies.
    // - If render is being prevented based on the criteria above, remove both
    //   slots since the banner won't be shown at all.
    // - If component will render and the current date is within one of the
    //   windows, remove the slot that isn't being used. For example, if it's
    //   within the maintenance window, remove the warn slot since it won't be
    //   shown.
    if (this.preventRender) {
      maintenanceSlot?.remove();
      warnSlot?.remove();
    } else {
      const slotToRemove = this.isWarning
        ? maintenanceSlot
        : warnSlot;
      slotToRemove?.remove();
    }
  }

  derivePostContent = (maintenanceStartDateTime: Date, maintenanceEndDateTime: Date) => {
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
    const {
      maintenanceEndDateTime,
      isError,
      maintenanceTitleHeaderLevel,
      upcomingWarnTitle,
      maintenanceStartDateTime,
      maintenanceTitle,
      preventRender,
    } = this;

    // Stop here if property flag has been set to prevent rendering based on the
    // criteria in componentWillLoad
    if (preventRender) {
      return null;
    }

    const HeaderLevel = getHeaderLevel(maintenanceTitleHeaderLevel);

    const maintenanceBannerClass = classNames({
      'maintenance-banner': true,
      'maintenance-banner--warning': this.isWarning,
      'maintenance-banner--error': !this.isWarning
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
            size={4}
          ></va-icon>

          <div class="maintenance-banner__body">
            <HeaderLevel class="maintenance-banner__title">
              {this.isWarning ? upcomingWarnTitle : maintenanceTitle}
            </HeaderLevel>

            <div
              class="maintenance-banner__content"
              ref={el =>
                (this.maintenanceBannerContent = el as HTMLDivElement)
              }
            >
              {this.isWarning ? (
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
            <va-icon icon="close" size={4}></va-icon>
          </button>
        </div>
      </Host>
    );
  }
}
