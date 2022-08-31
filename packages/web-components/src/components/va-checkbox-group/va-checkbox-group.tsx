import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Prop,
  h,
  Fragment,
} from '@stencil/core';

/**
 * @vaChange The event emitted when the input value changes.
 * @componentName Checkbox group
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref form/checkbox
 */
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
  @Prop() label!: string;

  /**
   * Whether or not this input field is required.
   */
  @Prop() required?: boolean = false;

  /**
   * A string with an error message.
   */
  @Prop() error?: string;

  /**
   * Whether or not an analytics event will be fired.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * The event used to track usage of the component. This is emitted when an
   * input value changes and enableAnalytics is true.
   */
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
    const { label, required, error } = this;
    return (
      <Host role="group">
        <legend>
          {label}
          {required && <span class="required">(*Required)</span>}
        </legend>
        <span id="error-message" role="alert">
          {error && (
            <Fragment>
              <span class="sr-only">Error</span> {error}
            </Fragment>
          )}
        </span>
        <slot></slot>
      </Host>
    );
  }
}
