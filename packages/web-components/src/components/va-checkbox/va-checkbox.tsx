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
   * The event emitted when the input value changes.
   */
  @Event() vaChange: EventEmitter;

  /**
   * Optional hint text.
   */
   @Prop() hint?: string;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;

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
      uswds } = this;

    if (uswds) {
      return (
        <Host>
          <div id="description" class="usa-legend">
            {description ? <span>{description}</span> : <slot name="description" />}
          </div>
          {hint && <span class="usa-hint">{hint}</span>}
          <span id="checkbox-error-message" role="alert">
            {error && (
              <Fragment>
                <span class="usa-sr-only">{i18next.t('error')}</span> 
                <span class="usa-error-message">{error}</span>
              </Fragment>
            )}
          </span>
          <div class="usa-checkbox">
            <input
              class="usa-checkbox__input"
              type="checkbox"
              id="checkbox-element"
              checked={checked}
              aria-describedby={error ? 'checkbox-error-message' : undefined}
              aria-invalid={error ? 'true' : 'false'}
              onChange={this.handleChange}
            />
            <label htmlFor="checkbox-element" class="usa-checkbox__label">
              {label} {required && <span class="usa-label--required">{i18next.t('required')}</span>}
            </label>
          </div>
        </Host>
      );
    } else {
      return (
        <Host>
          <div id="description">
            {description ? <p>{description}</p> : <slot name="description" />}
          </div>
          {hint && <span class="hint-text">{hint}</span>}
          <span id="error-message" role="alert">
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
            aria-describedby={error ? 'error-message' : undefined}
            aria-invalid={error ? 'true' : 'false'}
            onChange={this.handleChange}
          />
          <label htmlFor="checkbox-element">
            <span>
              {label} {required && <span class="required">{i18next.t('required')}</span>}
            </span>
          </label>
        </Host>
      );
    }
  }
}
