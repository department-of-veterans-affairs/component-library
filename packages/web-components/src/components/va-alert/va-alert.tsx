import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
} from '@stencil/core';
import classnames from 'classnames';

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
  //  Reflect Prop into DOM for va-banner: https://stenciljs.com/docs/properties#prop-options
  @Prop({reflect: true}) status: string = 'info';

  /**
   * If true, renders the alert with only a background color corresponding
   * to the status - no icon or left border.
   */
  @Prop() backgroundOnly: boolean = false;

  /**
   * This option only takes effect when background-only is true. If true, the background-only alert will
   * include an icon.
   */
  @Prop() showIcon: boolean = false;

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

  /**
   * If true, the alert will be full width.
   * Should be for emergency communication only.
   */
  @Prop() fullWidth: boolean = false;

  /**
   * Fires when the component has successfully finished rendering for the first
   * time.
   */
  @Event({
    eventName: 'va-component-did-load',
    composed: true,
    bubbles: true,
  })
  vaComponentDidLoad: EventEmitter;

  /**
   * Fires when the component is closed by clicking on the close icon. This fires only
   * when closeable is true.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  closeEvent: EventEmitter;

  /**
   * The event used to track usage of the component. This is emitted when an
   * anchor link is clicked and disableAnalytics is not true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private closeHandler(e: MouseEvent): void {
    this.closeEvent.emit(e);
  }

  private handleAlertBodyClick(e: MouseEvent): void {
    let headlineText = null;

    // This is the happy path, meaning the user isn't using IE11
    try {
      const hasHeadline = !!this.el.querySelector('[slot="headline"]');
      if (hasHeadline) {
        headlineText = this.el.querySelector('[slot="headline"]').textContent;
      }
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
          componentName: 'va-alert',
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

  componentDidLoad() {
    this.vaComponentDidLoad.emit();
  }

  render() {
    const { backgroundOnly, status, visible, closeable, showIcon } = this;
    const hasHeadline = !!this.el.querySelector('[slot="headline"]');
    const classes = classnames('alert', status, {
      'bg-only': backgroundOnly,
      'hide-icon': backgroundOnly && !showIcon,
      'no-headline': !hasHeadline,
    });
    const role = status === 'error' ? 'alert' : null;
    const ariaLive = status === 'error' ? 'assertive' : null;
    if (!visible) return <div aria-live="polite" />;

    return (
      <Host>
        <div role={this.el.getAttribute('data-role') || role} aria-live={ariaLive} class={classes}>
          <i aria-hidden="true" role="img"></i>
          <div
            class="body"
            onClick={this.handleAlertBodyClick.bind(this)}
            role="presentation"
          >
            {!backgroundOnly && hasHeadline && <slot name="headline"></slot>}
              <slot></slot>
          </div>
        </div>

        {closeable && (
          <button
            class="va-alert-close"
            aria-label={this.closeBtnAriaLabel}
            onClick={this.closeHandler.bind(this)}
          >
            <i aria-hidden="true" class="fa-times-circle" role="presentation" />
          </button>
        )}
      </Host>
    );
  }
}
