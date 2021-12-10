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
      <Host
        aria-checked={this.checked ? `${this.checked}` : 'false'}
        aria-describedby={ariaDescribedby}
        checked={this.checked}
        name={this.name}
        onClick={() => this.handleChange()}
        role="radio"
        value={this.value}
        id={this.label}
      >
        <label htmlFor={this.label}>{this.label}</label>
      </Host>
    );
  }
}
