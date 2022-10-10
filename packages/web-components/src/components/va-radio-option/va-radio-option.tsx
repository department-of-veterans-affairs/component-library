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
  @Prop() name!: string;

  /**
   * The text label for the input element.
   */
  @Prop() label!: string;

  /**
   * The value attribute for the input element.
   */
  @Prop() value!: string;

  /**
   * Whether or not the option is selected.
   */
  @Prop() checked?: boolean = false;

  /**
   * Optional string for the ariaDescribedBy attribute.
   */
  @Prop() ariaDescribedby?: string;

  /**
   * The event emitted when the selected option value changes
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  radioOptionSelected: EventEmitter;

  private handleChange(): void {
    this.radioOptionSelected.emit();
  }

  render() {
    const { checked, ariaDescribedby, name, value, label } = this;
    const id = this.el.id || (name + value);
    return (
      <Host
        aria-checked={checked ? `${checked}` : 'false'}
        aria-describedby={(checked && ariaDescribedby) || null}
        checked={checked}
        name={name}
        onClick={() => this.handleChange()}
        role="radio"
        value={value}
        id={id}
      >
        <label htmlFor={id}>{label}</label>
      </Host>
    );
  }
}
