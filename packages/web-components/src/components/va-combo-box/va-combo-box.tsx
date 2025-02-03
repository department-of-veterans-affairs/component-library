import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  Host,
  Prop,
  h,
  State,
  Fragment,
} from '@stencil/core';
import classnames from 'classnames';
import { i18next } from '../..';
import { comboBox } from './va-combo-box-library.js';

/**
 * @componentName Combo Box
 * @maturityCategory caution
 * @maturityLevel candidate
 * @guidanceHref form/combo-box
 * @translations English
 * @translations Spanish
 */

@Component({
  tag: 'va-combo-box',
  styleUrl: 'va-combo-box.scss',
  shadow: true,
})
export class VaComboBox {
  @Element() el: any;

  @State() options: Array<Node>;

  @State() labelNode: HTMLLabelElement;

  /**
   * Whether or not this is a required field.
   */
  @Prop() required?: boolean = false;

  /**
   * The combo box component will be disabled / read-only.
   */
  @Prop() disabled?: boolean = false;

  /**
   * Text label for the field.
   */
  @Prop() label!: string;

  /**
   * The placeholder string.
   */
  @Prop() placeholder?: string;

  /**
   * Name attribute for the select field.
   */
  @Prop() name!: string;

  /**
   * Selected value (will get updated on select).
   */
  @Prop({ reflect: true, mutable: true }) value?: string;

  /**
   * Error message to display. When defined, this indicates an error.
   */
  @Prop() error?: string;

  /**
   * Optional hint text.
   */
  @Prop() hint?: string;

  /**
   * An optional message that will be read by screen readers when the select is focused.
   */
  @Prop() messageAriaDescribedby?: string;

  /**
   * The event emitted when the selected value changes
   */
  @Event() vaSelect: EventEmitter;


  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  componentDidLoad() {
    const comboBoxElement = this.el.shadowRoot.querySelector('.usa-combo-box');
    const labelElement = this.el.shadowRoot.querySelector('label');
    if (comboBoxElement) {
      comboBox.init(comboBoxElement, labelElement);
      comboBox.on(comboBoxElement);
    }
    const inputElement = this.el.shadowRoot.querySelector('input');
    if (inputElement && this.error) {
      inputElement.classList.add('usa-input--error');
    }

    const errorID = 'input-error-message';
    const ariaDescribedbyIds = `${
      this.messageAriaDescribedby ? 'input-message' : ''
    } ${this.error ? errorID : ''} ${
      this.hint ? 'input-hint' : ''
    } ${inputElement.getAttribute('aria-describedby')}`.trim();
    // need to append to existing attribute which is set during initialization and contains USWDS "options--assistiveHint"
    inputElement.setAttribute('aria-describedby', ariaDescribedbyIds);
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
    // Clean up the USWDS ComboBox
    const comboBoxElement = this.el.shadowRoot.querySelector('.usa-combo-box');
    if (comboBoxElement) {
      comboBox.off(comboBoxElement);
    }
  }

  /**
   * This function is for taking the slotted content and rendering
   * it inside the `<select>` element. Putting the `<slot>` directly
   * inside the `<select>` doesn't actually show the `<option>` elements,
   * but this solves that problem.
   */
  private populateOptions() {
    const { value } = this;
    const allNodes = this.el.querySelectorAll('option, optgroup')

    
    const nodes = Array.from(allNodes);
    return nodes.map(
      (node: HTMLOptionElement | HTMLOptGroupElement, index) => {
        if (node.nodeName.toLowerCase() === 'optgroup') {
          return (
            <Fragment>
            <option data-optgroup="true" id={"optgroup-" + index}>{node.label}</option>

            {Array.from(node.children).map((child: HTMLOptionElement) => {
              return (
                <option 
                  value={child.value} 
                  selected={value === child.value} 
                  data-optgroup-option="true"
                  aria-describedby={"optgroup-" + index}
                >
                  {child.text}
                </option>
              );
            })}
            </Fragment>
          
          );
        } else if (node.nodeName.toLowerCase() === 'option' && 
                    node.parentElement.nodeName.toLowerCase() !== 'optgroup') {
          return (
            <option
              value={(node as HTMLOptionElement).value}
              selected={value === (node as HTMLOptionElement).value}
            >
              {node.textContent}
            </option>
          );
        }
      },
    );
  }

  private handleChange(e: Event) {
    const target: HTMLSelectElement = e.target as HTMLSelectElement;
    this.value = target.value;
    this.vaSelect.emit({ value: this.value });
  }

  render() {
    const {
      error,
      value,
      disabled,
      placeholder,
      label,
      required,
      name,
      hint,
      messageAriaDescribedby,
    } = this;

    const labelClass = classnames({
      'usa-label': true,
      'usa-label--error': error,
    });
    return (
      <Host>
        <label htmlFor="options" class={labelClass} id="options-label">
          {label}
          {required && (
            <span class="usa-label--required"> {i18next.t('required')}</span>
          )}
        </label>
        {hint && (
          <span class="usa-hint" id="input-hint">
            {hint}
          </span>
        )}
        <span id="input-error-message" role="alert">
          {error && (
            <Fragment>
              <span class="usa-sr-only">{i18next.t('error')}</span>
              <span class="usa-error-message">{error}</span>
            </Fragment>
          )}
        </span>
        <slot></slot>
        <div
          class="usa-combo-box"
          data-default-value={value}
          data-placeholder={placeholder}
        >
          <select
            class="usa-select"
            name={name}
            id="options"
            onChange={e => this.handleChange(e)}
            disabled={disabled}
          >
            {this.populateOptions()}
          </select>
        </div>
        {messageAriaDescribedby && (
          <span id="input-message" class="usa-sr-only dd-privacy-hidden">
            {messageAriaDescribedby}
          </span>
        )}
      </Host>
    );
  }
}
