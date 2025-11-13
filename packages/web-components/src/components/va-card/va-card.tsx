import { Component, Element, Host, Prop, h } from '@stencil/core';
import { getHeaderLevel } from '../../utils/utils';

/**
 * @componentName Card
 * @maturityCategory use
 * @maturityLevel deployed
 */

@Component({
  tag: 'va-card',
  styleUrl: 'va-card.scss',
  shadow: true,
})
export class VaCard {
  @Element() el: HTMLElement;

  /**
   * If `true`, a drop-shadow will be displayed with a white background.
   */
  @Prop() showShadow?: boolean = false;

  /**
   * If `true`, the card will have a gray background.
   */
  @Prop() background?: boolean = false;

  /**
   * If set, displays an icon at the top of the card in a blue circle.
   * The value should be the icon name to use. Icons can be found at https://design.va.gov/components/icon
   */
  @Prop() iconName?: string;

  /**
   * Header level. Must be between 1 and 6
   */
  @Prop() headingLevel?: number = 3;

  /**
   * Text to be displayed in the card header.
   */
  @Prop() headingText?: string;

  /**
   * The status variant of the tag. Determines the background color and icon.
   */
  @Prop({ reflect: true, mutable: true }) tagStatus:
    | 'informational'
    | 'warning'
    | 'success'
    | 'error' = 'informational';

  /**
   * The text to be displayed in the tag element.
   */
  @Prop() tagText?: string;

  /**
   * The error message to render.
   */
  @Prop({ reflect: true, mutable: true }) errorMessage?: string;

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

  render() {
    // Create a header element
    const HeaderLevel = getHeaderLevel(this.headingLevel);

    //Checking if error exists and showError is true to display error message
    if (this.errorMessage && this.showError) {
      this.el.setAttribute('error', this.errorMessage);
    } else if (!this.errorMessage || !this.showError) {
      this.el.setAttribute('error', '');
    }

    return (
      <Host>
        {this.iconName && (
          <div class="va-card__icon-wrapper">
            <span class="va-card__icon-circle">
              <va-icon icon={this.iconName} size={5} />
            </span>
          </div>
        )}
        <article>
          <header>
            {this.tagText && this.tagStatus && (
              <va-tag-status status={this.tagStatus} text={this.tagText} />
            )}
            {this.headingText ? (
              <HeaderLevel class="card-status-header">
                {this.headingText}
              </HeaderLevel>
            ) : (
              <slot name="header"></slot>
            )}
          </header>
          <div>
            <slot name="subHeader"></slot>
          </div>
          <span id="input-error-message" role="alert">
            {this.showError && (
              <span class="usa-error-message">{this.errorMessage}</span>
            )}
          </span>
          <slot></slot>
          <footer>
            {this.linkHref && this.linkText ? (
              <va-link
                iconName="navigate_next"
                iconSize={3}
                href={this.linkHref}
                text={this.linkText}
              />
            ) : (
              <slot name="footer"></slot>
            )}
          </footer>
        </article>
      </Host>
    );
  }
}
