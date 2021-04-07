import { Component, Host, Prop, h } from '@stencil/core';

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

  @Prop() visible: boolean = true;

  @Prop() headline: string;
  // @Prop() level: number;
  //
  @Prop() closeBtnAriaLabel: string = 'Close notification';

  @Prop() onClose: any;

  render() {
    const { status, visible } = this;
    const classes = `alert ${status}`;

    if (!visible) return <div aria-live="polite" />;

    return (
      <Host>
        <div class={classes}>
          <div class="body">
            {this.headline && <h3>{this.headline}</h3>}
            <slot></slot>
          </div>
        </div>
        <button
          class="va-alert-close"
          aria-label={this.closeBtnAriaLabel}
          onClick={this.onClose}
        >
          <i class="fas fa-times-circle" aria-label="Close icon" />
        </button>
      </Host>
    );
  }
}
