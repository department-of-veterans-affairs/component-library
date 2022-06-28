import { Component, Event, EventEmitter, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'va-button-pair',
  styleUrl: 'va-button-pair.css',
  shadow: true,
})
export class VaButtonPair {
  /**
   * If true, button pair will use Continue and Back for button text.
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
      handlePrimaryClick,
      handleSecondaryClick,
      primaryLabel,
      secondaryLabel,
      submit,
    } = this;
    return (
      <Host>
        <va-button
          continue={_continue}
          label={primaryLabel}
          onClick={handlePrimaryClick}
          submit={submit}
        />
        <va-button
          back={_continue}
          label={secondaryLabel}
          onClick={handleSecondaryClick}
        />
      </Host>
    );
  }
}
