import { Component, Fragment, Host, Prop, h } from '@stencil/core';
import { getHeaderLevel } from '../../utils/utils';
import { i18next } from '../..';

/**
 * @componentName Card Status
 * @maturityCategory caution
 * @maturityLevel available
 */

@Component({
  tag: 'va-card-status',
  styleUrl: 'va-card-status.scss',
  shadow: true,
})
export class VaCard {

  /**
   * Header level. Must be between 1 and 6
   */
  @Prop() headerLevel?: number = 3;

  /**
   * Text to be displayed in the card header.
   */
  @Prop() headerText: string;

  /**
   * Text to be displayed in the card subheader. 
   * Heading level will be +1 of headerLevel Prop.
   */
  @Prop() subheaderText: string;

  /**
   * Sets the card to required and renders the (*Required) text.
   */
  @Prop() required?: boolean = false;

  /**
   * The status variant of the tag. Determines the background color and icon.
   */
  @Prop({ reflect: true, mutable: true }) tagStatus: 'info' | 'error' =
    'info';

  /**
   * The text to be displayed in the tag element.
   */
  @Prop() tagText?: string;

  /**
   * The error message to render.
   */
  @Prop({ reflect: true, mutable: true }) error?: string;

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
      headerLevel,
      headerText,
      subheaderText,
      tagStatus,
      tagText,
      error,
      linkHref,
      linkText,
      required,
    } = this;

    // Create a headers element
    const HeaderLevel = getHeaderLevel(headerLevel);
    const SubHeaderLevel = getHeaderLevel(headerLevel + 1);

    const requiredSpan = required && (
      <span class="required"> {i18next.t('required')}</span>
    );

    return (
      <Host>
        <div class="va-card-status__wrapper">
          <va-card>
              <header>
                  <HeaderLevel class="va-card-status__header">
                    <span class="usa-sr-only">{tagText} {headerText} {required && 'required'} {subheaderText}</span>
                    <span aria-hidden="true">
                      {tagText && (
                        <div>
                          <va-tag-status status={tagStatus} text={tagText} />
                        </div>
                      )}
                      <span class="va-card-status_card-title">{headerText}</span>
                      {requiredSpan}
                    </span>
                  </HeaderLevel>
                  {subheaderText && (
                    <SubHeaderLevel aria-hidden="true" class="va-card-status__subheader">
                      {subheaderText}
                    </SubHeaderLevel>
                  )}
              </header>
              <span id="card-status-error-message" role="alert">
                {error && (
                  <Fragment>
                    <span class="usa-sr-only">{i18next.t('error')}</span>
                    <span class="usa-error-message">{error}</span>
                  </Fragment>
                )}
              </span>
              <slot></slot>
              <va-link-action
                messageAriaDescribedby={error ? `${i18next.t('error')}: ${error}` : null}
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
