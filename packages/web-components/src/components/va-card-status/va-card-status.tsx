import { Component, Host, Prop, h } from '@stencil/core';
import { getHeaderLevel } from '../../utils/utils';
import { i18next } from '../..';

/**
 * @componentName Card Status
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-card-status',
  styleUrl: 'va-card-status.scss',
  shadow: true,
})
export class VaCardStatus {
  /**
   * Set the card to required and render the (Required) text.
   */
  @Prop() required?: boolean = false;

  /**
   * Header level. Must be between 1 and 6
   */
  @Prop() headingLevel?: number = 3;

  /**
   * Header level. Must be between 1 and 6
   */
  @Prop() headingText?: string;

  /**
   * The error message to render.
   */
  @Prop({ reflect: true, mutable: true }) error?: string;

  /**
   * When `false`, hides the error message from view, but not from the screen reader.
   */
  @Prop({ reflect: true }) showError?: boolean = false;

  /**
   * Set the href for the card link.
   */
  @Prop() linkHref?: string;
  /**
   *
   * Set the text for the card link.
   */
  @Prop() linkText?: string;

  /**
   * If `true`, a drop-shadow will be displayed with a white background.
   */
  @Prop() showShadow?: boolean = false;

  render() {
    // Create a header element
    const HeaderLevel = getHeaderLevel(this.headingLevel);

    return (
      <Host>
        <va-card showShadow={this.showShadow}>
          <div>
            <HeaderLevel class="heading-text">{this.headingText}</HeaderLevel>
            {this.required && (
              <span class="usa-label--required">{i18next.t('required')}</span>
            )}
          </div>
          <slot></slot>
          {this.linkHref && this.linkText && (
            <va-link href={this.linkHref} text={this.linkText} />
          )}    
        </va-card>
      </Host>
    );
  }
}
