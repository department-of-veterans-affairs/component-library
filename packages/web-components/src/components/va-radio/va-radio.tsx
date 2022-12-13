import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  Host,
  Listen,
  Prop,
  h,
  Fragment,
} from '@stencil/core';
import classnames from 'classnames';
import { getSlottedNodes } from '../../utils/utils';
import i18next from 'i18next';
import { Build } from '@stencil/core';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

/**
 * @keydown The event emitted when a key is pressed.
 * @radioOptionSelected The event emitted when the selected option value changes.
 * @componentName Radio button
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref form/radio-button
 * @translations English
 * @translations Spanish
 * @translations Tagalog
 */

@Component({
  tag: 'va-radio',
  styleUrl: 'va-radio.scss',
  shadow: true,
})
export class VaRadio {
  @Element() el: HTMLElement;

  /**
   * The text label for the radio group.
   */
  @Prop() label!: string;

  /**
   * Optional hint text for the radio group.
   */
  @Prop() hint: string;

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
   * Whether or not the component will use USWDS v3 styling.
   */
   @Prop() uswds?: boolean = false;

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
    const radioOptionNodes = (getSlottedNodes(this.el, 'va-radio-option') as HTMLVaRadioOptionElement[])
      .filter(node => !node.disabled);

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
        event.preventDefault();
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
        event.preventDefault();
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

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

  render() {
    const { label, hint, required, error, uswds } = this;
    const ariaLabel = label + (required ? ' required' : '');

    if (uswds) {
      const legendClass = classnames({
        'usa-legend': true,
        'usa-label--error': error
      });
      return (
        <Host
          aria-invalid={error ? 'true' : 'false'}
          aria-label={ariaLabel}
        >
          <fieldset class="usa-form usa-fieldset">
            <legend class={legendClass} part="legend">
              {label}
              {required && <span class="usa-label--required" part="required"> {i18next.t('required')}</span>}
            </legend>
            <span class="usa-error-message" role="alert" part="error">
              {error && (
                <Fragment>
                  <span class="usa-sr-only">{i18next.t('error')}</span> {error}
                </Fragment>
              )}
            </span>
            {hint && <span class="usa-hint" part="hint">{hint}</span>}
            <slot></slot>
          </fieldset>
        </Host>
       )
    } else {
      return (
        <Host
          role="radiogroup"
          aria-invalid={error ? 'true' : 'false'}
          aria-label={ariaLabel}
        >
          <legend part="legend">
            {label}
            {required && <span class="required" part="required">{i18next.t('required')}</span>}
          </legend>
          {hint && <span class="hint-text" part="hint">{hint}</span>}
          <span id="error-message" role="alert" part="error">
            {error && (
              <Fragment>
                <span class="sr-only">{i18next.t('error')}</span> {error}
              </Fragment>
            )}
          </span>
          <slot></slot>
        </Host>
      );
    }
  }
}
