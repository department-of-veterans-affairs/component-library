/* eslint-disable i18next/no-literal-string */
import {
  Component,
  Element,
  Host,
  Prop,
  h,
} from '@stencil/core';
import classnames from 'classnames';

/**
 * @componentName Tag
 * @maturityCategory caution
 * @maturityLevel candidate
 */
@Component({
  tag: 'va-tag',
  styleUrl: 'va-tag.scss',
  shadow: true,
})
export class VaTag {
  @Element() el: HTMLElement;

  /**
   * The status variant of the tag. Determines it's background color.
   */
  @Prop() status: 'default' | 'informational' | 'warning' | 'success' | 'error' = 'default';

  /**
   * The text to be displayed in the tag element.
   */
  @Prop() text!: string;

  // Ensure that a valid status is provided
  componentWillLoad() {
    if (!['default', 'informational', 'warning', 'success', 'error'].includes(this.status)) {
      this.status = 'default';
    }
  }

  render() {
    const { status, text } = this;

    const tagClasses = classnames({
      'va-tag': true,
      [`va-tag--${status}`]: true,
    });

    const statusToIcon = {
      informational: 'info',
      warning: 'warning',
      success: 'check_circle',
      error: 'error',
    };

    return (
      <Host class={tagClasses} role="status">
        {status !== 'default' && (
          <va-icon
            icon={statusToIcon[status]}
            size={2}
            aria-hidden="true"
          />
        )}
        <span class="va-tag__text">{text}</span>
      </Host>
    );
  }
}
