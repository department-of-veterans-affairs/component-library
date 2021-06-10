import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  h,
} from '@stencil/core';
import { getSlottedNodes } from '../../utils/utils';

@Component({
  tag: 'va-select',
  styleUrl: 'va-select.css',
  shadow: true,
})
export class VaSelect {
  @Element() el: any;

  /**
   * Whether or not this is a required field.
   */
  @Prop() required: boolean;

  /**
   * Text label for the field.
   */
  @Prop() label: string;

  /**
   * Name attribute for the select field.
   */
  @Prop() name: string;

  /**
   * Selected value (will get updated on select).
   */
  @Prop({ reflect: true, mutable: true }) value: string;

  /**
   * Error message to display. When defined, this indicates an error.
   */
  @Prop() error: string;

  /**
   * Optional text that is displayed to screen readers only.
   */
  @Prop() ariaLiveRegionText: string;

  /**
   * Whether or not to fire the analytics events
   */
  @Prop() enableAnalytics: boolean;

  @Event() keyDown: EventEmitter;

  @Event() select: EventEmitter;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  @State() options: Array<Node>;

  private handleKeyDown() {
    this.keyDown.emit();
  }

  private handleChange(e: Event) {
    const target: HTMLSelectElement = e.target as HTMLSelectElement;
    this.value = target.value;

    if (this.enableAnalytics) {
      const detail = {
        componentName: 'Select',
        action: 'change',
        details: {
          label: this.label,
          selectLabel: this.value,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
    this.select.emit({ value: this.value });
  }

  /**
   * This function is for taking the slotted content and rendering
   * it inside the `<select>` element. Putting the `<slot>` directly
   * inside the `<select>` doesn't actually show the `<option>` elements,
   * but this solves that problem.
   */
  private populateOptions() {
    const { value } = this;

    this.options = getSlottedNodes(this.el, 'option').map(
      (node: HTMLOptionElement) => {
        return (
          <option value={node.value} selected={value === node.value}>
            {node.text}
          </option>
        );
      },
    );
  }

  render() {
    const { error, label, required, name, value, ariaLiveRegionText } = this;
    const errorSpanId = error ? 'error' : undefined;

    return (
      <Host>
        <label htmlFor="select">
          {label}
          {required && <span>(*Required)</span>}
        </label>

        {error && (
          <span id={errorSpanId} role="alert">
            {error}
          </span>
        )}
        <slot onSlotchange={() => this.populateOptions()}></slot>
        <select
          aria-describedby={errorSpanId}
          id="select"
          name={name}
          onKeyDown={() => this.handleKeyDown()}
          onChange={e => this.handleChange(e)}
        >
          {this.options}
        </select>

        {ariaLiveRegionText && (
          <span role="region" class="sr-only" aria-live="assertive">
            {`${ariaLiveRegionText} ${value}`}
          </span>
        )}
      </Host>
    );
  }
}
