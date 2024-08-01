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
import { getHeaderLevel } from '../../utils/utils';

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
  @Prop() uswds?: boolean = true;

  /**
   * Insert a header with defined level inside the label (legend)
   */
  @Prop() labelHeaderLevel?: string;
  /**
   * Enabling this will add a heading and description for integrating into the forms pattern. Accepts `single` or `multiple` to indicate if the form is a single input or will have multiple inputs. `uswds` should be true.
   */
  @Prop() useFormsPattern?: string;

  /**
   * The heading level for the heading if `useFormsPattern` and `uswds` are true.
   */
  @Prop() formHeadingLevel?: number = 3;

  /**
   * The content of the heading if `useFormsPattern` and `uswds` are true.
   */
  @Prop() formHeading?: string;

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

  private fireAnalyticsEvent(optionLabel): void {
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

  private getHeaderLevel(): string | null {
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
    const {
      label,
      required,
      error,
      hint,
      uswds,
      useFormsPattern,
      formHeadingLevel,
      formHeading,
    } = this;
    const HeaderLevel = this.getHeaderLevel();
    const ariaLabeledByIds =
      `${useFormsPattern && formHeading ? 'form-question' : ''} ${
        useFormsPattern ? 'form-description' : ''
      } ${useFormsPattern === 'multiple' ? 'header-message' : ''}`.trim() ||
      null;

    if (uswds) {
      const legendClass = classnames({
        'usa-legend': true,
        'usa-label--error': error,
      });
      const isFormsPattern =
        useFormsPattern === 'single' || useFormsPattern === 'multiple'
          ? true
          : false;

      let formsHeading = null;
      if (isFormsPattern) {
        const HeaderLevel = getHeaderLevel(formHeadingLevel);
        formsHeading = (
          <Fragment>
            {formHeading && (
              <HeaderLevel id="form-question" part="form-header">
                {formHeading}
              </HeaderLevel>
            )}
            <div id="form-description">
              <slot name="form-description"></slot>
            </div>
          </Fragment>
        );
      }

      return (
        <Host role="group">
          {formsHeading}
          <div class="input-wrap">
            <fieldset class="usa-fieldset" aria-labelledby={ariaLabeledByIds}>
              <legend class={legendClass}>
                {HeaderLevel ? (
                  <HeaderLevel part="header">{label}</HeaderLevel>
                ) : (
                  label
                )}
                &nbsp;
                {useFormsPattern === 'multiple' && (
                  <span id="header-message" class="sr-only">
                    {label}
                  </span>
                )}
                {required && (
                  <span class="usa-label--required">
                    {i18next.t('required')}
                  </span>
                )}
                {hint && <div class="usa-hint">{hint}</div>}
              </legend>
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
          </div>
        </Host>
      );
    } else {
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
              {hint && <div class="hint-text">{hint}</div>}
            </legend>

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
