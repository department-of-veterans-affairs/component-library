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
import i18next from 'i18next';
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
   * Whether or not the component will display as a tile. Available when uswds is true.
   */
  @Prop() tile?: boolean = false;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop({ reflect: true }) uswds?: boolean = true;

  /**
   * Description of the option displayed below the checkbox label. Available when uswds is true.
   */
  @Prop() checkboxDescription?: string;

  /**
   * Whether or not the checkbox option is disabled. Available when uswds is true.
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
   * The event used to track usage of the component. This is emitted when the
   * input value changes and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private fireAnalyticsEvent = (): void => {
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

  private handleChange = (e: Event): void => {
    this.checked = (e.target as HTMLInputElement).checked;
    this.vaChange.emit({ checked: this.checked });
    if (this.enableAnalytics) this.fireAnalyticsEvent();
  };

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

  componentDidLoad() {
    // check if the element has a class named uswds-false added from parent
    if (this.el.classList.contains('uswds-false')) {
      // add attribute manually
      this.el.setAttribute('uswds', 'false');
    }
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
      uswds,
      checkboxDescription,
      disabled,
      messageAriaDescribedby,
      name,
    } = this;

    const hasDescription =
      description || !!this.el.querySelector('[slot="description"]');

    if (uswds) {
      const inputClass = classnames({
        'usa-checkbox__input': true,
        'usa-checkbox__input--tile': tile,
      });
      const descriptionClass = classnames({
        'usa-legend': true,
        'usa-label--error': error,
      });
      const ariaDescribedbyIds =
        [
          messageAriaDescribedby ? 'input-message' : '',
          error ? 'checkbox-error-message' : '',
          hasDescription ? 'description' : '',
          // Return null so we don't add the attribute if we have an empty string
        ]
          .filter(Boolean)
          .join(' ')
          .trim() || null;

      return (
        <Host>
          {description ? (
            <legend id="description" class={descriptionClass}>
              {description}
            </legend>
          ) : (
            <slot name="description" />
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
              onChange={this.handleChange}
            />
            <label
              htmlFor="checkbox-element"
              id="option-label"
              class="usa-checkbox__label"
              part="label"
            >
              {label}&nbsp;
              {required && (
                <span class="usa-label--required">{i18next.t('required')}</span>
              )}
              {checkboxDescription && (
                <span
                  class="usa-checkbox__label-description"
                  aria-describedby="option-label"
                  part="description"
                >
                  {checkboxDescription}
                </span>
              )}
            </label>
            {messageAriaDescribedby && (
              <span id="input-message" class="sr-only dd-privacy-hidden">
                {messageAriaDescribedby}
              </span>
            )}
          </div>
        </Host>
      );
    } else {
      const ariaDescribedbyIds =
        [
          messageAriaDescribedby ? 'input-message' : '',
          error ? 'checkbox-error-message' : '',
          hasDescription ? 'description' : '',
          // Return null so we don't add the attribute if we have an empty string
        ]
          .filter(Boolean)
          .join(' ')
          .trim() || null;
      return (
        <Host>
          <div id="description">
            {description ? <p>{description}</p> : <slot name="description" />}
          </div>
          {hint && <span class="hint-text">{hint}</span>}
          <span
            id="checkbox-error-message"
            class="usa-error-message"
            role="alert"
          >
            {error && (
              <Fragment>
                <span class="sr-only">{i18next.t('error')}</span> {error}
              </Fragment>
            )}
          </span>
          <input
            type="checkbox"
            id="checkbox-element"
            checked={checked}
            aria-describedby={ariaDescribedbyIds}
            aria-invalid={error ? 'true' : 'false'}
            onChange={this.handleChange}
          />
          <label htmlFor="checkbox-element">
            <span>
              {label}{' '}
              {required && (
                <span class="required">{i18next.t('required')}</span>
              )}
            </span>
          </label>
          {messageAriaDescribedby && (
            <span id="input-message" class="sr-only dd-privacy-hidden">
              {messageAriaDescribedby}
            </span>
          )}
        </Host>
      );
    }
  }
}
