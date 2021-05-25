import { Component, Element, Host, Prop, State, h } from '@stencil/core';

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

  /**
   * Get all of the slotted children in the root element that match `nodeName`
   */
  getSlottedNodes(root: HTMLElement, nodeName: string): Array<Node> {
    // If the browser is using the shadowDOM, the childNodes should be an array of two things:
    // A `<style>` element and a `<slot>` element
    // Chrome, Firefox, Safari, Edge - literally every modern browser will use shadowDOM.
    // This is purely for IE compatibility
    const hasShadowDOM =
      Array.from(root.shadowRoot.childNodes).filter(
        (node: any) => node.tagName === 'SLOT',
      ).length > 0;

    const children = hasShadowDOM
      ? root.shadowRoot.querySelector('slot').assignedNodes()
      : root.shadowRoot.childNodes;

    return Array.from(children).filter(
      item => item.nodeName.toLowerCase() === nodeName,
    );
  }

  componentDidRender() {
    if (!this.options)
      this.options = this.getSlottedNodes(this.el, 'option').map(
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
