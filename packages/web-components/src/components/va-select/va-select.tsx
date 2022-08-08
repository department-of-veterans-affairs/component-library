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
import i18next from 'i18next';
import { getSlottedNodes } from '../../utils/utils';

/**
 * @nativeHandler onKeyDown
 */
@Component({
  tag: 'va-select',
  styleUrl: 'va-select.css',
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
    const { error, invalid, label, required, name } = this;

    return (
      <Host>
        <label htmlFor="select" part="label">
          {label}
          {required && <span class="required">{i18next.t('required')}</span>}
        </label>
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
          id="select"
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
  }
}
