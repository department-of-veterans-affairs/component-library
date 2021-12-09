import {
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
  Watch,
} from '@stencil/core';

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
   * Percent of progress made. 0 to 100.
   */
  @Prop() percent: number = 0;

  /**
   * The text label for the progress bar.
   */
  @Prop({ mutable: true }) label: string = `${this.percent}% complete`;

  @Watch('percent')
  updateLabel(newPercent: number) {
    this.label = `${newPercent}% complete`;
  }

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
    const { label, percent } = this;

    return (
      <Host>
        <div
          aria-label={label}
          aria-valuemax="100"
          aria-valuemin="0"
          aria-valuenow={percent}
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
