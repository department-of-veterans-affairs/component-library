import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  Host,
  Listen,
  Prop,
  h,
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
 * @vaChange The event emitted when the input value changes.
 * @componentName Checkbox group
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref form/checkbox
 * @translations English
 * @translations Spanish
 * @translations Tagalog
 */
@Component({
  tag: 'va-checkbox-group',
  styleUrl: 'va-checkbox-group.scss',
  shadow: true,
})
export class VaCheckboxGroup {
  @Element() el: HTMLElement;

  /**
   * The text label for the checkbox group.
   */
  @Prop() label!: string;

  /**
   * Whether or not this input field is required.
   */
  @Prop() required?: boolean = false;

  /**
   * A string with an error message.
   */
  @Prop() error?: string;

  /**
   * Whether or not an analytics event will be fired.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * Optional hint text.
   */
  @Prop() hint?: string;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;

  /**
   * Insert a header with defined level inside the label (legend)
   */
  @Prop() labelHeaderLevel?: string;

  /**
   * The event used to track usage of the component. This is emitted when an
   * input value changes and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  @Listen('vaChange')
  vaChangeHandler(event: CustomEvent): void {
    const clickedItem = event.target as HTMLVaCheckboxElement;
    if (this.enableAnalytics) this.fireAnalyticsEvent(clickedItem.label);
  }

  private fireAnalyticsEvent(optionLabel) {
    this.componentLibraryAnalytics.emit({
      componentName: 'va-checkbox-group',
      action: 'change',
      details: {
        label: this.label,
        optionLabel,
        required: this.required,
      },
    });
  }

  private getHeaderLevel() {
    const number = parseInt(this.labelHeaderLevel, 10);
    return number >= 1 && number <= 6 ? `h${number}` : null;
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
    const { label, required, error, hint, uswds } = this;
    const HeaderLevel = this.getHeaderLevel();

    if (uswds) {
      const legendClass = classnames({
        'usa-legend': true,
        'usa-label--error': error
      });
      return (
        <Host role="group">
          <fieldset class="usa-fieldset">
            <legend class={legendClass}>
              {HeaderLevel ? (
                <HeaderLevel part="header">{label}</HeaderLevel>
              ) : (
                label
              )}&nbsp;
              {required && <span class="usa-label--required">{i18next.t('required')}</span>}
            </legend>
            {hint && <span class="usa-hint">{hint}</span>}
            <span id="checkbox-error-message" role="alert">
              {error && (
                <Fragment>
                  <span class="usa-sr-only">{i18next.t('error')}</span>
                  <span class="usa-error-message">{error}</span>
                </Fragment>
              )}
            </span>
            <slot></slot>
          </fieldset>
        </Host>
      )
    } else  {
      return (
        <Host role="group">
          <fieldset>
            <legend>
              {HeaderLevel ? (
                <HeaderLevel part="header">{label}</HeaderLevel>
              ) : (
                label
              )}
              {required && (
                <span class="required">{i18next.t('required')}</span>
              )}
            </legend>
            {hint && <span class="hint-text">{hint}</span>}
            <span id="error-message" role="alert">
              {error && (
                <Fragment>
                  <span class="sr-only">{i18next.t('error')}</span> {error}
                </Fragment>
              )}
            </span>
            <slot></slot>
          </fieldset>
        </Host>
      );
    }
  }
}
