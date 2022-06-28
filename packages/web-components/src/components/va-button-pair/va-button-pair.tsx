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

  private handlePrimaryClick = (e: MouseEvent) => {
    console.log('first button clicked', e);
    this.primaryClick.emit(e);
    return;
  };

  private handleSecondaryClick = (e: MouseEvent) => {
    console.log('second button clicked', e);
    this.secondaryClick.emit(e);
    return;
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
