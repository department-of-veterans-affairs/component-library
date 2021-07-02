import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
} from '@stencil/core';

import { assembleAttributes } from '../../utils/utils';

// The props passed to the web component which we don't want to pass to the
// input element. Note: The following attributes are deliberately left out so
// they get passed to the input:
//   - required
//   - checked
const wcOnlyProps = ['label', 'error', 'enableAnalytics'];

@Component({
  tag: 'va-checkbox',
  styleUrl: 'va-checkbox.css',
  shadow: true,
})
export class VaCheckbox {
  @Element() el: HTMLElement;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

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
      },
    });
  };

  private handleChange = (e: Event) => {
    this.checked = (e.target as HTMLInputElement).checked;
    if (this.enableAnalytics) this.fireAnalyticsEvent();
  };

  render() {
    const atts = assembleAttributes(this.el.attributes, wcOnlyProps);
    atts['aria-describedby'] = (
      (atts['aria-describedby'] || '') + ' description'
    ).trim();
    if (this.error) {
      atts['aria-describedby'] += ' error-message';
    }
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
          {...atts}
          onChange={this.handleChange}
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
