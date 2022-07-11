import {
  Component,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  Fragment,
} from '@stencil/core';

@Component({
  tag: 'va-link',
  styleUrl: 'va-link.css',
  shadow: true,
})
export class VaLink {
  /**
   * If `true`, the anchor text will be bolded and include a right arrow icon.
   */
  @Prop() active?: boolean = false;

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
   * The suggested filename. Only valid if download is `true`.
   */
  @Prop() filename?: string;

  // @Prop() type?: string;

  /**
   * If `true`, a video icon will be displayed before the anchor text.
   */
  @Prop() video?: boolean = false;

  /**
   * The event used to track usage of the component.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  private handleClick = (e: MouseEvent): void => {
    // TODO: remove console.log
    console.log(e);
    if (this.disableAnalytics) return;
    this.componentLibraryAnalytics.emit({
      componentName: 'va-link',
      action: 'click',
      details: {
        // TODO: add analytics event details
      },
    });
  };

  render() {
    const {
      active,
      channel,
      download,
      filename,
      handleClick,
      href,
      // type
      video,
    } = this;

    return (
      <Host>
        <a
          href={href}
          download={download ? filename : undefined}
          // Property 'type' does not exist on type 'AnchorHTMLAttributes<HTMLAnchorElement>'
          // type={download ? type : undefined}
          onClick={handleClick}
          rel={channel || video ? 'noopener' : undefined}
          target={channel || video ? '_blank' : undefined}
        >
          {active ? (
            <Fragment>
              <slot></slot>
              <i aria-hidden="true" />
            </Fragment>
          ) : (
            <Fragment>
              <i aria-hidden="true" />
              <slot></slot>
            </Fragment>
          )}
        </a>
      </Host>
    );
  }
}
