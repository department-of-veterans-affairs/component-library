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
  @Prop({ reflect: true, mutable: true }) status: 'informational' | 'warning' | 'success' | 'error' = 'informational';

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
    if (!['informational', 'warning', 'success', 'error'].includes(this.status)) {
      this.status = 'informational';
    }
  }

  render() {
    const { screenReaderText, status, text,  } = this;

    const tagClasses = classnames({
      'va-tag-status': true,
      [`va-tag-status--${status}`]: true,
    });

    const statusToIcon = {
      informational: 'info',
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
