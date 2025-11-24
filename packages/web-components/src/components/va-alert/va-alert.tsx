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

  // Check light DOM instead of shadow DOM because it
  // will be present during willRender
  private hasHeadlineContent(): boolean {
    if (this.el) {
      for (const child of this.el.children) {
        if (child.slot === "headline" && child.textContent?.trim()) {
          return true;
        }
      }
    }

    return false;
  }

  private updateCloseAriaLabelWithHeadlineText(): void {
    const headlineText = this.getHeadlineText();
    this.closeBtnAriaLabel = `Close ${headlineText ?? 'this'} notification`;
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

  private addSrOnlyToSlot(): void {
    const { status, slim } = this;

    const statusLabels = {
      warning: 'Warning',
      error: 'Error',
      success: 'Success',
      info: 'Information',
      continue: 'Continue',
    };

    try {
      // Get the appropriate slot based on alert type
      const slot = slim
        ? this.el.shadowRoot?.querySelector('slot:not([name])')
        : this.el.shadowRoot?.querySelector('slot[name="headline"]');
      
      if (!slot) return;

      // Get the target element to prepend the sr-only span to
      let targetElement: HTMLElement | null = null;
      
      if (slim) {
        // For slim alerts, find the first element node in the default slot
        const assignedNodes = (slot as HTMLSlotElement).assignedNodes();
        targetElement = Array.from(assignedNodes).find(
          node => node.nodeType === Node.ELEMENT_NODE
        ) as HTMLElement;
      } else {
        // For non-slim alerts, get the first assigned element from headline slot
        const assignedElements = (slot as HTMLSlotElement).assignedElements();
        targetElement = assignedElements.length > 0 ? assignedElements[0] as HTMLElement : null;
      }

      if (!targetElement) return;

      // Remove existing sr-only span if present (for status updates)
      const existingSrOnly = targetElement.querySelector('.usa-sr-only');
      if (existingSrOnly) {
        existingSrOnly.remove();
      }

      // Create and prepend the sr-only span
      const srOnlySpan = document.createElement('span');
      /* eslint-disable-next-line i18next/no-literal-string */
      srOnlySpan.className = 'usa-sr-only';
      srOnlySpan.textContent = `${statusLabels[status] || 'Information'} Alert `;
      
      targetElement.prepend(srOnlySpan);
    } catch (e) {
      // Silently fail if there's an issue accessing the slot
      /* eslint-disable-next-line i18next/no-literal-string */
      console.error('Error adding sr-only to alert content:', e);
    }
  }

  componentDidLoad() {
    this.vaComponentDidLoad.emit();
  }

  componentDidRender() {
    this.addSrOnlyToSlot();
    if (!this.closeBtnAriaLabel) {
      this.updateCloseAriaLabelWithHeadlineText();
    }
  }

  componentWillRender() {
    const isBannerAlert = this.el.id === 'va-banner-alert';

    // Apply the slim property if there is no headline text and this alert is not used by va-banner
    if (!isBannerAlert && !this.hasHeadlineContent()) {
      this.slim = true;
    }
  }

  render() {
    const { visible, closeable, slim, fullWidth } = this;
    let status = this.status;

    // Enforce pre-defined statuses
    const definedStatuses = ['info', 'warning', 'error', 'success', 'continue'];
    if (definedStatuses.indexOf(status) === -1) {
      status = 'info';
    }

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
            {!slim && (
              <slot name="headline"></slot>
            )}
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
