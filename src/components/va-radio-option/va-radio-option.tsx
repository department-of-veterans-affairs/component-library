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
  radioOptionKeyDown: EventEmitter;

  private handleChange(): void {
    this.radioOptionSelected.emit();
  }

  private handleKeyDown(): void {
    console.log('HI');
    this.radioOptionKeyDown.emit();
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
          onKeyDown={() => this.handleKeyDown()}
          aria-describedby={ariaDescribedby}
        />
        <label htmlFor="input">{this.label}</label>
      </Host>
    );
  }
}
