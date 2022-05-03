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
  @Prop() status: string = 'info';

  /**
   * The text to trigger the expansion
   */
  @Prop() trigger: string = '';

  /**
   * If true, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics: boolean = false;

  /**
   * If false, the status icon is removed.
   */
  @Prop() showIcon: boolean = true;

  /**
   * If true, the alert will be visible.
   */
   @Prop() visible: boolean = true;

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
  updateAlertBodyMaxHeight() {
    const alertBodyElm = this.el.shadowRoot.getElementById('alert-body');
    const contentHeight = alertBodyElm.scrollHeight + 'px';
    // the additional 2em is #alert-body margin-top and margin-bottom when open
    alertBodyElm.style.setProperty(
      '--calc-max-height',
      'calc(' + contentHeight + ' + 2rem)',
    );
  }

  componentDidLoad() {
    this.updateAlertBodyMaxHeight();
    this.vaComponentDidLoad.emit();
  }

  render() {
    const { status, open, showIcon, visible } = this;
    const alertClasses = classnames('alert-expandable', status, { 'hide-icon': !showIcon });
    const bodyClasses = classnames('alert-expandable-body', { 'open': open, 'closed': !open });
    const role = status === 'error' ? 'alert' : null;
    const ariaLive = status === 'error' ? 'assertive' : null;

    if (!visible) return <div aria-live="polite" />;

    return (
      <Host>
        <div role={this.el.getAttribute('data-role') || role} aria-live={ariaLive} class={alertClasses}>
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
            <span class="alert-expandable-title">
              <span class="sr-only">Alert:&nbsp;</span>
              {this.trigger}
            </span>
            <i class="fa-angle-down" role="presentation" />
          </a>
          <div id="alert-body" class={bodyClasses}>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
