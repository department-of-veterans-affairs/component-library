import { Component, Host, h, Prop } from '@stencil/core';

/**
 * @componentName Alert - Critical
 * @guidanceHref alert/alert-critical
 * @maturityCategory caution
 * @maturityLevel candidate
 */
@Component({
  tag: 'va-alert-critical',
  styleUrl: 'va-alert-critical.scss',
  shadow: true,
})
export class VaAlertCritical {
  /** The link to a page where the user can take action */
  @Prop() link!: string;

  /** Text describing what critical action the user needs to take */
  @Prop() text!: string;

  render() {
    const { link, text } = this;

    if (!link || !text) {
      return null;
    }

    return (
      <Host>
        <div class="critical-info">
          <a
            href={link}
            class="action-link"
            aria-label={`Action required: ${text}`}
          >
            <div class="text-and-chevron">
              <span class="link-text">{text}</span>
              <va-icon
                class="link-icon hydrated"
                icon="chevron_right"
                size={3}
              ></va-icon>
            </div>
          </a>
        </div>
      </Host>
    );
  }
}
