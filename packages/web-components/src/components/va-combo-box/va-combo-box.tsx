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
  Watch, 
  Listen
} from '@stencil/core';
import classnames from 'classnames';
import { i18next } from '../..';
import { comboBox } from './va-combo-box-library.js';
import { isMessageSet } from '../../utils/utils';
import { manageFlagIcon, handleRerender } from './utils';

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
  styleUrls: ['va-combo-box.scss', 'flags.scss'],
  shadow: true,
})
export class VaComboBox {
  @Element() el: any;

  @State() options: Array<Node>;

  @State() labelNode: HTMLLabelElement;

  private isInVaInputTelephone: boolean;

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
   * Whether to show error message text 
   */
  @Prop() showInputError?: boolean = true;

  @Watch('error')
  updateErrorClass(newValue: string) {
    const input = this.el.shadowRoot.querySelector('input');
    if (input) {
      if (newValue) {
        input.classList.add('usa-input--error');
      } else {
        input.classList.remove('usa-input--error')
      }
    }
  }

  /**
   * The event emitted when the selected value changes
   */
  @Event() vaSelect: EventEmitter;

  componentWillLoad() {
    this.populateOptions();
  }

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  componentDidLoad() {
    const comboBoxElement = this.el.shadowRoot.querySelector('.usa-combo-box');
    const labelElement = this.el.shadowRoot.querySelector('label');
    this.isInVaInputTelephone = this.el.parentElement?.classList.contains('va-input-telephone-wrapper');
    // create span that will hold flag in the input
    if (this.isInVaInputTelephone) {
      const comboBoxEl = this.el.shadowRoot.querySelector('div.usa-combo-box');
      const flagSpan = document.createElement('span');
      this.value = !!this.value ? this.value : 'US';
      flagSpan.classList.add('flag', `flag-${this.value.toLowerCase()}`, 'dynamic-flag');
      comboBoxEl.appendChild(flagSpan);
    }
    
    if (comboBoxElement) {
      comboBox.init(comboBoxElement, labelElement, this.value, this.isInVaInputTelephone);
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
   * This function is pulling all <option> and <optgroup> elements from the light DOM
   * and creating a new array of <option> elements to be rendered in the shadow DOM.
   * It also creates <option> elements for each <optgroup> element to act as a label.
   * @returns List of <option> elements
   */
  private populateOptions() {
    const { value } = this;
    const allNodes = this.el.querySelectorAll('option, optgroup');

    const nodes = Array.from(allNodes);
    this.options = nodes.map((node: HTMLOptionElement | HTMLOptGroupElement, index) => {
      if (node.nodeName.toLowerCase() === 'optgroup') {
        return (
          <Fragment>
            {/* adding data-optgroup attribute to identify this element as an optgroup header
             * assigning unique id to reference in va-combo-box-library.js while transforming options to <li> elements
             */}
            <option data-optgroup="true" id={'optgroup-' + index}>
              {node.label}
            </option>

            {/* iterate through all children <option> elements within an <optgroup>
             * assign specific attributes
             * add aria-described bto associate <option> with an <optgroup> for SR */}
            {Array.from(node.children).map((child: HTMLOptionElement) => {
              return (
                <option
                  value={child.value}
                  selected={value === child.value}
                  data-optgroup-option="true"
                  aria-describedby={'optgroup-' + index}
                >
                  {child.text}
                </option>
              );
            })}
          </Fragment>
        );
      } else if (
        node.nodeName.toLowerCase() === 'option' &&
        node.parentElement.nodeName.toLowerCase() !== 'optgroup'
      ) {
        {
          /* handling <option> elements that are not nested within <optgroup> element */
        }
        return (
          <option
            value={(node as HTMLOptionElement).value}
            selected={value === (node as HTMLOptionElement).value}
          >
            {node.textContent}
          </option>
        );
      }
    });
  }

  private handleChange(e: Event) {
    const target: HTMLSelectElement = e.target as HTMLSelectElement;
    this.value = target.value;
    this.vaSelect.emit({ value: this.value });
  }

  @Listen('input')
  handleInput() {
    // remove the flag icon inside the input when the country changes
    manageFlagIcon.bind(this)();
  }

  componentDidRender() {
    // update the input with truncated country name and matching flag after country is chosen
    if (this.isInVaInputTelephone) {
      handleRerender.bind(this)();
    }
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
      showInputError,
    } = this;
    const labelClass = classnames({
      'usa-label': true,
      'usa-label--error': error,
    });
    const comboBoxContainerClass = classnames({
      'usa-combo-box': true,
      'input-telephone-wrapper': this.isInVaInputTelephone
    })
    return (
      <Host>
        <label htmlFor="options" class={labelClass} id="options-label" part="label">
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
          {showInputError && error && (
            <Fragment>
              <span class="usa-sr-only">{i18next.t('error')}</span>
              <span class="usa-error-message">{error}</span>
            </Fragment>
          )}
        </span>
        <slot onSlotchange={() => this.populateOptions()}></slot>
        <div
          class={comboBoxContainerClass}
          data-default-value={value}
          data-placeholder={placeholder}
          data-error={!!error}
        >
          <select
            class="usa-select"
            name={name}
            id="options"
            onChange={e => this.handleChange(e)}
            disabled={disabled}
          >
            {this.options}
          </select>
        </div>
        {isMessageSet(messageAriaDescribedby) && (
          <span id="input-message" class="usa-sr-only dd-privacy-hidden">
            {messageAriaDescribedby}
          </span>
        )}
      </Host>
    );
  }
}
