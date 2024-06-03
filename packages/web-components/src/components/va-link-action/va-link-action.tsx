import { Component, Event, EventEmitter, Host, h, Prop } from '@stencil/core';
import classNames from 'classnames';

/**
 * @componentName Link - Action (new)
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-link-action',
  styleUrl: 'va-link-action.css',
  shadow: true,
})
export class VaLinkAction {
  /**
   * If `true`, the component-library-analytics event is disabled.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * The href attribute of the anchor.
   */
  @Prop() href!: string;

  /**
   * The anchor text.
   */
  @Prop() text!: string;

  /**
   * The type of the link, which determines its style.
   * Can be 'primary', 'secondary', or 'reverse'.
   */
  @Prop() type: "primary" | "secondary" | "reverse" = "primary";

  /**
   * The event used to track usage of the component.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  /** @ts-ignore */
  private handleClick = (e: MouseEvent): void => {
    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-link-action',
        action: 'click',
        details: {
          label: this.text,
          destination: this.href,
          origin: window.location.href,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  };

  render() {
    const {
      handleClick,
      href,
      text,
      type
    } = this;

    const linkClass = classNames({
      'va-link--reverse': type === 'reverse',
    });

    // eslint-disable-next-line i18next/no-literal-string
    const iconClass = classNames('link-icon--left', 'link-icon', {
      'link-icon--primary': type === 'primary',
      'link-icon--secondary': type === 'secondary',
      'link-icon--reverse': type === 'reverse'
    });

    return (
      <Host>
        <a href={href} class={linkClass} onClick={handleClick}>
          <va-icon class={iconClass} icon="chevron_right" size={3}></va-icon>
          {text}
        </a>
      </Host>
    );
  }
}