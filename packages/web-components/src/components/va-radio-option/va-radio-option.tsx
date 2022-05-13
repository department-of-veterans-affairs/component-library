import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
} from '@stencil/core';

@Component({
  tag: 'va-radio-option',
  styleUrl: 'va-radio-option.css',
  shadow: true,
})
export class VaRadioOption {
  @Element() el: HTMLElement;

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
   * The event emitted when the selected option value changes
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  radioOptionSelected: EventEmitter;

  private handleChange = (): void => {
    this.radioOptionSelected.emit();
  };

  render() {
    const { checked, label, name, value } = this;

    return (
      <Host onClick={this.handleChange}>
        <input
          checked={checked}
          id="inputField"
          name={name}
          type="radio"
          value={value}
        ></input>
        <label htmlFor="inputField">{label}</label>
      </Host>
    );
  }
}
