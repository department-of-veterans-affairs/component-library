import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'va-progress-bar-ionic',
  styleUrl: 'va-progress-bar-ionic.css',
  shadow: true
})
export class VaProgressBarIonic {
    /**
   * Whether or not an analytics event will be fired.
   */
  @Prop() enableAnalytics: boolean;

  /**
   * Percent of progress made. 0 to 100.
   */
  @Prop() percent: number;

  /**
   * The text label for the progress bar.
   */
  @Prop() label: string;

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
    return (
        <ion-progress-bar value={this.percent}></ion-progress-bar>
    );
  }
}