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

@Component({
  tag: 'va-radio',
  styleUrl: 'va-radio.css',
  shadow: true,
})
export class VaRadio {
  @Element() el: any;

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

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  @Event({
    composed: true,
    bubbles: true,
  })
  vaValueChange: EventEmitter;

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    const currentItem = event.target as HTMLVaRadioOptionElement;
    const radioOptionNodes = getSlottedNodes(
      this.el,
      'va-radio-option',
    ) as HTMLVaRadioOptionElement[];
    const currentItemIndex = radioOptionNodes.findIndex(
      item => item === currentItem,
    );
    let nextItem;

    switch (event.key) {
      case ' ':
        this.selectNextItem(currentItem);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        if (currentItemIndex === radioOptionNodes.length - 1) {
          this.deselectCurrentItem(currentItem);
          nextItem = radioOptionNodes[0];
          this.selectNextItem(nextItem);
        } else {
          this.deselectCurrentItem(currentItem);
          nextItem = radioOptionNodes[currentItemIndex + 1];
          this.selectNextItem(nextItem);
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        if (currentItemIndex === 0) {
          this.deselectCurrentItem(currentItem);
          nextItem = radioOptionNodes[radioOptionNodes.length - 1];
          this.selectNextItem(nextItem);
        } else {
          this.deselectCurrentItem(currentItem);
          nextItem = radioOptionNodes[currentItemIndex - 1];
          this.selectNextItem(nextItem);
        }
        break;
      default:
        break;
    }

    if (this.enableAnalytics) this.fireAnalyticsEvent(nextItem.label);

    this.vaValueChange.emit({ value: nextItem.value });
  }

  @Listen('radioOptionSelected')
  radioOptionSelectedHandler(event: CustomEvent): void {
    const clickedItem = event.target as HTMLVaRadioOptionElement;

    getSlottedNodes(this.el, 'va-radio-option')
      .filter((item: HTMLVaRadioOptionElement) => item !== clickedItem)
      .forEach((item: HTMLVaRadioOptionElement) => {
        this.deselectCurrentItem(item);
      });

    this.selectNextItem(clickedItem);

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

  private deselectCurrentItem(currentItem: HTMLVaRadioOptionElement): void {
    currentItem.checked = false;
    currentItem.tabIndex = -1;
  }

  private selectNextItem(nextItem: HTMLVaRadioOptionElement): void {
    nextItem.focus();
    nextItem.checked = true;
    nextItem.tabIndex = 0;
  }

  componentDidLoad(): void {
    getSlottedNodes(this.el, 'va-radio-option').forEach(
      (item: HTMLVaRadioOptionElement, index: number) => {
        if (index === 0) {
          item.checked = false;
          item.tabIndex = 0;
        } else {
          this.deselectCurrentItem(item);
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
