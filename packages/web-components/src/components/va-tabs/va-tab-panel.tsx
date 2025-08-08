import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'va-tab-panel',
  styleUrl: 'va-tab-panel.scss',
  shadow: true,
})
export class VaTabPanel {
  /**
   * The unique identifier for the tab panel. This should match the id referenced by the corresponding `va-tab-item`.
   */
  @Prop() panelId!: string;

  /**
   * Indicates whether the tab panel is currently selected/visible in parent `va-tabs`. Note that this value does not need to be passed for component initialization, it will be set via logic in parent `va-tabs` on initial render.
   */
  @Prop({ reflect: true }) selected: boolean = false;

  render() {
    let { panelId, selected } = this;

    return (
      <Host
        id={panelId}
        role="tabpanel"
        tabindex={selected ? '0' : '-1'}
        class="va-tab-panel__content"
        hidden={!selected}
        aria-labelledby={`${panelId}-tab`}
      >
        <slot></slot>
      </Host>
    );
  }
}
