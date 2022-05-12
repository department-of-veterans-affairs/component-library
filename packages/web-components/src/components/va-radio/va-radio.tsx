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
import { getSlottedNodes } from '../../utils/utils';

/**
 * @keydown The event emitted when a key is pressed.
 * @radioOptionSelected The event emitted when the selected option value changes.
 */
@Component({
  tag: 'va-radio',
  styleUrl: 'va-radio.css',
  shadow: true,
})
export class VaRadio {
  @Element() el: HTMLElement;

  /**
   * The text label for the radio group.
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

  /**
   * The event used to track usage of the component. This is emitted when a
   * radio option is selected and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * The event emitted when the selected value changes
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  vaValueChange: EventEmitter;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    const currentNode = event.target as HTMLVaRadioOptionElement;
    const currentInput = currentNode.shadowRoot.querySelector('input');
    const radioOptionNodes = getSlottedNodes(
      this.el,
      'va-radio-option',
    ) as HTMLVaRadioOptionElement[];
    if (!radioOptionNodes.length) return;

    const currentNodeIndex = radioOptionNodes.findIndex(
      node => node === currentNode,
    );
    if (currentNodeIndex === -1) return;

    let nextNode;

    switch (event.key) {
      case ' ':
        event.preventDefault();
        if (currentInput.checked) return;
        nextNode = currentNode;
        this.selectNextNode(currentInput);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        if (currentNodeIndex === radioOptionNodes.length - 1) {
          nextNode = radioOptionNodes[0];
          const nextInput = nextNode.shadowRoot.querySelector('input');
          this.deselectCurrentNode(currentInput);
          this.selectNextNode(nextInput);
        } else {
          nextNode = radioOptionNodes[currentNodeIndex + 1];
          const nextInput = nextNode.shadowRoot.querySelector('input');
          this.deselectCurrentNode(currentInput);
          this.selectNextNode(nextInput);
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        if (currentNodeIndex === 0) {
          nextNode = radioOptionNodes[radioOptionNodes.length - 1];
          const nextInput = nextNode.shadowRoot.querySelector('input');
          this.deselectCurrentNode(currentInput);
          this.selectNextNode(nextInput);
        } else {
          nextNode = radioOptionNodes[currentNodeIndex - 1];
          const nextInput = nextNode.shadowRoot.querySelector('input');
          this.deselectCurrentNode(currentInput);
          this.selectNextNode(nextInput);
        }
        break;
      default:
        break;
    }

    if (!nextNode) return;

    if (this.enableAnalytics) this.fireAnalyticsEvent(nextNode.label);

    this.vaValueChange.emit({ value: nextNode.value });
  }

  @Listen('radioOptionSelected')
  radioOptionSelectedHandler(event: CustomEvent): void {
    const clickedItem = event.target as HTMLVaRadioOptionElement;

    getSlottedNodes(this.el, 'va-radio-option')
      .filter(item => item !== clickedItem)
      .forEach((item: HTMLVaRadioOptionElement) => {
        const input = item.shadowRoot.querySelector('input');
        this.deselectCurrentNode(input);
      });
    const input = clickedItem.shadowRoot.querySelector('input');
    this.selectNextNode(input);

    if (this.enableAnalytics) this.fireAnalyticsEvent(clickedItem.label);

    this.vaValueChange.emit({ value: clickedItem.value });
  }

  private fireAnalyticsEvent(optionLabel) {
    this.componentLibraryAnalytics.emit({
      componentName: 'va-radio',
      action: 'change',
      details: {
        label: this.label,
        optionLabel,
        required: this.required,
      },
    });
  }

  private deselectCurrentNode(node: HTMLInputElement): void {
    node.removeAttribute('checked');
    node.setAttribute('tabindex', '-1');
  }

  private selectNextNode(node: HTMLInputElement): void {
    node.setAttribute('checked', '');
    node.setAttribute('tabindex', '0');
    node.focus();
  }

  componentDidLoad(): void {
    getSlottedNodes(this.el, 'va-radio-option').forEach(
      (node: HTMLVaRadioOptionElement, index: number) => {
        const input = node.shadowRoot.querySelector('input');
        if (index === 0) {
          input.setAttribute('tabindex', '0');
        } else {
          input.setAttribute('tabindex', '-1');
        }
      },
    );
  }

  render() {
    return (
      <Host role="radiogroup">
        <legend>
          {this.label}
          {this.required && <span class="required-span">(*Required)</span>}
        </legend>
        {this.error && (
          <span class="error-message" role="alert">
            <span class="sr-only">Error</span> {this.error}
          </span>
        )}
        <slot></slot>
      </Host>
    );
  }
}
