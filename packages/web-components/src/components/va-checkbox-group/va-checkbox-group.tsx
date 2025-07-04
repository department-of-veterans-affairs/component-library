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
import { i18next } from '../..';
import { Build } from '@stencil/core';
import { getHeaderLevel, isMessageSet } from '../../utils/utils';

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
   * Optional text that will be read by screen readers in addition to the label text.
  */
  @Prop() labelSrOnly?: string;

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
   * Insert a header with defined level inside the label (legend)
   */
  @Prop() labelHeaderLevel?: string;
  /**
   * An optional message that will be read by screen readers when a checkbox is focused.
   */
  @Prop() messageAriaDescribedby?: string;
  /**
   * Enabling this will add a heading and description for integrating into the forms pattern. Accepts `single` or `multiple` to indicate if the form is a single input or will have multiple inputs.
   */
  @Prop() useFormsPattern?: string;

  /**
   * The heading level for the heading if `useFormsPattern` is true.
   */
  @Prop() formHeadingLevel?: number = 3;

  /**
   * The content of the heading if `useFormsPattern` is true.
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

  @Listen('resize', { target: 'window' })
  handleResize() {
    forceUpdate(this);
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
    const {
      label,
      required,
      error,
      hint,
      messageAriaDescribedby,
      useFormsPattern,
      formHeadingLevel,
      formHeading,
      labelSrOnly
    } = this;
    const HeaderLevel = this.getHeaderLevel();
    const ariaLabeledByIds =
      `${useFormsPattern && formHeading ? 'form-question' : ''} ${
        useFormsPattern ? 'form-description' : ''
      } ${useFormsPattern === 'multiple' ? 'header-message' : ''}`.trim() ||
      null;
    const messageAriaDescribedbyId = messageAriaDescribedby
      ? 'description-message'
      : null;

    const legendClass = classnames({
      'usa-legend': true,
      'usa-label--error': error,
      'usa-sr-only': this.el.classList.contains('va-search-filter__checkbox-group')
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
            <legend
              class={legendClass}
              aria-describedby={messageAriaDescribedbyId}
              part="legend"
            >
              {HeaderLevel ? (
                <HeaderLevel part="header">{label}</HeaderLevel>
              ) : (
                label
              )}
              &nbsp;
              {useFormsPattern === 'multiple' && (
                <span id="header-message" class="usa-sr-only">
                  {label}
                </span>
              )}
              {labelSrOnly && <span class="usa-sr-only">{labelSrOnly}</span>}
              {isMessageSet(messageAriaDescribedby) && (
                <span id="description-message" class="usa-sr-only">
                  {messageAriaDescribedby}
                </span>
              )}
              {required && (
                <span class="usa-label--required">{i18next.t('required')}</span>
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
  }
}
