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
  @Prop() enableAnalytics?: boolean = false;

  /**
   * Percent of progress made. 0 to 100.
   */
  @Prop() percent!: number;

  /**
   * The text label for the progress bar.
   */
  @Prop() label?: string;

  /**
   * The event used to track usage of the component. This is emitted when percent
   * is 0 or 100 and enableAnalytics is true.
   */
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
          label: this.label || `${this.percent}% complete`,
          percent: this.percent,
        },
      });
    }
  }

  render() {
    const { label = `${this.percent.toFixed(0)}% complete`, percent } = this;

    return (
      <Host>
        <div
          aria-label={label}
          aria-valuemax="100"
          aria-valuemin="0"
          aria-valuenow={percent.toFixed(0)}
          aria-valuetext={label}
          class="progress-bar"
          tabindex="0"
          role="progressbar"
        >
          <div class="progress-bar-inner" style={{ width: `${percent}%` }} />
        </div>
      </Host>
    );
  }
}
