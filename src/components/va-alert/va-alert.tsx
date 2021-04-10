import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

// Enum used to set the AlertBox's `status` prop
// export const ALERT_TYPE = Object.freeze({
//   INFO: 'info', // Blue border, black circled 'i'
//   ERROR: 'error', // Red border, red circled exclamation
//   SUCCESS: 'success', // Green border, green checkmark
//   WARNING: 'warning', // Yellow border, black triangle exclamation
//   CONTINUE: 'continue', // Green border, green lock
// });

@Component({
  tag: 'va-alert',
  styleUrl: 'va-alert.css',
  shadow: true,
})
export class VaAlert {
  @Prop() status: string = 'info';

  /**
   * If true, renders the alert with only a background color corresponding
   * to the status - no icon or left border.
   */
  @Prop() backgroundOnly: boolean = false;

  /**
   * If true, doesn't fire the CustomEvent which can be used for analytics tracking
   */
  @Prop() disableAnalytics: boolean = false;

  @Prop() visible: boolean = true;

  @Prop() headline: string;

  /**
   * Determines the level of the heading in the alert
   */
  @Prop() level: number = 3;

  @Prop() closeBtnAriaLabel: string = 'Close notification';

  @Event({
    composed: true,
    bubbles: true,
  })
  close: EventEmitter;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private closeHandler(e: MouseEvent): void {
    this.close.emit(e);
  }

  private handleAlertBodyClick(e: MouseEvent): void {
    if (!this.disableAnalytics) {
      const target = e.target as HTMLElement;
      // If it's a link being clicked, dispatch an analytics event
      if (target?.tagName === 'A') {
        const detail = {
          componentName: 'AlertBox',
          action: 'linkClick',
          details: {
            clickLabel: target.innerText,
            headline: this.headline,
            status: this.status,
            backgroundOnly: this.backgroundOnly,
            // closeable: !!this.onCloseAlert,
          },
        };
        this.componentLibraryAnalytics.emit(detail);
      }
    }
  }

  render() {
    const { backgroundOnly, headline, level, status, visible } = this;
    const classes = `alert ${status} ${backgroundOnly ? 'bg-only' : ''}`;

    if (!visible) return <div aria-live="polite" />;

    return (
      <Host>
        <div class={classes}>
          <div class="body" onClick={this.handleAlertBodyClick.bind(this)}>
            {headline && h(`h${level}`, null, headline)}
            <slot></slot>
          </div>
        </div>
        <button
          class="va-alert-close"
          aria-label={this.closeBtnAriaLabel}
          onClick={this.closeHandler.bind(this)}
        >
          <i class="fas fa-times-circle" aria-label="Close icon" />
        </button>
      </Host>
    );
  }
}
