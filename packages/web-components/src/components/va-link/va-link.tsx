import { Component, Event, EventEmitter, Host, h, Prop } from '@stencil/core';
import classNames from 'classnames';

/**
 * @componentName Link
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-link',
  styleUrl: 'va-link.scss',
  shadow: true,
})
export class VaLink {
  /**
   * The title used in the abbr element. If filetype is PDF, the abbr title will be Portable Document Format.
   */
  @Prop() abbrTitle?: string;

  /**
   * If `true`, the anchor text will be bolded and include a right arrow icon.
   */
  @Prop({ reflect: true }) active?: boolean = false;

  /**
   * If 'true', renders a "back arrow" in front of the link text
   */
  @Prop() back?: boolean = false;

  /**
   * If `true`, a calendar icon will be displayed before the anchor text.
   */
  @Prop() calendar?: boolean = false;

  /**
   * If `true`, a channel icon will be displayed before the anchor text.
   */
  @Prop() channel?: boolean = false;

  /**
   * If `true`, the component-library-analytics event is disabled.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * If `true`, the link will be treated as a download, and a download icon will be displayed before the anchor text.
   */
  @Prop() download?: boolean = false;

  /**
   * The href attribute of the anchor.
   */
  @Prop() href!: string;

  /**
   * The suggested filename. Only valid if download or calendar is `true`.
   */
  @Prop() filename?: string;

  /**
   * The type of the file. Only displayed if download is `true`.
   */
  @Prop() filetype?: string;

  /**
   * The number of pages of the file. Only displayed if download is `true`.
   */
  @Prop() pages?: number;

  /**
   * The anchor text.
   */
  @Prop() text!: string;

  /**
   * If `true`, a video icon will be displayed before the anchor text.
   */
  @Prop() video?: boolean = false;

  /**
   * If 'true', will represent the link with white text instead of blue.
   */
  @Prop() reverse?: boolean = false;

  /**
   * If 'true', will open in a new tab and will have the text "opens in a new tab" appended to the link text in screen reader only span
   */
  @Prop() external?: boolean = false;

  /**
   * Adds an aria-label attribute to the link element.
   */
  @Prop() label?: string = null;

  /**
   * The name of the icon to be displayed in the link.
   */
  @Prop() iconName?: string = null;

  /**
   * The size variant of the icon,
   * an integer between 3 and 9 inclusive.
   */
  @Prop() iconSize?: number = 3;
  /**
   * The event used to track usage of the component.
   */

  /**
   * The lang attribute for the anchor tag in the Default va-link. Also used for hreflang.
   */
  @Prop() language?: string;

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
        componentName: 'va-link',
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

  private getAbbreviationTitle = () => {
    const { abbrTitle, filetype } = this;
    if (filetype === 'PDF') return 'Portable Document Format';
    return abbrTitle;
  };

  render() {
    const {
      active,
      back,
      calendar,
      channel,
      download,
      filetype,
      filename,
      getAbbreviationTitle,
      handleClick,
      href,
      pages,
      text,
      video,
      reverse,
      external,
      iconName,
      iconSize,
      language,
      label
    } = this;

    const linkClass = classNames({
      'va-link--reverse': reverse,
      'link--center': iconName || external,
    });

    // Active link variant
    if (active) {
      return (
        <Host>
          <a
            href={href}
            class={linkClass}
            onClick={handleClick}
            aria-label={label}
          >
            {text}
            <va-icon class="link-icon--active" icon="chevron_right"></va-icon>
          </a>
        </Host>
      );
    }

    // Back link variant
    if (back) {
      const backArrow = (
        <va-icon
          icon="arrow_back"
          class="link-icon--left link-icon--back"
        ></va-icon>
      );

      return (
        <Host>
          <div class="link-container">
            {backArrow}
            <a
              href={href}
              class={linkClass}
              onClick={handleClick}
              aria-label={label}
            >
              {text}
            </a>
          </div>
        </Host>
      );
    }

    // Channel and Video link variant
    if (channel || video) {
      const linkIcon = channel ? 'youtube' : 'play_circle';
      return (
        <Host>
          <a
            href={href}
            class={linkClass}
            aria-label={label}
            onClick={handleClick}
            rel="noopener"
            target="_blank"
          >
            <va-icon class="link-icon--left" icon={linkIcon}></va-icon>
            {text} <dfn>{channel ? 'YouTube' : 'on YouTube'}</dfn>
          </a>
        </Host>
      );
    }

    // Calendar link variant
    if (calendar) {
      return (
        <Host>
          <a
            href={href}
            class={linkClass}
            download={filename}
            aria-label={label}
            onClick={handleClick}
          >
            <va-icon class="link-icon--left" icon="calendar_today"></va-icon>
            {text}
          </a>
        </Host>
      );
    }

    // Download link variant
    if (download) {
      return (
        <Host>
          <a
            href={href}
            class={linkClass}
            download={filename}
            aria-label={label}
            onClick={handleClick}
          >
            <va-icon class="link-icon--left" icon="file_download"></va-icon>
            {text}{' '}
            {filetype && (
              <dfn>
                (<abbr title={getAbbreviationTitle()}>{filetype}</abbr>
                {pages && `, ${pages} pages`})
              </dfn>
            )}
          </a>
        </Host>
      );
    }

    // Icon link Variant
    if (iconName) {
      return (
        <Host>
          <a
            href={href}
            class={linkClass}
            aria-label={label}
            onClick={handleClick}
          >
            <va-icon icon={iconName} size={iconSize} part="icon"></va-icon>
            {text}
          </a>
        </Host>
      );
    }

    if (external) {
      return (
        <Host>
          <a
            href={href}
            rel="noreferrer"
            class={linkClass}
            onClick={handleClick}
            aria-label={label}
            target="_blank"
          >
            {text} (opens in a new tab)
            <span class="usa-sr-only">opens in a new tab</span>
          </a>
        </Host>
      );
    }

    // Default
    const lang = language ? language : null;
    return (
      <Host>
        <a
          href={href}
          class={linkClass}
          onClick={handleClick}
          aria-label={label}
          part="anchor"
          lang={lang}
          hrefLang={lang}
        >
          {text}
        </a>
      </Host>
    );
  }
}
