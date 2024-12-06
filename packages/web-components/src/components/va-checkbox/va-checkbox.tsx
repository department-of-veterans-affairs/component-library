import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  Host,
  h,
  Prop,
  Fragment,
} from '@stencil/core';
import classnames from 'classnames';
import { i18next } from '../..';
import { Build } from '@stencil/core';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

/**
 * @nativeHandler onBlur
 * @componentName Checkbox
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref form/checkbox
 * @translations English
 * @translations Spanish
 * @translations Tagalog
 */
@Component({
  tag: 'va-checkbox',
  styleUrl: 'va-checkbox.scss',
  shadow: true,
})
export class VaCheckbox {
  @Element() el: HTMLElement;

  /**
   * The event emitted when the input value changes.
   */
  @Event() vaChange: EventEmitter;

  /**
   * The label for the checkbox.
   */
  @Prop() label!: string;

  /**
   * The error message to render.
   */
   @Prop({ reflect: true }) error?: string;

  /**
   * The description to render. If this prop exists, va-checkbox will render it
   * instead of the named slot.
   */
  @Prop() description?: string;

  /**
   * Set the input to required and render the (Required) text.
   */
  @Prop() required?: boolean = false;

  /**
   * True if the analytics event should fire.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * Whether the checkbox is checked or not.
   *
   * Note: Because this isn't reflective, vaCheckbox.getAttribute('checked')
   * will not reflect the correct value. Use the property vaCheckbox.checked
   * instead.
   */
  @Prop({ mutable: true }) checked?: boolean = false;

  /**
   * Optional hint text.
   */
   @Prop() hint?: string;

  /**
   * Whether or not the component will display as a tile.
   */
  @Prop() tile?: boolean = false;

  /**
   * Description of the option displayed below the checkbox label.
   */
  @Prop() checkboxDescription?: string;

  /**
   * Whether or not the checkbox option is disabled.
   */
  @Prop() disabled?: boolean = false;

  /**
   * An optional message that will be read by screen readers when the checkbox is focused.
   */
  @Prop() messageAriaDescribedby?: string;

  /**
   * The name to pass to the checkbox element.
   */
  @Prop() name?: string;

  /**
   * When true, the checkbox can be toggled between checked and indeterminate states.
   */
  @Prop() indeterminate?: boolean = false;

  /**
   * The event used to track usage of the component. This is emitted when the
   * input value changes and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private fireAnalyticsEvent = () => {
    // Either the description prop or the text content of the description slots
    const description =
      this.description ||
      [
        // This won't work in IE
        ...(
          this.el.shadowRoot.querySelector(
            'slot[name="description"]',
          ) as HTMLSlotElement
        )?.assignedNodes(),
        // For IE
        ...Array.from(
          this.el.shadowRoot.querySelectorAll('[slot="description"]'),
        ),
      ]
        .map(n => n.textContent)
        .join(' ');

    this.componentLibraryAnalytics.emit({
      componentName: 'va-checkbox',
      action: 'change',
      details: {
        label: this.label,
        description,
        required: this.required,
        checked: this.checked,
      },
    });
  };

  private handleChange = (e: Event) => {
    this.checked = (e.target as HTMLInputElement).checked;
    this.vaChange.emit({ checked: this.checked });
    if (this.enableAnalytics) this.fireAnalyticsEvent();
  };

  /**
   * Primarily for a11y; input.indeterminate must be set with JavaScript,
   * there is no HTML attribute for this.
   */
  private updateIndeterminateInput() {
    const input = this.el.shadowRoot.querySelector('input');
    if (!this.checked) {
      input.indeterminate = true;
    } else {
      input.indeterminate = false;
    }
  }

  componentDidUpdate() {
    if (this.indeterminate) {
      this.updateIndeterminateInput();
    }
  }

  componentDidLoad() {
    if (this.indeterminate) {
      this.updateIndeterminateInput();
    }
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
      error,
      label,
      required,
      description,
      checked,
      hint,
      tile,
      checkboxDescription,
      disabled,
      messageAriaDescribedby,
      name,
      indeterminate,
    } = this;
    const hasDescriptionSlot =
      !description &&
      this.el.querySelectorAll('[slot="description"]:not(:empty)').length > 0;

    const inputClass = classnames({
      'usa-checkbox__input': true,
      'usa-checkbox__input--tile': tile,
    });
    const descriptionClass = classnames({
      'usa-legend': true,
      'usa-label--error': error
    });
    const ariaDescribedbyIds = [
      messageAriaDescribedby ? 'input-message' : '',
      error ? 'checkbox-error-message' : '',
      description || hasDescriptionSlot ? 'description' : '',
      // Return null so we don't add the attribute if we have an empty string
    ].filter(Boolean).join(' ').trim() || null;
    const ariaChecked = checked ? 'true' : 'false';

    return (
      <Host>
        {description && (
          <legend id="description" class={descriptionClass}>
            {description}
          </legend>
        )}
        {hasDescriptionSlot && (
          <div id="description">
            <slot name="description" />
          </div>
        )}

        {hint && <span class="usa-hint">{hint}</span>}
        <span id="checkbox-error-message" role="alert">
          {error && (
            <Fragment>
              <span class="usa-sr-only">{i18next.t('error')}</span>
              <span class="usa-error-message">{error}</span>
            </Fragment>
          )}
        </span>
        <div class="usa-checkbox" part="checkbox">
          <input
            class={inputClass}
            type="checkbox"
            name={name || null}
            id="checkbox-element"
            checked={checked}
            aria-describedby={ariaDescribedbyIds}
            aria-invalid={error ? 'true' : 'false'}
            disabled={disabled}
            data-indeterminate={indeterminate && !checked}
            onChange={this.handleChange}
          />
          <label
            htmlFor="checkbox-element"
            class="usa-checkbox__label"
            part="label"
            role="checkbox"
            aria-checked={indeterminate && !checked ? 'mixed' : ariaChecked}
          >
            {label}&nbsp;
            {required && (
              <span class="usa-label--required">{i18next.t('required')}</span>
            )}
            {checkboxDescription && (
              <span class="usa-checkbox__label-description" part="description">
                {checkboxDescription}
              </span>
            )}
          </label>
          {messageAriaDescribedby && (
            <span id="input-message" class="usa-sr-only dd-privacy-hidden">
              {messageAriaDescribedby}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
