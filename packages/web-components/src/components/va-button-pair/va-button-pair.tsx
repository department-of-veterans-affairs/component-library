import { Component, Event, EventEmitter, Host, h, Prop, Listen } from '@stencil/core';

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
   * Applies to the primary button.
   */
  @Prop() primaryLabel?: string;

  /**
   * Applies to the secondary button.
   */
  @Prop() secondaryLabel?: string;

  /**
   * If `true`, the primary button will submit form data when clicked.
   */
  @Prop() submit?: boolean = false;

  /**
   * If `true`, button pair will use Update and Cancel for button text.
   */
  @Prop() update?: boolean = false;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;

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
          ...event.detail?.details // Merging the va-button GA event details.
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

  render() {
    const {
      continue: _continue,
      disableAnalytics,
      handlePrimaryClick,
      handleSecondaryClick,
      primaryLabel,
      secondaryLabel,
      submit,
      update,
      uswds,
    } = this;

    if (_continue) {
      if (uswds) {
        return (
          <Host>
            <ul class="usa-button-group">
              <li class="usa-button-group__item">
                <va-button
                  back
                  disable-analytics={disableAnalytics}
                  label={secondaryLabel}
                  onClick={handleSecondaryClick}
                  uswds
                />
              </li>
              <li class="usa-button-group__item">
                <va-button
                  continue
                  disable-analytics={disableAnalytics}
                  label={primaryLabel}
                  onClick={handlePrimaryClick}
                  submit={submit}
                  uswds
                />
              </li>
            </ul>
          </Host>
        );
      } else {
        return (
          <Host>
            <va-button
              back
              disable-analytics={disableAnalytics}
              label={secondaryLabel}
              onClick={handleSecondaryClick}
            />
            <va-button
              continue
              disable-analytics={disableAnalytics}
              label={primaryLabel}
              onClick={handlePrimaryClick}
              submit={submit}
            />
          </Host>
        );
      }
    }

    if (update || !_continue) {
      if (uswds) {
        return (
          <Host>
            <ul class="usa-button-group">
              <li class="usa-button-group__item">
              <va-button
                disable-analytics={disableAnalytics}
                label={primaryLabel}
                onClick={handlePrimaryClick}
                text={update ? 'Update' : 'Yes'}
                submit={submit}
                uswds
              />
              </li>
              <li class="usa-button-group__item">
                <va-button
                  disable-analytics={disableAnalytics}
                  label={secondaryLabel}
                  onClick={handleSecondaryClick}
                  secondary
                  text={update ? 'Cancel' : 'No'}
                  uswds
                />
              </li>
            </ul>
          </Host>
        )
      } else {
        return (
          <Host>
            <va-button
              disable-analytics={disableAnalytics}
              label={primaryLabel}
              onClick={handlePrimaryClick}
              text={update ? 'Update' : 'Yes'}
              submit={submit}
            />
            <va-button
              disable-analytics={disableAnalytics}
              label={secondaryLabel}
              onClick={handleSecondaryClick}
              secondary
              text={update ? 'Cancel' : 'No'}
            />
          </Host>
        );
      }
    }

  }
}
