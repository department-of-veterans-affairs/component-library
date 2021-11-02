import { Component, Host, Prop, State, Listen, h } from '@stencil/core';

@Component({
  tag: 'va-additional-info',
  styleUrl: 'va-additional-info.css',
  shadow: true,
})
export class VaAdditionalInfo {
  @State() open: boolean;

  /**
   * The text to trigger the expansion
   */
  @Prop() trigger: string;

  @Listen('click', { capture: true })
  toggleOpen(): void {
    this.open = !this.open;
  }

  render() {
    return (
      <Host>
        <span class="additional-info-title">{this.trigger}</span>

        <div class={this.open ? 'open' : 'closed'}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
