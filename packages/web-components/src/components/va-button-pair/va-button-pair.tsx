import {
  Component,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  Listen,
} from '@stencil/core';

/**
 * @componentName Button pair
 * @maturityCategory caution
 * @maturityLevel candidate
 * @guidanceHref button/button-pair
 */
@Component({
  tag: 'va-button-pair',
  styleUrl: 'va-button-pair.scss',
  shadow: true,
})
export class VaButtonPair {
  /**
   * If `true`, button pair will use Continue and Back for button text.
   */
  @Prop() continue?: boolean = false;

  /**
   * If `true`, the component-library-analytics event is disabled.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * Applies to the primary button aria-label.
   */
  @Prop() primaryLabel?: string;

  /**
   * Applies to the secondary button aria-label.
   */
  @Prop() secondaryLabel?: string;

  /**
   * Having this attribute present will set the type of this button as 'submit'.
   * The va-button element must be within a `form` element for this functionality to take place
   * A value of: `prevent` will trigger the onsubmit callback on the form, but won't submit the form;
   * `skip` will submit the form but not trigger the onsubmit callback;
   * All other values will trigger the onsubmit and onclick callbacks, then submit the form; in that order.
   */
  @Prop() submit?: string;

  /**
   * If `true`, button pair will use Update and Cancel for button text.
   */
  @Prop() update?: boolean = false;

  /**
   * Custom text that will be applied to the left va-button inside the component.
   * If set will override text controlled by the 'update' prop.
   */
  @Prop() leftButtonText?: string;

  /**
   * Custom text that will be applied to the right va-button inside the component.
   * If set will override text controlled by the 'update' prop,
   */
  @Prop() rightButtonText?: string

  /**
   * Fires when the primary button is clicked.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  primaryClick: EventEmitter;

  /**
   * Fires when the secondary button is clicked.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  secondaryClick: EventEmitter;

  /**
   * The event used to track usage of the component.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * Listen for the va-button GA event and capture it so
   * that we can emit a single va-button-pair GA event that includes
   * the va-button details.
   */
  @Listen('component-library-analytics')
  handleButtonAnalytics(event) {
    // Prevent va-button-pair GA event from firing multiple times.
    if (event.detail.componentName === 'va-button-pair') return;

    // Prevent va-button GA event from firing.
    event.stopPropagation();

    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-button-pair',
        action: 'click',
        details: {
          type: null,
          label: null,
          ...event.detail?.details, // Merging the va-button GA event details.
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  }

  private handlePrimaryClick = (e: MouseEvent) => {
    this.primaryClick.emit(e);
  };

  private handleSecondaryClick = (e: MouseEvent) => {
    this.secondaryClick.emit(e);
  };


  // get text for the left button; custom text takes precedence
  private getLeftButtonText = () => {
    let text: string;
    if (this.leftButtonText) {
      text = this.leftButtonText;
    } else {
      text = this.update ? 'Update' : 'Yes';
    }
    return text;
  }


  // get text for the right button; custom text takes precedence
  private getRightButtonText = () => {
    let text: string;
    if (this.rightButtonText) {
      text = this.rightButtonText;
    } else {
      text = this.update ? 'Cancel' : 'No';
    }
    return text;
  }

  render() {
    const {
      continue: _continue,
      disableAnalytics,
      handlePrimaryClick,
      handleSecondaryClick,
      primaryLabel,
      secondaryLabel,
      submit,
    } = this;

    if (_continue) {
      return (
        <Host>
          <ul class="usa-button-group">
            <li class="usa-button-group__item">
              <va-button
                back
                disable-analytics={disableAnalytics}
                label={secondaryLabel}
                onClick={handleSecondaryClick}
              />
            </li>
            <li class="usa-button-group__item">
              <va-button
                continue
                disable-analytics={disableAnalytics}
                label={primaryLabel}
                onClick={handlePrimaryClick}
                submit={submit}
              />
            </li>
          </ul>
        </Host>
      );
    }

    return (
      <Host>
        <ul class="usa-button-group">
          <li class="usa-button-group__item">
            <va-button
              disable-analytics={disableAnalytics}
              label={primaryLabel}
              onClick={handlePrimaryClick}
              text={this.getLeftButtonText()}
              submit={submit}
            />
          </li>
          <li class="usa-button-group__item">
            <va-button
              disable-analytics={disableAnalytics}
              label={secondaryLabel}
              onClick={handleSecondaryClick}
              secondary
              text={this.getRightButtonText()}
            />
          </li>
        </ul>
      </Host>
    );
  }
}
