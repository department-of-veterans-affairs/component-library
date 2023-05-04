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
 * Use a heading element with an attribute named slot and a value of "headline" to
 * control what is displayed for the card's headline. Any children passed into
 * this component without a parent slot "headline" will render in the card's body.
 */

/**
 * @componentName Card
 * @maturityCategory dont_use
 * @maturityLevel proposed
 */

@Component({
  tag: 'va-card',
  styleUrl: 'va-card.scss',
  shadow: true,
})
export class VaCard {
  @Element() el!: any;

  @Prop() showIcon?: boolean = false;

  /**
   * If `true`, the alert will be visible.
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

  private closeHandler(e: MouseEvent): void {
    this.closeEvent.emit(e);
  }
  
  render() {
    const {
      visible,
      closeable,
      showIcon,
    } = this;

    if (!visible) return <div aria-live="polite" />;

    const classes = classnames('va-card', {
      'hide-icon': !showIcon,
    });

    return (
      <Host>
        <div class={classes}>
          <slot name="headline"></slot>
          <slot name="content"></slot>
        </div>
        {closeable && (
            <button
              class="va-card-close"
              aria-label={this.closeBtnAriaLabel}
              onClick={this.closeHandler.bind(this)}
            >
              <i aria-hidden="true" class="fas fa-times-circle" role="presentation" />
            </button>
          )}
      </Host>
    );
  }

}
