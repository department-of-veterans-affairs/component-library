import { Component, Element, Fragment, Host, Prop, h } from '@stencil/core';
import { getHeaderLevel } from '../../utils/utils';
import { i18next } from '../..';

/**
 * @componentName Card Status
 * @maturityCategory use
 * @maturityLevel deployed
 */

@Component({
  tag: 'va-card-status',
  styleUrl: 'va-card-status.scss',
  shadow: true,
})
export class VaCard {
  @Element() el: HTMLElement;

  /**
   * Header level. Must be between 1 and 6
   */
  @Prop() headingLevel?: number = 3;

  /**
   * Text to be displayed in the card header.
   */
  @Prop() headingText: string;

  /**
   * Text to be displayed in the card subheader. 
   * Heading level will be +1 of headingLevel Prop.
   */
  @Prop() subHeaderText: string;

  /**
   * Sets the card to required and renders the (*Required) text.
   */
  @Prop() required?: boolean = false;

  /**
   * The status variant of the tag. Determines the background color and icon.
   */
  @Prop({ reflect: true, mutable: true }) tagStatus: 'informational' | 'error' =
    'informational';

  /**
   * The text to be displayed in the tag element.
   */
  @Prop() tagText?: string;

  /**
   * The error message to render.
   */
  @Prop({ reflect: true, mutable: true }) errorMessage?: string;

  /**
   * Set the href for the card link.
   */
  @Prop() linkHref: string;
  /**
   *
   * Set the text for the card link.
   */
  @Prop() linkText: string;

  render() {
    const {
      el,
      headingLevel,
      headingText,
      subHeaderText,
      tagStatus,
      tagText,
      errorMessage,
      linkHref,
      linkText,
      required,
    } = this;

    const ariaDescribedbyIds = `${
      errorMessage ? 'card-status-error-message' : ''
    }`;

    // Create a headers element
    const HeaderLevel = getHeaderLevel(headingLevel);
    const SubHeaderLevel = getHeaderLevel(headingLevel + 1);

    //Checking if error message exists to display message and enter error state
    if (errorMessage) {
      el.setAttribute('error', errorMessage);
    } else if (!errorMessage) {
      el.setAttribute('error', '');
    }

    const requiredSpan = required && (
      <span class="required"> {i18next.t('required')}</span>
    );

    return (
      <Host>
        <div class="va-card-status__wrapper">
          <va-card>
              <header aria-label={`${tagText}: ${headingText} ${subHeaderText}`}>
                  <HeaderLevel class="va-card-status__header">
                    {tagText && (
                      <div>
                        <va-tag-status status={tagStatus} text={tagText} />
                      </div>
                    )}
                    <span id="va-card-status_card-title">{headingText}</span>
                    {requiredSpan}
                  </HeaderLevel>
                  {subHeaderText && (
                    <SubHeaderLevel class="va-card-status__subheader">
                      {subHeaderText}
                    </SubHeaderLevel>
                  )}
              </header>
              <span id="card-status-error-message" role="alert">
                {errorMessage && (
                  <Fragment>
                    <span class="usa-sr-only">{i18next.t('error')}</span>
                    <span class="usa-error-message">{errorMessage}</span>
                  </Fragment>
                )}
              </span>
              <slot></slot>
              <va-link-action
                messageAriaDescribedby={errorMessage}
                aria-describedby={ariaDescribedbyIds}
                type='secondary'
                href={linkHref}
                text={linkText}
              /> 
          </va-card>
        </div>
      </Host>
    );
  }
}
