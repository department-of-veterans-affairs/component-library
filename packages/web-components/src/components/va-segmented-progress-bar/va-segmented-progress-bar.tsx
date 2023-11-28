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
  * Header level for button wrapper. Must be between 1 and 6 (v3 only)
  */
  @Prop() headerLevel?: number = 4;

  /**
  * The term used to indicate the current progress for the heading "[progressTerm] 2 of 5". (Screen reader only)
  */
  @Prop() progressTerm?: string = 'Step';

  /**
  * String containing a list of step labels delimited by a semi-colon (v3 only) Example: `"Step 1;Step 2;Step 3"`
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
   * When true, this makes the segmented-progress-bar use a div instead of a heading (v3 only)
   */
  @Prop() useDiv?: boolean;

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
    const {
      current,
      total,
      label = `Step ${current} of ${total}`,
      uswds,
      labels,
      centeredLabels,
      counters,
      headingText,
      headerLevel,
      progressTerm,
      useDiv,
    } = this;
    let labelsArray;
    if (labels) {
      labelsArray = labels.split(';');
    }
    const range = Array.from({ length: total }, (_, i) => i);

    if (uswds) {

      // eslint-disable-next-line i18next/no-literal-string
      const Tag = useDiv ? `div` : `h${headerLevel}`;

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
          <div class={indicatorClass}>
                <ol class="usa-step-indicator__segments" aria-hidden={labels ? null : 'true'}>
                  {range.map(step => (
                    <li class={computeSegmentClass(step)} aria-current={current===step + 1 ? 'step' : null}>
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
                {
                  <div class="usa-step-indicator__header">
                    <Tag class="usa-step-indicator__heading">
                      <span class="usa-step-indicator__heading-counter">
                        <span class="usa-sr-only">{progressTerm}</span>
                        <span class="usa-step-indicator__current-step">{current}</span>
                        <span class="usa-step-indicator__total-steps"> of {total}</span>
                      </span>
                      <span class="usa-step-indicator__heading-text">{labels ? labelsArray[current - 1] : headingText}</span>
                    </Tag>
                  </div>
                }
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
          </div>
        </Host>
      )
    }
  }
}
