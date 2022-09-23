import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  Fragment,
} from '@stencil/core';

/**
 * @nativeHandler onBlur
 * @componentName Checkbox
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref form/checkbox
 */
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
  @Prop() label!: string;

  /**
   * The error message to render.
   */
   @Prop({ reflect: true }) error?: string;

  /**
   * The description to render. If this prop exists, va-checkbox will render it
   * instead of the named slot.
   */
  @Prop() description?: string;

  /**
   * Set the input to required and render the (Required) text.
   */
  @Prop() required?: boolean = false;

  /**
   * True if the analytics event should fire.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * Whether the checkbox is checked or not.
   *
   * Note: Because this isn't reflective, vaCheckbox.getAttribute('checked')
   * will not reflect the correct value. Use the property vaCheckbox.checked
   * instead.
   */
  @Prop({ mutable: true }) checked?: boolean = false;

  /**
   * The event emitted when the input value changes.
   */
  @Event() vaChange: EventEmitter;

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
        ...(
          this.el.shadowRoot.querySelector(
            'slot[name="description"]',
          ) as HTMLSlotElement
        )?.assignedNodes(),
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
        checked: this.checked,
      },
      ga4: {
        form_value: this.checked,
        required: this.required
      }
    });
  };

  private handleChange = (e: Event) => {
    this.checked = (e.target as HTMLInputElement).checked;
    this.vaChange.emit({ checked: this.checked });
    if (this.enableAnalytics) this.fireAnalyticsEvent();
  };

  render() {
    const { error, label, required, description, checked } = this;

    return (
      <Host>
        <div id="description">
          {description ? <p>{description}</p> : <slot name="description" />}
        </div>
        <span id="error-message" role="alert">
          {error && (
            <Fragment>
              <span class="sr-only">Error</span> {error}
            </Fragment>
          )}
        </span>
        <input
          type="checkbox"
          id="checkbox-element"
          checked={checked}
          aria-describedby={error ? 'error-message' : undefined}
          aria-invalid={error ? 'true' : 'false'}
          onChange={this.handleChange}
        />
        <label htmlFor="checkbox-element">
          <span>
            {label} {required && <span class="required">(*Required)</span>}
          </span>
        </label>
      </Host>
    );
  }
}
