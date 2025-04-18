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
import { i18next } from '../..';
import { Build } from '@stencil/core';
import { getHeaderLevel, isMessageSet } from '../../utils/utils';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

/**
 * @keydown The event emitted when a key is pressed.
 * @radioOptionSelected The event emitted when the selected option value changes.
 * @componentName Radio button
 * @maturityCategory use
 * @maturityLevel best_practice
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
   * Optional hint text.
   */
  @Prop() hint?: string;

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
   * Insert a header with defined level inside the label (legend)
   */
  @Prop() labelHeaderLevel?: string;

  /**
   * An optional message that will be read by screen readers when the header is focused. The label-header-level
   * prop must be set for this to be active.
   */
  @Prop() headerAriaDescribedby?: string;

  /**
   * An optional message that will be read by screen readers when a radio option is focused.
   */
  @Prop() messageAriaDescribedby?: string;

  /**
   * Enabling this will add a heading and description for integrating into the forms pattern. Accepts `single` or `multiple` to indicate if the form is a single input or will have multiple inputs
   */
  @Prop() useFormsPattern?: string;

  /**
   * The heading level for the heading if `useFormsPattern` is true.
   */
  @Prop() formHeadingLevel?: number = 3;

  /**
   * The content of the heading if `useFormsPattern` is true.
   */
  @Prop() formHeading?: string;

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
    const radioOptionNodes = (
      getSlottedNodes(this.el, 'va-radio-option') as HTMLVaRadioOptionElement[]
    ).filter(node => !node.disabled);

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
  }

  private selectNextNode(node: HTMLVaRadioOptionElement): void {
    node.setAttribute('checked', '');
    node.focus();
  }

  private getHeaderLevel() {
    const number = parseInt(this.labelHeaderLevel, 10);
    return number >= 1 && number <= 6 ? `h${number}` : null;
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
    const {
      label,
      hint,
      required,
      error,
      headerAriaDescribedby,
      messageAriaDescribedby,
      useFormsPattern,
      formHeadingLevel,
      formHeading,
    } = this;
    const HeaderLevel = this.getHeaderLevel();
    const headerAriaDescribedbyId = headerAriaDescribedby
      ? 'header-message'
      : null;
    const messageAriaDescribedbyId = messageAriaDescribedby
      ? 'description-message'
      : null;
    const ariaLabeledByIds =
      `${useFormsPattern && formHeading ? 'form-question' : ''} ${
        useFormsPattern ? 'form-description' : ''
      } ${useFormsPattern === 'multiple' ? 'header-message' : ''}`.trim() ||
      null;

    const legendClass = classnames({
      'usa-legend': true,
      'usa-label--error': error,
    });

    const isFormsPattern =
      useFormsPattern === 'single' || useFormsPattern === 'multiple'
        ? true
        : false;

    let formsHeading = null;
    if (isFormsPattern) {
      const HeaderLevel = getHeaderLevel(formHeadingLevel);
      formsHeading = (
        <Fragment>
          {formHeading && (
            <HeaderLevel id="form-question" part="form-header">
              {formHeading}
            </HeaderLevel>
          )}
          <div id="form-description">
            <slot name="form-description"></slot>
          </div>
        </Fragment>
      );
    }
    return (
      <Host aria-invalid={error ? 'true' : 'false'}>
        {formsHeading}
        <div class="input-wrap">
          <fieldset class="usa-fieldset" aria-labelledby={ariaLabeledByIds}>
            <legend
              class={legendClass}
              part="legend"
              aria-describedby={messageAriaDescribedbyId}
            >
              {HeaderLevel ? (
                <HeaderLevel
                  part="header"
                  aria-describedby={headerAriaDescribedbyId}
                >
                  {label}
                </HeaderLevel>
              ) : (
                label
              )}
              &nbsp;
              {useFormsPattern === 'multiple' && (
                <span id="header-message" class="usa-sr-only">
                  {label}
                </span>
              )}
              {headerAriaDescribedby && (
                <span id="header-message" class="usa-sr-only">
                  {headerAriaDescribedby}
                </span>
              )}
              {isMessageSet(messageAriaDescribedby) && (
                <span id="description-message" class="usa-sr-only">
                  {messageAriaDescribedby}
                </span>
              )}
              {required && (
                <span class="usa-label--required" part="required">
                  {i18next.t('required')}
                </span>
              )}
              {hint && <div class="usa-hint">{hint}</div>}
            </legend>
            {error && (
              <span class="usa-error-message" role="alert">
                <Fragment>
                  <span class="usa-sr-only">{i18next.t('error')}</span> {error}
                </Fragment>
              </span>
            )}
            <slot></slot>
          </fieldset>
        </div>
      </Host>
    );
  }
}
