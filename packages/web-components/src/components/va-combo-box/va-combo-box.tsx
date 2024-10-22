import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  Host,
  Prop,
  h,
  Watch,
  State,
  //   Fragment,
} from '@stencil/core';
// import classnames from 'classnames';
import { i18next } from '../..';
import comboBox from '@uswds/uswds/packages/usa-combo-box/src';

/**
 * @nativeHandler onKeyDown
 * @componentName Select
 * @maturityCategory use
 * @maturityLevel deployed
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

  @Prop() defaultValue?: string;

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
   * Whether or not to add usa-input--error as class if error message is outside of component
   */
  @Prop() reflectInputError?: boolean = false;

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
   * The event attached to select's onkeydown
   */
  @Event() vaKeyDown: EventEmitter;

  /**
   * The event emitted when the selected value changes
   */
  @Event() vaSelect: EventEmitter;

  /**
   * Displays the select at a specific width. Accepts 2xs (4ex), xs (7ex), sm or small (10ex), md or medium (20ex), lg (30ex), xl (40ex), and 2xl (50ex).
   */
  @Prop() width?: string;

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

  componentWillLoad() {
    if (!this.label) {
      throw new Error('va-combo-box: label is a required property');
    } else {
      this.labelNode = document.createElement('label');
      this.labelNode.textContent = this.label;
      this.labelNode.htmlFor = 'options';
      if (this.required) {
        const requiredNode = document.createElement('span');
        requiredNode.textContent = ` ${i18next.t('required')}`;
        requiredNode.classList.add('usa-label--required');
        this.labelNode.appendChild(requiredNode);
      }
      this.el.prepend(this.labelNode);
    }
  }

  componentDidLoad() {
    const comboBoxElement = this.el.shadowRoot.querySelector('.usa-combo-box');
    if (comboBoxElement) {
      comboBox.init(comboBoxElement);
      comboBox.on(comboBoxElement);
    }
  }

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
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

  @Watch('value')
  handleValueChange() {
    this.populateOptions();
  }

  render() {
    const {
      //   error,
      //   reflectInputError,
      //   invalid,
      defaultValue,
      disabled,
      placeholder,
      //   label,
      //   required,
      //   name,
      //   hint,
      //   messageAriaDescribedby,
      //   width,
      //   showError,
    } = this;

    // const errorID = 'input-error-message';
    // const ariaDescribedbyIds =
    //   `${messageAriaDescribedby ? 'input-message' : ''} ${
    //     error ? errorID : ''
    //   } ${hint ? 'input-hint' : ''}`.trim() || null; // Null so we don't add the attribute if we have an empty string

    // const labelClass = classnames({
    //   'usa-label': true,
    //   'usa-label--error': error,
    // });
    // const selectClass = classnames({
    //   'usa-select': true,
    //   'usa-input--error': error || reflectInputError,
    //   [`usa-input--${width}`]: width,
    // });
    return (
      <Host>
        <div
          class="usa-combo-box"
          data-default-value={defaultValue}
          data-placeholder={placeholder}
        >
          <select
            class="usa-select"
            name="options"
            id="options"
            disabled={disabled}
          >
            {this.populateOptions()}
          </select>
        </div>
      </Host>
    );
  }
}
