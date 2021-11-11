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

  @Listen('keydown', { capture: true })
  handleKeydown(event): void {
    if (event.key === ' ') {
      event.preventDefault();
      this.toggleOpen();
    }
  }

  render() {
    return (
      <Host aria-expanded={this.open ? 'true' : 'false'}>
        <a role="button" aria-controls="info" tabIndex={0}>
          <span class="additional-info-title">
            {this.trigger}
            <i class="fa-angle-down" role="presentation" />
          </span>
        </a>

        <div id="info" class={this.open ? 'open' : 'closed'}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
