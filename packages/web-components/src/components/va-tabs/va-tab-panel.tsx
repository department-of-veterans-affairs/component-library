import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'va-tab-panel',
  styleUrl: 'va-tab-panel.scss',
  shadow: true,
})
export class VaTabPanel {
  /**
   * The unique identifier for the tab panel. This should match the id referenced by the corresponding tab.
   */
  @Prop() panelId!: string;

  /**
   * Indicates whether the tab panel is currently selected/visible.
   */
  @Prop({ reflect: true }) selected: boolean = false;

  render() {
    return (
      <Host
        id={this.panelId}
        role="tabpanel"
        tabindex={this.selected ? '0' : '-1'}
        class="va-tab-panel__content"
        aria-hidden={!this.selected ? 'true' : 'false'}
        hidden={!this.selected}
        aria-labelledby={`${this.panelId}-tab`}
      >
        <slot></slot>
      </Host>
    );
  }
}
