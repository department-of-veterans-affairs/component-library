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
import i18next from 'i18next';
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
   * Whether or not `aria-invalid` will be set on the inner select. Useful when
   * composing the component into something larger, like a date component.
   */
  @Prop() invalid?: boolean = false;

  /**
   * Whether or not to fire the analytics events
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;

  /**
   * Optional hint text.
   */
  @Prop() hint?: string;

  /**
   * The event attached to select's onkeydown
   */
  @Event() vaKeyDown: EventEmitter;

  /**
   * The event emitted when the selected value changes
   */
  @Event() vaSelect: EventEmitter;

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
    const { error, invalid, label, required, name, hint, uswds } = this;

    if (uswds) {
      const labelClass = classnames({
        'usa-label': true,
        'usa-label--error': error,
      });
      const selectClass = classnames({
        'usa-select': true,
        'usa-input--error': error,
      });
      return (
        <Host>
          {label && (
            <label htmlFor="select" class={labelClass} part="label">
              {label}
              {required && <span class="usa-label--required"> {i18next.t('required')}</span>}
            </label>
          )}
          {hint && <span class="usa-hint">{hint}</span>}
          <span id="usa-error-message" role="alert">
            {error && (
              <Fragment>
                <span class="usa-sr-only">{i18next.t('error')}</span> 
                <span class="usa-error-message">{error}</span>
              </Fragment>
            )}
          </span>
          <slot onSlotchange={() => this.populateOptions()}></slot>
          <select
            class={selectClass}
            aria-describedby={error ? 'error-message' : undefined}
            aria-invalid={invalid || error ? 'true' : 'false'}
            id="select"
            name={name}
            required={required || null}
            onKeyDown={() => this.handleKeyDown()}
            onChange={e => this.handleChange(e)}
            part="select"
          >
            <option value="" selected>{i18next.t('select')}</option>
            {this.options}
          </select>
        </Host>
      )
    } else {
    return (
        <Host>
          <label htmlFor="options" part="label">
            {label}
            {required && <span class="required">{i18next.t('required')}</span>}
          </label>
          {hint && <span class="hint-text">{hint}</span>}
          <span id="error-message" role="alert">
            {error && (
              <Fragment>
                <span class="sr-only">{i18next.t('error')}</span> {error}
              </Fragment>
            )}
          </span>
          <slot onSlotchange={() => this.populateOptions()}></slot>
          <select
            aria-describedby={error ? 'error-message' : undefined}
            aria-invalid={invalid || error ? 'true' : 'false'}
            id="options"
            name={name}
            required={required || null}
            onKeyDown={() => this.handleKeyDown()}
            onChange={e => this.handleChange(e)}
            part="select"
          >
            {this.options}
          </select>
        </Host>
      );
    };
  }
}
