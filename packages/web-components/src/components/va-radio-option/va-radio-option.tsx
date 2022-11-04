import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
} from '@stencil/core';
import classnames from 'classnames';

@Component({
  tag: 'va-radio-option',
  styleUrl: 'va-radio-option.scss',
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
   * Whether or not the component will use USWDS styling.
   */
  @Prop() uswds?: boolean = false;

  /**
   * Whether or not the radio option is disabled. Can be used if the USWDS option is active.
   */
  @Prop() disabled?: boolean = false;

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
    const { checked, ariaDescribedby, name, value, label, uswds, disabled } = this;
    const id = this.el.id || (name + value);

    const inputClass = classnames({
      'usa-radio__input': true,
      // 'usa-radio__input--tile': true,
    });

    if (uswds) {
      return (
        <div class="usa-radio">
          <input
            class={inputClass}
            id={id}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onClick={() => this.handleChange()}
          />
          <label htmlFor={id} class="usa-radio__label">{label}</label>
        </div>
      )
    } else {
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
}
