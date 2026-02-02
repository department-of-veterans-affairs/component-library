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

  /**
   * The event used to track usage of the component. This is emitted when an
   * option is selected and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  // va-select onKeyDown
  private handleVaKeyDown(event: CustomEvent) {
    event.stopPropagation();
    this.vaSortKeyDown.emit();
  }

  // va-select onChange
  private handleVaSelect(event: CustomEvent) {
    event.stopPropagation();
    this.value = event.detail.value;

    if (this.enableAnalytics) {
      const detail = {
        componentName: 'va-sort',
        action: 'change',
        details: {
          label: 'Sort by',
          selectLabel: this.value,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }

    this.vaSortSelect.emit({ value: this.value });
  }

  // va-select onBlur
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
    } = this;
    return (
      <Host>
        <va-select 
          label="Sort by" 
          name={name} 
          value={value} 
          message-aria-describedby={messageAriaDescribedby} 
          width={width}
          class="va-sort__select"
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
