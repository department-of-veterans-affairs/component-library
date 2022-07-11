import { Component, Host, h, Prop, Fragment } from '@stencil/core';

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

  render() {
    const {
      active,
      channel,
      download,
      filename,
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
