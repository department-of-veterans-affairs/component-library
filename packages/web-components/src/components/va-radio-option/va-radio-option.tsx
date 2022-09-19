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
    return (
      <Host
        aria-checked={checked ? `${checked}` : 'false'}
        aria-describedby={(checked && ariaDescribedby) || null}
        aria-label={name}
        checked={checked}
        name={name}
        onClick={() => this.handleChange()}
        role="radio"
        value={value}
        id={this.el.id || label}
      >
        <label htmlFor={label}>{label}</label>
        <div class="description">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
