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

  @Prop({ reflect: true, mutable: true }) value: string;

  @Prop() error: string;

  @State() options: Array<Node>;

  private handleKeyDown(e: Event) {
    console.log(e);
  }

  private handleChange(e: Event) {
    // console.log(e);
    console.log('HELLO');
    const target: HTMLSelectElement = e.target as HTMLSelectElement;
    console.log(target.value);
    this.value = target.value;
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
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        >
          {this.options}
        </select>
      </Host>
    );
  }
}
