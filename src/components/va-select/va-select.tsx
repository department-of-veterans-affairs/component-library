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
  @Element() el!: any;
  @Prop() required: boolean;

  @Prop() label: string;

  @Prop() name: string;

  @Prop({ reflect: true, mutable: true }) value: string;

  @Prop() error: string;

  @Prop() ariaLiveRegionText: string;

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

  private handleKeyDown(e: Event) {
    console.log(e);
    this.keyDown.emit();
  }

  private handleChange(e: Event) {
    const target: HTMLSelectElement = e.target as HTMLSelectElement;
    this.value = target.value;

    if (this.enableAnalytics) {
      const target = e.target as HTMLElement;
      const detail = {
        componentName: 'Select',
        action: 'change',
        details: {
          label: this.label,
          selectLabel: target.value,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
    this.select.emit({ value: this.value });
  }

  componentDidRender() {
    const { value } = this;
    // console.log(this.options);
    if (!this.options)
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
    const errorSpanId = this.error ? 'error' : undefined;

    return (
      <Host>
        <label htmlFor="select">
          {this.label}
          {this.required && <span>(*Required)</span>}
        </label>

        {this.error && (
          <span id={errorSpanId} role="alert">
            {this.error}
          </span>
        )}
        <slot></slot>
        <select
          aria-describedby={errorSpanId}
          id="select"
          name={this.name}
          onKeyDown={this.handleKeyDown.bind(this)}
          onChange={this.handleChange.bind(this)}
        >
          {this.options}
        </select>

        {this.ariaLiveRegionText && (
          <span role="region" class="sr-only" aria-live="assertive">
            {`${this.ariaLiveRegionText} ${this.value}`}
          </span>
        )}
      </Host>
    );
  }
}
