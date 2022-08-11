import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  Listen,
  State,
  h,
} from '@stencil/core';
import classnames from 'classnames';

@Component({
  tag: 'va-alert-expandable',
  styleUrl: 'va-alert-expandable.css',
  shadow: true,
})
export class VaAlertExpandable {
  @Element() el: HTMLElement;

  @State() open: boolean;

  /**
   * Determines the icon and background color.
   * One of `info`, `error`, `success`, `warning`, or `continue`
   */
  @Prop() status?: 'continue' | 'error' | 'info' | 'success' | 'warning';

  /**
   * The text to trigger the expansion
   */
  @Prop() trigger!: string;

  /**
   * If `true`, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * If `true`, the status icon is removed.
   */
  @Prop() iconless?: boolean = false;

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

  @Listen('resize', { target: 'window' })
  handleResize() {
    this.updateAlertBodyMaxHeight();
  }

  toggleOpen(): void {
    // Conditionally track the event.
    if (!this.disableAnalytics) {
      this.componentLibraryAnalytics.emit({
        componentName: 'va-alert-expandable',
        action: !this.open ? 'expand' : 'collapse',
        details: {
          triggerText: this.trigger,
        },
      });
    }

    this.open = !this.open;
  }

  handleKeydown(event): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggleOpen();
    }
  }

  // Ensures that the CSS animation is consistent and uses the correct max-height for its content
  /* eslint-disable i18next/no-literal-string */
  updateAlertBodyMaxHeight() {
    const bodyElm = this.el.shadowRoot.getElementById('alert-body');
    const contentHeight = bodyElm.scrollHeight + 'px';
    // the additional 2em is #alert-body margin-top and margin-bottom when open
    bodyElm.style.setProperty(
      '--calc-max-height',
      'calc(' + contentHeight + ' + 2rem)',
    );
  }
  /* eslint-enable i18next/no-literal-string */

  componentDidLoad() {
    this.updateAlertBodyMaxHeight();
  }

  render() {
    const { status, open, iconless } = this;
    const alertClasses = classnames('alert-expandable', status, {
      'hide-icon': iconless,
    });
    const bodyClasses = classnames('alert-expandable-body', {
      open: open,
      closed: !open,
    });
    /* eslint-disable i18next/no-literal-string */
    const role = status === 'error' ? 'alert' : null;
    const ariaLive = status === 'error' ? 'assertive' : null;
    /* eslint-enable i18next/no-literal-string */

    return (
      <Host>
        <div role={role} aria-live={ariaLive} class={alertClasses}>
          <a
            role="button"
            aria-controls="alert-body"
            aria-expanded={this.open ? 'true' : 'false'}
            tabIndex={0}
            onClick={this.toggleOpen.bind(this)}
            onKeyDown={this.handleKeydown.bind(this)}
            class="alert-expandable-trigger"
          >
            <i class="alert-status-icon" aria-hidden="true" role="img"></i>
            <div>
              <span class="alert-expandable-title">
                <span class="sr-only">Alert:&nbsp;</span>
                {this.trigger}
              </span>
              <i class="fa-angle-down" role="presentation" />
            </div>
          </a>
          <div id="alert-body" class={bodyClasses}>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
