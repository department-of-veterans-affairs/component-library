import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
} from '@stencil/core';

@Component({
  tag: 'va-checkbox',
  styleUrl: 'va-checkbox.css',
  shadow: true,
})
export class VaCheckbox {
  @Element() el: HTMLElement;

  /**
   * The label for the checkbox.
   */
  @Prop() label: string;

  /**
   * The error message to render.
   */
  @Prop() error?: string | HTMLElement;

  /**
   * The description to render. If this prop exists, va-checkbox will render it
   * instead of the named slot.
   */
  @Prop() description?: string;

  /**
   * Set the input to required and render the (Required) text.
   */
  @Prop() required?: boolean;

  /**
   * True if the analytics event should fire.
   */
  @Prop() enableAnalytics: boolean = false;

  /**
   * Whether the checkbox is checked or not.
   *
   * Note: Because this isn't reflective, vaCheckbox.getAttribute('checked')
   * will not reflect the correct value. Use the property vaCheckbox.checked
   * instead.
   */
  @Prop({ mutable: true }) checked: boolean = false;

  /**
   * The aria-describedby attribute for the <intput> in the shadow DOM.
   */
  @Prop() ariaDescribedby: string = '';

  /**
   * The event emitted when the input value changes.
   */
  @Event() vaChange: EventEmitter;

  /**
   * The event emitted when the input is blurred.
   */
  @Event() vaBlur: EventEmitter;

  /**
   * The event used to track usage of the component. This is emitted when the
   * input value changes and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private fireAnalyticsEvent = () => {
    // Either the description prop or the text content of the description slots
    const description =
      this.description ||
      [
        // This won't work in IE
        ...(this.el.shadowRoot.querySelector(
          'slot[name="description"]',
        ) as HTMLSlotElement)?.assignedNodes(),
        // For IE
        ...Array.from(
          this.el.shadowRoot.querySelectorAll('[slot="description"]'),
        ),
      ]
        .map(n => n.textContent)
        .join(' ');

    this.componentLibraryAnalytics.emit({
      componentName: 'va-checkbox',
      action: 'change',
      details: {
        label: this.label,
        description,
        required: this.required,
        checked: this.checked
      },
    });
  };

  private handleChange = (e: Event) => {
    this.checked = (e.target as HTMLInputElement).checked;
    this.vaChange.emit({ checked: this.checked });
    if (this.enableAnalytics) this.fireAnalyticsEvent();
  };

  private handleBlur = () => {
    this.vaBlur.emit();
  };

  render() {
    const describedBy = `${this.ariaDescribedby} description ${
      this.error && 'error-message'
    }`.trim();

    return (
      <Host>
        <div id="description">
          {this.description ? (
            <p>{this.description}</p>
          ) : (
            <slot name="description" />
          )}
        </div>
        <input
          type="checkbox"
          id="checkbox-element"
          checked={this.checked}
          aria-describedby={describedBy}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <label htmlFor="checkbox-element">
          {this.label}
          {this.required && <span class="required">(Required)</span>}
        </label>
        {this.error && <span id="error-message">{this.error}</span>}
      </Host>
    );
  }
}
