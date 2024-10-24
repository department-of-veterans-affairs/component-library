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
 * @nativeHandler onKeyDown
 * @componentName Combo Box
 * @maturityCategory dont_use
 * @maturityLevel proposed
 * @guidanceHref form/select
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
   * Whether or not `aria-invalid` will be set on the inner select. Useful when
   * composing the component into something larger, like a date component.
   */
  @Prop() invalid?: boolean = false;

  /**
   * Whether or not to fire the analytics events
   */
  @Prop() enableAnalytics?: boolean = false;

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

  /**
   * Whether an error message should be shown - set to false when this component is used inside va-date or va-memorable-date
   * in which the error for the va-select will be rendered outside of va-select
   */
  @Prop() showError?: boolean = true;

  /**
   * The event used to track usage of the component. This is emitted when an
   * option is selected and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
    if (!this.label) {
      throw new Error('va-combo-box: label is a required property');
    }
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
    const allNodes = this.el.querySelectorAll('option');

    return Array.from(allNodes).map(
      (node: HTMLOptionElement | HTMLOptGroupElement) => {
        return (
          <option value={(node as HTMLOptionElement).value}>
            {node.textContent}
          </option>
        );
      },
    );
  }

  private handleChange(e: Event) {
    const target: HTMLSelectElement = e.target as HTMLSelectElement;
    this.value = target.value;

    if (this.enableAnalytics) {
      const detail = {
        componentName: 'va-combo-box',
        action: 'change',
        details: {
          label: this.label,
          selectLabel: this.value,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
    this.vaSelect.emit({ value: this.value });
  }

  render() {
    const {
      error,
      invalid,
      value,
      disabled,
      placeholder,
      label,
      required,
      //   name,
      //   hint,
      //   messageAriaDescribedby,
      showError,
    } = this;

    const errorID = 'input-error-message';
    // const ariaDescribedbyIds =
    //   `${messageAriaDescribedby ? 'input-message' : ''} ${
    //     error ? errorID : ''
    //   } ${hint ? 'input-hint' : ''}`.trim() || null; // Null so we don't add the attribute if we have an empty string
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
        <span id={errorID} role="alert">
          {showError && error && (
            <Fragment>
              <span class="usa-sr-only">{i18next.t('error')}</span>
              <span class="usa-error-message">{error}</span>
            </Fragment>
          )}
        </span>
        <div
          class="usa-combo-box"
          data-default-value={value}
          data-placeholder={placeholder}
        >
          <select
            class="usa-select"
            name="options"
            id="options"
            onChange={e => this.handleChange(e)}
            disabled={disabled}
          >
            {this.populateOptions()}
          </select>
        </div>
      </Host>
    );
  }
}
