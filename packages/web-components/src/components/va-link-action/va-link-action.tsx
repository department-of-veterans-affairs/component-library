import {
  Component,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import classNames from 'classnames';

/**
 * @componentName Link - Action
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
   * An optional message that will be read by screen readers when the link is focused.
   */
  @Prop() messageAriaDescribedby?: string;

  /**
   * The type of the link, which determines its style.
   * Can be 'primary', 'secondary', or 'reverse'.
   */
  @Prop() type: 'primary' | 'secondary' | 'reverse' = 'primary';

  @State() isSingleLine: boolean = true;

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

  private linkRef?: HTMLElement;

  componentDidLoad() {
    this.checkTextLines();
  }

  @Watch('text')
  checkTextLines(): void {
    if (this.linkRef) {
      const computedStyle = getComputedStyle(this.linkRef);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const height = this.linkRef.clientHeight;
      this.isSingleLine = height <= lineHeight;
    }
  }

  render() {
    const { handleClick, href, text, messageAriaDescribedby, type } = this;

    const linkClass = classNames({
      'va-link--reverse': type === 'reverse',
      'va-link--primary': type === 'primary',
      'va-link--secondary': type === 'secondary',
    });

    // eslint-disable-next-line i18next/no-literal-string
    const iconClass = classNames('link-icon--left', 'link-icon', {
      'link-icon--reverse': type === 'reverse',
    });

    const ariaDescribedbyIds = messageAriaDescribedby
      ? 'link-description'
      : null;

    return (
      <Host>
        <a
          href={href}
          class={linkClass}
          aria-describedby={ariaDescribedbyIds}
          onClick={handleClick}
          ref={el => (this.linkRef = el as HTMLElement)}
        >
          <va-icon class={iconClass} icon="chevron_right" size={3}></va-icon>
          <span class="link-text">{text}</span>
        </a>
        {messageAriaDescribedby && (
          <span id="link-description" class="sr-only">
            {messageAriaDescribedby}
          </span>
        )}
      </Host>
    );
  }
}
