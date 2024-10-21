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
import { getSlottedNodes } from '../../utils/utils';
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

  @State() labelNode: Node;

  /**
   * Whether or not this is a required field.
   */
  @Prop() required?: boolean = false;

  /**
   * Text label for the field.
   */
  @Prop() label!: string;

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

  componentDidRender() {
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
    const { value } = this;

    // Get all slotted nodes
    const allNodes = getSlottedNodes(this.el, null);

    this.labelNode = allNodes.find(
      (node: Node) => node.nodeName.toLowerCase() === 'label',
    );

    // Filter nodes to include only <option> and <optgroup>
    // supports scenario where <option> may be slotted within <optgroup> as well as <option> directly
    // preserving the order of the nodes as they are slotted
    const nodes = allNodes.filter((node: Node) => {
      const nodeName = node.nodeName.toLowerCase();
      return nodeName === 'option' || nodeName === 'optgroup';
    });

    this.options = nodes.map(
      (node: HTMLOptionElement | HTMLOptGroupElement) => {
        if (node.nodeName.toLowerCase() === 'optgroup') {
          return (
            <optgroup label={node.label}>
              {Array.from(node.children).map((child: HTMLOptionElement) => {
                return (
                  <option value={child.value} selected={value === child.value}>
                    {child.text}
                  </option>
                );
              })}
            </optgroup>
          );
        } else if (node.nodeName.toLowerCase() === 'option') {
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

  @Watch('value')
  handleValueChange() {
    this.populateOptions();
  }

  render() {
    // const {
    //   error,
    //   reflectInputError,
    //   invalid,
    //   label,
    //   required,
    //   name,
    //   hint,
    //   messageAriaDescribedby,
    //   width,
    //   showError,
    // } = this;

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
        <label class="usa-label" htmlFor="fruit">
          Select a fruit
        </label>
        <div class="usa-combo-box">
          <select class="usa-select" name="fruit" id="fruit">
            {/* <option>Select a fruit</option> */}
            {/* {this.options} */}
            <option value="apple">Apple</option>
            <option value="apricot">Apricot</option>
            <option value="avocado">Avocado</option>
            <option value="banana">Banana</option>
            <option value="blackberry">Blackberry</option>
            <option value="blood orange">Blood orange</option>
            <option value="blueberry">Blueberry</option>
            <option value="boysenberry">Boysenberry</option>
            <option value="breadfruit">Breadfruit</option>
          </select>
          <input
            id="fruit"
            aria-owns="fruit--list"
            aria-controls="fruit--list"
            aria-autocomplete="list"
            aria-expanded="false"
            autocapitalize="off"
            autocomplete="off"
            class="usa-combo-box__input"
            type="text"
            role="combobox"
          />
          <span class="usa-combo-box__clear-input__wrapper" tabindex="-1">
            <button
              type="button"
              class="usa-combo-box__clear-input"
              aria-label="Clear the select contents"
            >
              &nbsp;
            </button>
          </span>
          <span class="usa-combo-box__input-button-separator">&nbsp;</span>
          <span class="usa-combo-box__toggle-list__wrapper" tabindex="-1">
            <button
              type="button"
              tabindex="-1"
              class="usa-combo-box__toggle-list"
              aria-label="Toggle the dropdown list"
            >
              &nbsp;
            </button>
          </span>
          <ul
            tabindex="-1"
            id="fruit--list"
            class="usa-combo-box__list"
            role="listbox"
            aria-labelledby="fruit-label"
          ></ul>
          <div class="usa-combo-box__status usa-sr-only" role="status"></div>
        </div>
      </Host>
    );
  }
}
