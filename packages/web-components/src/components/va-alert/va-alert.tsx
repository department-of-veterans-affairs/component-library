import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
  Fragment,
} from '@stencil/core';
import classnames from 'classnames';

/**
 * Use a heading element with an attribute named slot and a value of "headline" to
 * control what is displayed for the alert's headline. Any children passed into
 * this component without a parent slot "headline" will render in the alert's body.
 */

/**
 * @componentName Alert
 * @maturityCategory use
 * @maturityLevel best_practice
 */
@Component({
  tag: 'va-alert',
  styleUrl: 'va-alert.scss',
  shadow: true,
})
export class VaAlert {
  @Element() el!: any;

  /**
   * Determines the icon and border/background color.
   */
  //  Reflect Prop into DOM for va-banner: https://stenciljs.com/docs/properties#prop-options
  @Prop({ reflect: true }) status?:
    | 'info'
    | 'warning'
    | 'error'
    | 'success'
    | 'continue' = 'info';

  /**
   * If `true`, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * If `true`, the alert will be visible.
   */
  @Prop() visible?: boolean = true;

  /**
   * Aria-label text for the close button. If not provided, the text will be "Close {headline} notification".
   */
  @Prop({ mutable: true }) closeBtnAriaLabel?: string;

  /**
   * If `true`, a close button will be displayed.
   */
  @Prop({ reflect: true }) closeable?: boolean = false;

  /**
   * If `true`, the alert will be full width.
   * Should be for emergency communication only.
   */
  @Prop() fullWidth?: boolean = false;

  /**
   * Displays the slim variation.
   */
  @Prop({ mutable: true, reflect: true }) slim?: boolean = false;

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

  private getHeadlineText(): string | null {
    let headlineText: string | null = null;

    try {
      // This is the happy path, meaning the user isn't using IE11
      const headlineSlot = this.el.shadowRoot?.querySelector('slot[name="headline"]');
      if (headlineSlot) {
        const children = (headlineSlot as HTMLSlotElement).assignedNodes();
        headlineText = children.length > 0 ? children[0].textContent : null;
      }
    } catch (e) {
      // This is where we handle the edge case of the user being on IE11
    const children = Array.from(this.el.shadowRoot?.childNodes || []);
    const headerList = children.filter(
      (node: Node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(
          (node as HTMLElement).tagName,
        ),
    );
    headlineText = headerList.length > 0 ? (headerList[0] as HTMLElement).textContent : null;
    } finally {
      return headlineText;
    }
  }

  // check if user provided a headline slot in light DOM
  private hasHeadlineSlot(): boolean {
    if (this.el) {
      for (const child of this.el.children) {
        if (child.slot === "headline") return true;
      }
    }

    return false;
  }

  private updateCloseAriaLabelWithHeadlineText(): void {
    const headlineText = this.getHeadlineText();
    this.closeBtnAriaLabel = `Close ${headlineText ?? 'this'} notification`
  }

  private handleAlertBodyClick(e: MouseEvent): void {
    const headlineText = this.getHeadlineText();

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

  componentWillRender() {
    const isBannerAlert = this.el.id === 'va-banner-alert';

    // Apply the slim property if there is no headline slot and this alert is not used by va-banner
    if (!isBannerAlert && this.visible) {
      this.slim = !this.hasHeadlineSlot();
    }
  }

  componentDidRender() {
    if (!this.closeBtnAriaLabel) {
      this.updateCloseAriaLabelWithHeadlineText();
    }
  }

  render() {
    const { visible, closeable, slim, fullWidth } = this;
    let status = this.status;
    /* eslint-disable i18next/no-literal-string */

    // Enforce pre-defined statuses
    const definedStatuses = ['info', 'warning', 'error', 'success', 'continue'];
    if (definedStatuses.indexOf(status) === -1) {
      status = 'info';
    }
    /* eslint-enable i18next/no-literal-string */

    if (!visible) return <div aria-live="polite" />;

    const classes = classnames('usa-alert', `usa-alert--${status}`, {
      'usa-alert--success': status === 'continue',
      'usa-alert--slim': slim && !fullWidth,
    });

    const classesSiteAlert = classnames('usa-site-alert', {
      'usa-site-alert--slim': slim,
      'usa-site-alert--info': status === 'info',
    });

    const alertBody = (
      <Fragment>
        <div
          class="usa-alert__body"
          onClick={this.handleAlertBodyClick.bind(this)}
        >
          <div>
            {status === 'continue' && (
              <va-icon
                class="va-alert__lock-icon"
                icon="lock"
                size={slim ? 3 : 4}
              ></va-icon>
            )}
            {!slim && <slot name="headline"></slot>}
            <slot></slot>
          </div>
        </div>

        {closeable && (
          <button
            class="va-alert-close"
            aria-label={this.closeBtnAriaLabel}
            onClick={this.closeHandler.bind(this)}
          >
            <va-icon icon="close" size={4}></va-icon>
          </button>
        )}
      </Fragment>
    );

    if (fullWidth) {
      return (
        <Host>
          <section
            class={classesSiteAlert}
            aria-label={this.el.getAttribute('data-label')}
            role={this.el.getAttribute('data-role')}
          >
            <div class={classes}>
              {alertBody}
            </div>
          </section>
        </Host>
      );
    }

    return (
      <Host>
        <div
          role={this.el.getAttribute('data-role')}
          class={classes}
          aria-label={this.el.getAttribute('data-label')}
        >
          {alertBody}
        </div>
      </Host>
    );
  }
}
