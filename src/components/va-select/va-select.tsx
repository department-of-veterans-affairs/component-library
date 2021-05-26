import { Component, Element, Host, Prop, State, h } from '@stencil/core';
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

  @Prop() value: string;

  @Prop() error: string;

  @State() options: Array<Node>;

  private handleKeyDown(e: Event) {
    console.log(e);
  }

  componentDidRender() {
    if (!this.options)
      this.options = getSlottedNodes(this.el, 'option').map(
        (node: HTMLOptionElement) => {
          return <option value={node.value}>{node.text}</option>;
        },
      );
  }

  render() {
    const errorSpanId = this.error ? 'error' : undefined;

    return (
      <Host role="listbox">
        <label
          class={this.error ? 'usa-input-error-label' : ''}
          htmlFor="select"
        >
          {this.label}
          {this.required && <span class="form-required-span">(*Required)</span>}
        </label>

        {this.error && (
          <span class="usa-input-error-message" id={errorSpanId} role="alert">
            {this.error}
          </span>
        )}
        <slot></slot>
        <select
          aria-describedby={errorSpanId}
          id="select"
          name={this.name}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleKeyDown}
        >
          {this.options}
        </select>
      </Host>
    );
  }
}
