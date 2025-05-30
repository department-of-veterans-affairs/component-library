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

/**
 * @componentName Additional info
 * @maturityCategory use
 * @maturityLevel best_practice
 */
@Component({
  tag: 'va-additional-info',
  styleUrl: 'va-additional-info.css',
  shadow: true,
})
export class VaAdditionalInfo {
  @Element() el: HTMLElement;

  @State() open: boolean;

  /**
   * The text to trigger the expansion
   */
  @Prop() trigger!: string;

  /**
   * If `true`, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * If `true`, left blue border and padding is removed.
   */
  @Prop() disableBorder?: boolean = false;

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
    this.updateInfoMaxHeight();
  }

  toggleOpen(): void {
    // Conditionally track the event.
    if (!this.disableAnalytics) {
      this.componentLibraryAnalytics.emit({
        componentName: 'va-additional-info',
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
  updateInfoMaxHeight() {
    const infoElm = this.el.shadowRoot?.getElementById('info');
    if (!infoElm) return;

    /* eslint-disable i18next/no-literal-string */
    const contentHeight = infoElm.scrollHeight + 'px';
    // the additional 2em is #info margin-top and margin-bottom when open
    infoElm.style.setProperty(
      '--calc-max-height',
      'calc(' + contentHeight + ' + 1.125rem)',
    );
    /* eslint-enable i18next/no-literal-string */
  }

  componentDidRender() {
    requestAnimationFrame(() => this.updateInfoMaxHeight());
  }

  render() {
    const infoClass = classnames({
      'open': this.open,
      'closed': !this.open
    });
    return (
      <Host>
        <a
          role="button"
          aria-controls="info"
          aria-expanded={this.open ? 'true' : 'false'}
          tabIndex={0}
          onClick={this.toggleOpen.bind(this)}
          onKeyDown={this.handleKeydown.bind(this)}
        >
          <div>
            <span class="additional-info-title">{this.trigger}</span>
            <va-icon
              class="additional-info-icon"
              icon="chevron_right"
              size={3}
            ></va-icon>
          </div>
        </a>
        <div id="info" class={infoClass}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
