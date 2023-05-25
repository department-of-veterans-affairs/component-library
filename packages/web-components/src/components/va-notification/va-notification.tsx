import { 
  Component, 
  Element,
  Event,
  EventEmitter,
  Host, 
  Prop, 
  h 
} from '@stencil/core';
import classnames from 'classnames';

/**
 * @componentName Notification
 * @maturityCategory caution
 * @maturityLevel proposed
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
   * Header for notification
   */
    @Prop() header?: string;

  /**
   * Destination URL for link (optional)
   */
    @Prop() href?: string;

  /**
   * Text for destination link (optional)
   */
    @Prop() text?: string;
  
  /**
   * Fires when the component is closed by clicking on the close icon. This fires only
   * when closeable is true.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  closeEvent: EventEmitter;

  private closeHandler(e: MouseEvent): void {
    this.closeEvent.emit(e);
  }

  render() {
    const {
      visible,
      symbol,
      href,
      text,
      closeable,
      hasBorder,
      hasCloseText,
    } = this;

    if (!visible) return <div aria-live="polite" />;

    const classes = classnames('va-notification', symbol, { 'has-border': hasBorder })

    return (
      <Host>
        <va-card show-shadow="true">
          <div class={classes} role="alert">
            <i aria-hidden="true" role="img" class={symbol}></i>
            <div class="body" role="presentation">
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
