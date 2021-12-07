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

@Component({
  tag: 'va-checkbox-group',
  styleUrl: 'va-checkbox-group.css',
  shadow: true,
})
export class VaCheckboxGroup {
  @Element() el: HTMLElement;

  /**
   * The text label for the checkbox group.
   */
  @Prop() label: string;

  /**
   * Whether or not this input field is required.
   */
  @Prop() required: boolean = false;

  /**
   * A string with an error message.
   */
  @Prop() error: string;

  /**
   * Whether or not an analytics event will be fired.
   */
  @Prop() enableAnalytics: boolean;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  @Listen('vaChange')
  vaChangeHandler(event: CustomEvent): void {
    const clickedItem = event.target as HTMLVaCheckboxElement;
    if (this.enableAnalytics) this.fireAnalyticsEvent(clickedItem.label);
  }

  private fireAnalyticsEvent(optionLabel) {
    this.componentLibraryAnalytics.emit({
      componentName: 'va-checkbox-group',
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
      <Host role="group">
        <legend>
          {this.label}
          {this.required && <span class="required-span">(*Required)</span>}
        </legend>
        {this.error && (
          <span class="error-message" role="alert">
            <span class="sr-only">Error:</span> {this.error}
          </span>
        )}
        <slot></slot>
      </Host>
    );
  }
}
