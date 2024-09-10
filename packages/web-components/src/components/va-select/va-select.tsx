import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  Host,
  Prop,
  State,
  h,
  Watch,
  Fragment,
} from '@stencil/core';
import classnames from 'classnames';
import { i18next } from '../..';
import { getSlottedNodes } from '../../utils/utils';

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
  tag: 'va-select',
  styleUrl: 'va-select.scss',
  shadow: true,
})
export class VaSelect {
  @Element() el: any;

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

  @State() options: Array<Node>;

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

  private handleKeyDown() {
    this.vaKeyDown.emit();
  }

  private handleChange(e: Event) {
    const target: HTMLSelectElement = e.target as HTMLSelectElement;
    this.value = target.value;

    if (this.enableAnalytics) {
      const detail = {
        componentName: 'va-select',
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

  /**
   * This function is for taking the slotted content and rendering
   * it inside the `<select>` element. Putting the `<slot>` directly
   * inside the `<select>` doesn't actually show the `<option>` elements,
   * but this solves that problem.
   */
  private populateOptions() {
    const { value } = this;

    this.options = getSlottedNodes(this.el, 'option').map(
      (node: HTMLOptionElement) => {
        return (
          <option value={node.value} selected={value === node.value}>
            {node.text}
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
    const { error, reflectInputError, invalid, label, required, name, hint, messageAriaDescribedby, width, showError } = this;

    const errorID = 'input-error-message';
    const ariaDescribedbyIds = 
      `${messageAriaDescribedby ? 'input-message' : ''} ${
        error ? errorID : ''} ${
        hint ? 'input-hint' : ''}`.trim() || null; // Null so we don't add the attribute if we have an empty string
    
    const labelClass = classnames({
      'usa-label': true,
      'usa-label--error': error,
    });
    const selectClass = classnames({
      'usa-select': true,
      'usa-input--error': error || reflectInputError,
      [`usa-input--${width}`]: width,
    });
    return (
      <Host>
        {label && (
          <label htmlFor="options" class={labelClass} part="label">
            {label}
            {required && <span class="usa-label--required"> {i18next.t('required')}</span>}
          </label>
        )}
        {hint && <span class="usa-hint" id="input-hint">{hint}</span>}
        <span id={errorID} role="alert">
          {showError && error && (
            <Fragment>
              <span class="usa-sr-only">{i18next.t('error')}</span> 
              <span class="usa-error-message">{error}</span>
            </Fragment>
          )}
        </span>
        <slot onSlotchange={() => this.populateOptions()}></slot>
        <select
          class={selectClass}
          aria-describedby={ariaDescribedbyIds}
          aria-invalid={invalid || error ? 'true' : 'false'}
          id="options"
          name={name}
          required={required || null}
          onKeyDown={() => this.handleKeyDown()}
          onChange={e => this.handleChange(e)}
          part="select"
        >
          <option key="0" value="" selected>{i18next.t('select')}</option>
          {this.options}
        </select>
        {messageAriaDescribedby && (
          <span id="input-message" class="usa-sr-only dd-privacy-hidden">
            {messageAriaDescribedby}
          </span>
        )}
      </Host>
    )
  }
}
