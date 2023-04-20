import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
} from '@stencil/core';

/**
 * @componentName Loading indicator
 * @maturityCategory use
 * @maturityLevel best_practice
 */

@Component({
  tag: 'va-loading-indicator',
  styleUrl: 'va-loading-indicator.css',
  shadow: true,
})
export class VaLoadingIndicator {
  @Element() el!: HTMLElement;
  spinner!: HTMLDivElement;

  loadingStartTime = null;
  observer = null;

  /**
   * The message visible on screen when loading
   */
  @Prop() message: string;

  /**
   * An aria label
   */
  @Prop() label?: string = 'Loading';

  /**
   * Set to true if the loading indicator should capture focus
   */
  @Prop() setFocus?: boolean = false;

  /**
   * Analytics tracking function(s) will be called. Form components
   * are disabled by default due to PII/PHI concerns.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * The event used to track usage of the component.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  componentDidLoad() {
    if (this.setFocus && this.spinner) {
      this.spinner.focus();
    }

    this.loadingStartTime = Date.now();

    const parentNode = this.el.parentNode;

    const callback = mutationsList => {
      // Use traditional 'for loops' for IE 11
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const loadingIndicatorRemoved =
            Array.from(mutation.removedNodes.values()).filter(
              (node: Element) =>
                node.tagName.toLowerCase() === 'va-loading-indicator',
            ).length > 0;

          if (this.enableAnalytics && loadingIndicatorRemoved) {
            const ev = new CustomEvent('component-library-analytics', {
              bubbles: true,
              composed: true,
              detail: {
                componentName: 'va-loading-indicator',
                action: 'displayed',
                details: {
                  displayTime: Date.now() - this.loadingStartTime,
                  message: this.message,
                },
              },
            });
            parentNode.dispatchEvent(ev);
          }
        }
      }
    };

    this.observer = new MutationObserver(callback);
    this.observer.observe(parentNode, {
      childList: true,
    });
  }

  disconnectedCallback() {
    // Don't disconnect the observer before the callback runs
    const observer = this.observer;
    setTimeout(() => observer.disconnect());
  }

  render() {
    const { message, label } = this;

    return (
      <Host aria-live="polite">
        <div
          ref={el => (this.spinner = el as HTMLDivElement)}
          class="loading-indicator"
          role="progressbar"
          aria-label={label}
          aria-valuetext={message}
          tabindex="-1"
        />
        {message}
      </Host>
    );
  }
}
