import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'va-alert',
  styleUrl: 'va-alert.css',
  shadow: true,
})
export class VaAlert {
  /* Determines the icon and border/background color.
   * One of `info`, `error`, `success`, `warning`, or `continue`
   */
  @Prop() status: string = 'info';

  /**
   * If true, renders the alert with only a background color corresponding
   * to the status - no icon or left border.
   */
  @Prop() backgroundOnly: boolean = false;

  /**
   * If true, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics: boolean = false;

  /**
   * If true, the alert will be visible.
   */
  @Prop() visible: boolean = true;

  /**
   * Headline for the alert. Won't show if `backgroundOnly` is true.
   */
  @Prop() headline: string;

  /**
   * Determines the level of the heading in the alert.
   */
  @Prop() level: number = 3;

  /**
   * Aria-label text for the close button.
   */
  @Prop() closeBtnAriaLabel: string = 'Close notification';

  /**
   * If true, a close button will be displayed.
   */
  @Prop() closeable: boolean = false;

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
            closeable: this.closeable,
          },
        };
        this.componentLibraryAnalytics.emit(detail);
      }
    }
  }

  render() {
    const {
      backgroundOnly,
      headline,
      level,
      status,
      visible,
      closeable,
    } = this;
    const classes = `alert ${status} ${backgroundOnly ? 'bg-only' : ''}`;

    if (!visible) return <div aria-live="polite" />;

    return (
      <Host>
        <div class={classes}>
          <i aria-hidden="true" role="img"></i>
          <span class="sr-only">Alert: </span>
          <div class="body" onClick={this.handleAlertBodyClick.bind(this)}>
            {headline && !backgroundOnly && h(`h${level}`, null, headline)}
            <div class="text">
              <slot></slot>
            </div>
          </div>
        </div>

        {closeable && (
          <button
            class="va-alert-close"
            aria-label={this.closeBtnAriaLabel}
            onClick={this.closeHandler.bind(this)}
          >
            <i class="fa-times-circle" aria-label="Close icon" />
          </button>
        )}
      </Host>
    );
  }
}
