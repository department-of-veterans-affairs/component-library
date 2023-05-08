import { 
  Component, 
  Element,
  Event,
  EventEmitter,
  Host, 
  Prop, 
  h 
} from '@stencil/core';

/**
 * @componentName Notification
 * @maturityCategory dont_use
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
   * Aria-label text for the close button.
   */
  @Prop() closeBtnAriaLabel?: string = 'Close notification';

  /**
   * If `true`, a close button will be displayed.
   */
  @Prop({ reflect: true }) closeable?: boolean = false;

  /**
   * Fires when the component is closed by clicking on the close icon. This fires only
   * when closeable is true.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  closeEvent: EventEmitter;
  
  render() {
    const {
      visible,
      closeable,
    } = this;

    if (!visible) return <div aria-live="polite" />;

    return (
      <Host>
        <va-card 
          closeable = {closeable}
        >
        </va-card>
      </Host>
    );
  }

}
