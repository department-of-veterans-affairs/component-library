import { Component, Event, EventEmitter, Host, h, Prop } from '@stencil/core';

/**
 * @componentName Button pair
 * @maturityCategory caution
 * @maturityLevel candidate
 * @guidanceHref button/button-pair
 */
@Component({
  tag: 'va-button-pair',
  styleUrl: 'va-button-pair.css',
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

  private handlePrimaryClick = (e: MouseEvent) => {
    this.primaryClick.emit(e);
    if (this.disableAnalytics) return;
    this.componentLibraryAnalytics.emit({
      componentName: 'va-button-pair',
      action: 'click',
      details: {
        // TODO: add analytics event details
      },
    });
  };

  private handleSecondaryClick = (e: MouseEvent) => {
    this.secondaryClick.emit(e);
    if (this.disableAnalytics) return;
    this.componentLibraryAnalytics.emit({
      componentName: 'va-button-pair',
      action: 'click',
      details: {
        // TODO: add analytics event details
      },
    });
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
    } = this;

    if (_continue) {
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

    if (update || !_continue) {
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
