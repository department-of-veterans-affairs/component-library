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
   * Aria-label text for the close button.
   */
  @Prop() closeBtnAriaLabel?: string = 'Close notification';

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
  @Prop() slim?: boolean = false;

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
      const children = this.el.shadowRoot.querySelector('slot').assignedNodes();
      // An empty array means that there isn't a node with `slot="headline"`
      headlineText = children.length > 0 ? children[0].textContent : null;
    } catch (e) {
      // This is where we handle the edge case of the user being on IE11
      const children = this.el.shadowRoot.childNodes;
      const headerList = children.filter((node: any) =>
        /* eslint-disable-next-line i18next/no-literal-string */
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
    const { visible, closeable, slim } = this;
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
      'usa-alert--slim': slim,
    });

    return (
      <Host>
        <div
          role={this.el.getAttribute('data-role')}
          class={classes}
          aria-label={this.el.getAttribute('data-label')}
        >
          <div
            class="usa-alert__body"
            onClick={this.handleAlertBodyClick.bind(this)}
            role="presentation"
          >
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
            <va-icon icon="cancel" size={4}></va-icon>
          </button>
        )}
      </Host>
    );
  }
}
