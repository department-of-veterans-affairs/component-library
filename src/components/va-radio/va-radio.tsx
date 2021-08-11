import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Prop,
  h,
} from '@stencil/core';
import { getSlottedNodes } from '../../utils/utils';

@Component({
  tag: 'va-radio',
  styleUrl: 'va-radio.css',
  shadow: true,
})
export class VaRadio {
  @Element() el: any;

  @Prop() label: string;

  @Prop() required: boolean = false;

  @Prop() error: string;

  @Prop() enableAnalytics: boolean;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  @Event({
    composed: true,
    bubbles: true,
  })
  vaValueChange: EventEmitter;

  @Event({
    composed: true,
    bubbles: true,
  })
  vaMouseDown: EventEmitter;

  @Listen('radioOptionSelected')
  radioOptionSelectedHandler(event: CustomEvent): void {
    const clickedItem = event.target as HTMLVaRadioOptionElement;

    getSlottedNodes(this.el, 'va-radio-option')
      .filter(item => item !== clickedItem)
      .forEach(item => ((item as HTMLVaRadioOptionElement).checked = false));

    clickedItem.checked = true;

    if (this.enableAnalytics) this.fireAnalyticsEvent(clickedItem.label);

    this.vaValueChange.emit({ value: clickedItem.value });
  }

  @Listen('radioOptionMouseDown')
  radioOptionMouseDownHandler(): void {
    this.vaMouseDown.emit();
  }

  private fireAnalyticsEvent(optionLabel) {
    this.componentLibraryAnalytics.emit({
      componentName: 'va-radio',
      action: 'change',
      details: {
        label: this.label,
        optionLabel,
        required: this.required,
      },
    });
  }

  render() {
    return (
      <Host role="radiogroup">
        <legend>
          {this.label}
          {this.required && <span class="required-span">(*Required)</span>}
        </legend>
        {this.error && (
          <span class="error-message" role="alert">
            <span class="sr-only">Error</span> {this.error}
          </span>
        )}
        <slot></slot>
      </Host>
    );
  }
}
