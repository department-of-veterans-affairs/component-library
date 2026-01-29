import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'va-sort',
  styleUrl: 'va-sort.scss',
  shadow: true,
})
export class VaSort {
  /**
   * Name attribute for the select field.
   */
  // eslint-disable-next-line i18next/no-literal-string
  @Prop() name: string = 'sort';

  /**
   * The selected value.
   */
  @Prop({ mutable: true, reflect: true }) value?: string;

  /**
   * Displays the select at a specific width. Accepts md or medium (20ex), lg (30ex), xl (40ex).
   */
  // eslint-disable-next-line i18next/no-literal-string
  @Prop() width: string = 'lg';
  
  /**
   * An optional message that will be read by screen readers when the select is focused.
   */
  @Prop() messageAriaDescribedby: string;

  /**
   * Whether or not to fire the analytics events
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * The event attached to select's onkeydown
   */
  @Event() vaSortKeyDown: EventEmitter;

  /**
   * The event emitted when the selected value changes
   */
  @Event() vaSortSelect: EventEmitter;

  /**
   * The event emitted when the select element is blurred
   */
  @Event() vaSortSelectBlur: EventEmitter;

  private handleVaKeyDown(event: CustomEvent) {
    event.stopPropagation();
    this.vaSortKeyDown.emit();
  }

  private handleVaSelect(event: CustomEvent) {
    event.stopPropagation();
    this.value = event.detail.value;
    this.vaSortSelect.emit({ value: this.value });
  }

  private handleVaSelectBlur(event: CustomEvent) {
    event.stopPropagation();
    this.vaSortSelectBlur.emit({ value: event.detail.value });
  }

  render() {
    const {
      name, 
      value, 
      width, 
      messageAriaDescribedby,
      enableAnalytics
    } = this;
    return (
      <Host>
        <va-select 
          // eslint-disable-next-line i18next/no-literal-string
          label="Sort by" 
          name={name} 
          value={value} 
          message-aria-describedby={messageAriaDescribedby} 
          width={width}
          class="va-sort__select"
          enable-analytics={enableAnalytics}
          onVaKeyDown={(e: CustomEvent) => this.handleVaKeyDown(e)}
          onVaSelect={(e: CustomEvent) => this.handleVaSelect(e)}
          onVaSelectBlur={(e: CustomEvent) => this.handleVaSelectBlur(e)}
        >
          <slot></slot>
        </va-select>
      </Host>
    );
  }
}
