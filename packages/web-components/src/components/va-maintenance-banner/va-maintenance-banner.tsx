import {
  Component,
  Element,
  Host,
  h,
  Prop,
} from '@stencil/core';

@Component({
  tag: 'va-maintenance-banner',
  shadow: true,
})
export class VaMaintenanceBanner {
  @Element() el: HTMLElement;

  /**
   * The content of the banner for downtime.
   */
  @Prop() downContent: string;

  /**
   * A Date object used when downtime expires.
   */
  @Prop() expiresAt: Date;

  /**
   * A Date object used when downtime starts
   */
  @Prop() startsAt: Date;

  /**
   * The title of the banner or downtime
   */
  @Prop() headline: string;

  render() {
    const { downContent, headline } = this;
    return (
      <Host>
        <va-alert
            close-btn-aria-label="Close notification"
            full-width
            status="warning"
            visible
        >
          <h3 slot="headline">{headline}</h3>
          <p>{downContent}</p>
          <p><strong>Date: </strong>5/7/2022 3:40:03 PM</p>
          <p><strong>Start/End time: </strong>5/27/2022, 4:28:11 PM to 5/27/2022, 5:28:11 PM</p>
        </va-alert>
      </Host>
    )
  }
}