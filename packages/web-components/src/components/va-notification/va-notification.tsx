import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
  Listen,
} from '@stencil/core';
import classnames from 'classnames';

/**
 * @componentName Notification
 * @maturityCategory dont_use
 * @maturityLevel deprecated
 */

@Component({
  tag: 'va-notification',
  styleUrl: 'va-notification.scss',
  shadow: true,
})
export class VaNotification {
  @Element() el!: any;

  /**
   * If `true`, the card will be visible.
   */
  @Prop() visible?: boolean = true;

  /**
   * Symbol indicates type of notification
   * Current options are: action-required, update
   */
  @Prop() symbol?: string = 'none';

  /**
   * Aria-label text for the close button.
   */
  @Prop() closeBtnAriaLabel?: string = 'Close notification';

  /**
   * If `true`, a close button will be displayed.
   */
  @Prop({ reflect: true }) closeable?: boolean = false;

  /**
   * If `false`, card will not have border
   */
  @Prop({ reflect: true }) hasBorder?: boolean = true;

  /**
   * If `false`, card will not have the word "CLOSE" next to close icon
   */
  @Prop() hasCloseText?: boolean = false;

  /**
   * Headline for notification
   */
  @Prop() headline?: string;

  /**
   * Define level for headline. Font size will remain the same regardless of header level.
   */
  @Prop() headlineLevel?: string = '3';

  /**
   * Date and time for notification. This will also be incorporated into a unique aria-describedby label.
   */
    @Prop() dateTime?: string;

  /**
   * Destination URL for link (optional)
   */
  @Prop() href?: string;

  /**
   * Text for destination link. Set to empty string if you don't want a link.
   */
  @Prop() text?: string;

  /**
   * If `true`, the component-library-analytics event is disabled.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * Fires when the component is closed by clicking on the close icon. This fires only
   * when closeable is true.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  closeEvent: EventEmitter;

  /**
   * The event used to track usage of the component.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * Listen for the va-link GA event and capture it so
   * that we can emit a single va-notification GA event that includes
   * the va-link details.
   */
  @Listen('component-library-analytics')
  handleLinkAnalytics(event) {
    // Prevent va-notification GA event from firing multiple times.
    if (event.detail.componentName === 'va-notification') return;

    // Prevent va-link GA event from firing.
    event.stopPropagation();

    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-notification',
        action: 'linkClick',
        details: {
          clickLabel: event.detail?.details?.label, // va-link text
          type: this.symbol,
          headline: this.headline,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  }

  private closeHandler(e: MouseEvent): void {
    this.closeEvent.emit(e);

    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-notification',
        action: 'close',
        details: {
          type: this.symbol,
          headline: this.headline,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  }

  private getHeadlineLevel() {
    const number = parseInt(this.headlineLevel, 10);
    return number >= 1 && number <= 6 ? `h${number}` : `h3`;
  }

  render() {
    const {
      visible,
      symbol,
      headline,
      dateTime,
      href,
      text,
      closeable,
      hasBorder,
      hasCloseText,
    } = this;
    const HeadlineLevel = this.getHeadlineLevel();

    if (!visible) return <div aria-live="polite" />;

    const classes = classnames('va-notification', symbol, { 'has-border': hasBorder })

    const ariaDescribedByLabel = `${headline} ${dateTime}`;

    return (
      <Host>
        <va-card show-shadow="true">
          <div class={classes}>
            <i aria-hidden="true" role="img" class={symbol}></i>
            <div class="body" role="presentation">
              {headline ? <HeadlineLevel part="headline" aria-describedby={ariaDescribedByLabel}>{headline}</HeadlineLevel> : null}
              {dateTime ? <time dateTime={dateTime}>{dateTime}</time> : null}
              <slot></slot>
              {(href && text) ? (
                <va-link active href={href} text={text} />
              ) : null}
            </div>
          </div>

          {closeable && (
            <button
              class="va-notification-close"
              aria-label={this.closeBtnAriaLabel}
              onClick={this.closeHandler.bind(this)}
            >
              <i aria-hidden="true" class="fas fa-times-circle" role="presentation" />
              {hasCloseText && (
                <span>CLOSE</span>
              )}
            </button>
          )}
        </va-card>
      </Host>
    );
  }

}
