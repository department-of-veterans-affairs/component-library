import { Component, Event, EventEmitter, Host, h, Prop } from '@stencil/core';
import classNames from 'classnames';

/**
 * @componentName Link
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-link',
  styleUrl: 'va-link.css',
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
   * Adds an aria-label attribute to the link element.
   */
    @Prop() label?: string = null;

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
    } = this;

    const linkClass = classNames({
      'va-link--reverse': reverse,
    });

    // Active link variant
    if (active) {
      return (
        <Host>
          <a href={href} class={linkClass} onClick={handleClick} aria-label={this.label}>
            {text}
            <va-icon class="link-icon--active" icon="chevron_right"></va-icon>
          </a>
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

    // Default
    return (
      <Host>
        <a href={href} class={linkClass} onClick={handleClick} aria-label={this.label}>
          {text}
        </a>
      </Host>
    );
  }
}
