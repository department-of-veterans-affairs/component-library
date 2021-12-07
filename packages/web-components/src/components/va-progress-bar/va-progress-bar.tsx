import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'va-progress-bar',
  styleUrl: 'va-progress-bar.css',
  shadow: true,
})
export class VaProgressBar {
  /**
   * Whether or not an analytics event will be fired.
   */
  @Prop() enableAnalytics: boolean;

  /**
   * The text label for the progress bar.
   */
  @Prop() label: string;

  /**
   * Percent of progress made. 0 to 100.
   */
  @Prop() percent: number;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  componentDidRender() {
    if (this.enableAnalytics && (this.percent === 0 || this.percent === 100)) {
      this.componentLibraryAnalytics.emit({
        componentName: 'va-progress-bar',
        action: 'change',
        details: {
          label: this.label,
          percent: this.percent,
        },
      });
    }
  }

  render() {
    const ariaLabel = this.label ?? `${this.percent}%`;
    return (
      <Host>
        <div
          aria-label={ariaLabel}
          aria-valuemax="100"
          aria-valuemin="0"
          aria-valuenow={this.percent}
          class="progress-bar"
          tabindex="0"
          role="progressbar"
        >
          <div
            class="progress-bar-inner"
            style={{ width: `${this.percent}%` }}
          />
        </div>
      </Host>
    );
  }
}
