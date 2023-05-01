import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import classNames from 'classnames';

/**
 * @componentName Progress bar - segmented
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref form/progress-bar-segmented
 */

@Component({
  tag: 'va-segmented-progress-bar',
  styleUrl: 'va-segmented-progress-bar.scss',
  shadow: true,
})
export class VaSegmentedProgressBar {
  /**
   * Whether or not an analytics event will be fired.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * The current segment in progress
   */
  @Prop() current!: number;

  /**
   * The total number of segments in the progress bar
   */
  @Prop() total!: number;

  /**
   * An override for the default aria label.
   */
  @Prop() label?: string;

  /**
  * Whether or not the component will use USWDS v3 styling.
  */
  @Prop() uswds?: boolean;

  /**
  * Array of each step label (v3 only)
  */
  @Prop() labels?: string;

  /**
  * Whether or not to center the step labels (v3 only)
  */
  @Prop() centeredLabels?: boolean;

  /**
  * Show number counters for each step (v3 only)
  */
  @Prop() counters?: "default" | "small";

  /**
  * Text of current step (v3 only)
  */
  @Prop() headingText?: string;

  /**
   * The event used to track usage of the component. This is emitted when the
   * component renders and enableAnalytics is true.
   */
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
    const { current, total, label = `Step ${current} of ${total}`, uswds, labels, centeredLabels, counters, headingText } = this;
    let labelsArray;
    if (labels) {
      labelsArray = labels.split(',');
    }
    const range = Array.from({ length: total }, (_, i) => i);

    if (uswds) {
      const indicatorClass = classNames({
        'usa-step-indicator': true,
        'usa-step-indicator--center': centeredLabels,
        'usa-step-indicator--counters': counters === 'default',
        'usa-step-indicator--counters-sm': counters === 'small'
      })

      const computeSegmentClass = (step) => {
        return classNames({
          'usa-step-indicator__segment': true,
          'usa-step-indicator__segment--complete': current > step + 1,
          'usa-step-indicator__segment--current': current === step + 1
        });
      }

      return (
        <Host>
          <div class={indicatorClass} aria-label="progress">
                <ol class="usa-step-indicator__segments">
                  {range.map(step => (
                    <li class={computeSegmentClass(step)}>
                      {
                        labels ? (
                          <span class="usa-step-indicator__segment-label">{labelsArray[step]}
                            {
                              current !== step + 1 ? (
                                <span class="usa-sr-only">{current > step + 1 ? 'completed' : 'not completed'}</span>
                              ) : null
                            }
                          </span>
                        ) : null
                      }
                      
                    </li>
                  ))}
                </ol>
                <div class="usa-step-indicator__header">
                  <h4 class="usa-step-indicator__heading">
                    <span class="usa-step-indicator__heading-counter"
                      ><span class="usa-sr-only">Step</span>
                      <span class="usa-step-indicator__current-step">{current}</span>
                      <span class="usa-step-indicator__total-steps"> of {total}</span>
                    </span>
                    <span class="usa-step-indicator__heading-text">{labels ? labelsArray[current - 1] : headingText}</span>
                  </h4>
                </div>
              </div>
        </Host>
      )
    } else {
      return (
        <Host>
          <div>
            <div
              class="progress-bar-segmented"
              role="progressbar"
              aria-label={label}
              aria-valuenow={current}
              aria-valuemin="0"
              aria-valuemax={total}
              aria-valuetext={label}
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
            <span aria-atomic="true" aria-live="polite" class="sr-only">
              Step {current} of {total}
            </span>
          </div>
        </Host>
      )
    }
  }
}
