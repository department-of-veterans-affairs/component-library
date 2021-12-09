import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'va-segmented-progress-bar',
  styleUrl: 'va-segmented-progress-bar.css',
  shadow: true,
})
export class VaSegmentedProgressBar {
  /**
   * Whether or not an analytics event will be fired.
   */
  @Prop() enableAnalytics: boolean;

  /**
   * The current segment in progress
   */
  @Prop() current: number = 0;

  /**
   * The total number of segments in the progress bar
   */
  @Prop() total: number = 10;

  /**
   * An override for the default aria label.
   */
  @Prop() label: string = `Step ${this.current} of ${this.total}`;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  componentDidRender() {
    if (this.enableAnalytics) {
      this.componentLibraryAnalytics.emit({
        componentName: 'va-segmented-progress-bar',
        action: 'change',
        details: {
          current: this.current,
          total: this.total,
        },
      });
    }
  }

  render() {
    const { current, total, label } = this;
    const range = Array.from({ length: total }, (_, i) => i);
    return (
      <Host>
        <div
          class="progress-bar-segmented"
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin="0"
          aria-valuemax={total}
          tabindex="0"
          aria-label={label}
        >
          {range.map(step => (
            <div
              key={step}
              class={`progress-segment ${
                current > step ? 'progress-segment-complete' : ''
              }`}
            />
          ))}
        </div>
      </Host>
    );
  }
}
