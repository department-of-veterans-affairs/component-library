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
 * @componentName Tag - Status
 * @maturityCategory caution
 * @maturityLevel candidate
 * @guidanceHref tag/tag-status
 */
@Component({
  tag: 'va-tag-status',
  styleUrl: 'va-tag-status.scss',
  shadow: true,
})
export class VaTagStatus {
  @Element() el: HTMLElement;

  /**
   * The status variant of the tag. Determines the background color and icon.
   */
  @Prop({ reflect: true, mutable: true }) status: 'info' | 'warning' | 'success' | 'error' = 'info';

  /**
   * The text to be displayed in the tag element.
   */
  @Prop() text!: string;

  /**
   * Screen reader text to provide context about the status tag. Defaults to `Status {status}:`.
   */
  @Prop() screenReaderText: string = `Status ${this.status}:`;

  // Ensure that a valid status is provided
  componentWillLoad() {
    if (!['info', 'warning', 'success', 'error'].includes(this.status)) {
      this.status = 'info';
    }
  }

  render() {
    const { screenReaderText, status, text,  } = this;

    const tagClasses = classnames({
      'va-tag-status': true,
      [`va-tag-status--${status}`]: true,
    });

    const statusToIcon = {
      info: 'info',
      warning: 'warning',
      success: 'check_circle',
      error: 'error',
    };

    return (
      <Host class={tagClasses} role="status">
        <va-icon
          icon={statusToIcon[status]}
          size={3}
          class='va-tag-status__icon'
          aria-hidden="true"
        />
        <span class="usa-sr-only">{screenReaderText}</span>
        <span class="va-tag-status__text">{text}</span>
      </Host>
    );
  }
}
