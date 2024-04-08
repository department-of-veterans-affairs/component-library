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
  shadow: false,
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
   * Whether or not the component will use USWDS v3. styling.
   */
  @Prop() uswds?: boolean = true;

  /**
   * Whether or not the component will display as a tile. Available when uswds is true.
   */
   @Prop() tile?: boolean = false;

  /**
   * Description of the option displayed below the option label. Available when uswds is true.
   */
   @Prop() description?: string;

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
    const {
      checked,
      ariaDescribedby,
      name,
      value,
      label,
      uswds,
      disabled,
      tile,
      description } = this;
    const id = this.el.id || (name + value);

    if (uswds) {
      const inputClass = classnames({
        'usa-radio__input': true,
        'usa-radio__input--tile': tile,
      });
      return (
        <div class="usa-radio">
          <input
              class={inputClass}
              type="radio"
              name={name}
              value={value}
              checked={checked}
              disabled={disabled}
              onClick={() => this.handleChange()}
              id={id + 'input'}
            />
          <label class="usa-radio__label" htmlFor={id + 'input'}>
            {label}
            {description && (
              <span
                class="usa-radio__label-description dd-privacy-hidden"
                data-dd-action-name="description"
                aria-describedby="option-label"
              >
                {description}
              </span>
            )}
          </label>
        </div>
      )
    } else {
      return (
        <Host aria-checked={checked ? `${checked}` : 'false'}>
          <input
              type='radio'
              aria-describedby={(checked && ariaDescribedby) || null}
              checked={checked}
              name={name}
              onClick={() => this.handleChange()}
              value={value}
              id={id + 'input'}
            />
          <label htmlFor={id + 'input'}>
            <span>
              {label}
              {description && (
                <span
                  class="description dd-privacy-hidden"
                  data-dd-action-name="description"
                  aria-describedby="option-label"
                >
                  {description}
                </span>
              )}
            </span>
          </label>
        </Host>
      );
    }
  }
}
