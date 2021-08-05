import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'va-radio-option',
  styleUrl: 'va-radio-option.css',
  shadow: true,
})
export class VaRadioOption {
  @Prop() name: string;

  @Prop() label: string;

  @Prop() value: string;

  @Prop() checked: boolean;

  @Prop() ariaDescribedby: string;

  @Event({
    composed: true,
    bubbles: true,
  })
  radioOptionSelected: EventEmitter;

  @Event({
    composed: true,
    bubbles: true,
  })
  radioOptionMouseDown: EventEmitter;

  private handleChange(): void {
    this.radioOptionSelected.emit();
  }

  private handleMouseDown(): void {
    this.radioOptionMouseDown.emit();
  }

  render() {
    const ariaDescribedby = (this.checked && this.ariaDescribedby) || null;
    return (
      <Host>
        <input
          checked={this.checked}
          id="input"
          name={this.name}
          type="radio"
          value={this.value}
          onChange={() => this.handleChange()}
          onMouseDown={() => this.handleMouseDown()}
          aria-describedby={ariaDescribedby}
        />
        <label htmlFor="input">{this.label}</label>
      </Host>
    );
  }
}
