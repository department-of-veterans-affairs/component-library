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
    const radioOptionNodes = getSlottedNodes(this.el, 'va-radio-option');
    if (!radioOptionNodes.length) return;

    const currentNodeIndex = radioOptionNodes.findIndex(
      node => node === currentNode,
    );
    if (currentNodeIndex === -1) return;

    let nextNode;

    switch (event.key) {
      case ' ':
        event.preventDefault();
        if (currentNode.checked) return;
        nextNode = currentNode;
        this.selectNextNode(currentNode);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        if (currentNodeIndex === radioOptionNodes.length - 1) {
          nextNode = radioOptionNodes[0];
          this.deselectCurrentNode(currentNode);
          this.selectNextNode(nextNode);
        } else {
          nextNode = radioOptionNodes[currentNodeIndex + 1];
          this.deselectCurrentNode(currentNode);
          this.selectNextNode(nextNode);
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        if (currentNodeIndex === 0) {
          nextNode = radioOptionNodes[radioOptionNodes.length - 1];
          this.deselectCurrentNode(currentNode);
          this.selectNextNode(nextNode);
        } else {
          nextNode = radioOptionNodes[currentNodeIndex - 1];
          this.deselectCurrentNode(currentNode);
          this.selectNextNode(nextNode);
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
        this.deselectCurrentNode(item);
      });

    this.selectNextNode(clickedItem);

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

  private deselectCurrentNode(node: HTMLVaRadioOptionElement): void {
    node.removeAttribute('checked');
    node.setAttribute('tabindex', '-1');
  }

  private selectNextNode(node: HTMLVaRadioOptionElement): void {
    node.setAttribute('checked', '');
    node.setAttribute('tabindex', '0');
    node.focus();
  }

  componentDidLoad(): void {
    getSlottedNodes(this.el, 'va-radio-option').forEach(
      (node: HTMLVaRadioOptionElement, index: number) => {
        if (index === 0) {
          node.setAttribute('tabindex', '0');
        } else {
          node.setAttribute('tabindex', '-1');
        }
      },
    );
  }

  render() {
    const { label, required, error } = this;
    return (
      <Host role="radiogroup" aria-invalid={error ? 'true' : 'false'}>
        <legend>
          {label}
          {required && <span class="required">(*Required)</span>}
        </legend>
        {error && (
          <span id="error-message" role="alert">
            <span class="sr-only">Error</span> {error}
          </span>
        )}
        <slot></slot>
      </Host>
    );
  }
}
