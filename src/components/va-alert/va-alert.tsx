import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
} from '@stencil/core';

@Component({
  tag: 'va-alert',
  styleUrl: 'va-alert.css',
  shadow: true,
})
export class VaAlert {
  @Element() el!: any;

  /**
   * Determines the icon and border/background color.
   * One of `info`, `error`, `success`, `warning`, or `continue`
   */
  @Prop() status: string = 'info';

  /**
   * If true, renders the alert with only a background color corresponding
   * to the status - no icon or left border.
   */
  @Prop() backgroundOnly: boolean = false;

  /**
   * If true, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics: boolean = false;

  /**
   * If true, the alert will be visible.
   */
  @Prop() visible: boolean = true;

  /**
   * Aria-label text for the close button.
   */
  @Prop() closeBtnAriaLabel: string = 'Close notification';

  /**
   * If true, a close button will be displayed.
   */
  @Prop() closeable: boolean = false;

  @Event({
    composed: true,
    bubbles: true,
  })
  close: EventEmitter;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private closeHandler(e: MouseEvent): void {
    this.close.emit(e);
  }

  private handleAlertBodyClick(e: MouseEvent): void {
    let headlineText = null;

    // This is the happy path, meaning the user isn't using IE11
    try {
      const children = this.el.shadowRoot.querySelector('slot').assignedNodes();
      // An empty array means that there isn't a node with `slot="headline"`
      headlineText = children.length > 0 ? children[0].textContent : null;
    } catch (e) {
      // This is where we handle the edge case of the user being on IE11
      const children = this.el.shadowRoot.childNodes;
      const headerList = children.filter((node: any) =>
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(
          node.tagName.toLowerCase(),
        ),
      );

      headlineText = headerList.length > 0 ? headerList[0].textContent : null;
    }

    if (!this.disableAnalytics) {
      const target = e.target as HTMLElement;
      // If it's a link being clicked, dispatch an analytics event
      if (target?.tagName === 'A') {
        const detail = {
          componentName: 'AlertBox',
          action: 'linkClick',
          details: {
            clickLabel: target.innerText,
            headline: headlineText,
            status: this.status,
            backgroundOnly: this.backgroundOnly,
            closeable: this.closeable,
          },
        };
        this.componentLibraryAnalytics.emit(detail);
      }
    }
  }

  render() {
    const { backgroundOnly, status, visible, closeable } = this;
    const classes = `alert ${status} ${backgroundOnly ? 'bg-only' : ''}`;

    if (!visible) return <div aria-live="polite" />;
    
    return (
      <Host>
        <div class={classes}>
          <i aria-hidden="true" role="img"></i>
          <span class="sr-only">Alert: </span>
          <div class="body" onClick={this.handleAlertBodyClick.bind(this)}>
            {!backgroundOnly && <slot name="headline"></slot>}
              <slot></slot>
          </div>
        </div>

        {closeable && (
          <button
            class="va-alert-close"
            aria-label={this.closeBtnAriaLabel}
            onClick={this.closeHandler.bind(this)}
          >
            <i class="fa-times-circle" aria-label="Close icon" />
          </button>
        )}
      </Host>
    );
  }
}
