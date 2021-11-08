import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'va-radio-option',
  styleUrl: 'va-radio-option.css',
  shadow: true,
})
export class VaRadioOption {
  /**
   * The name attribute for the input element.
   */
  @Prop() name: string;

  /**
   * The text label for the input element.
   */
  @Prop() label: string;

  /**
   * The value attribute for the input element.
   */
  @Prop() value: string;

  /**
   * Whether or not the option is selected.
   */
  @Prop() checked: boolean;

  /**
   * Optional string for the ariaDescribedBy attribute.
   */
  @Prop() ariaDescribedby: string;

  @Event({
    composed: true,
    bubbles: true,
  })
  radioOptionSelected: EventEmitter;

  private handleChange(): void {
    this.radioOptionSelected.emit();
  }

  render() {
    const ariaDescribedby = (this.checked && this.ariaDescribedby) || null;
    return (
      <Host>
        <input
          role="radio"
          checked={this.checked}
          id="input"
          name={this.name}
          type="radio"
          value={this.value}
          onChange={() => this.handleChange()}
          aria-describedby={ariaDescribedby}
        />
        <label htmlFor="input">{this.label}</label>
      </Host>
    );
  }
}
