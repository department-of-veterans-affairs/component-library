import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
} from '@stencil/core';

@Component({
  tag: 'va-search',
  styleUrl: 'va-search.css',
  shadow: true,
})
export class VaSearch {
  @Element() el: HTMLElement;

  /**
   * Fires when the search input loses focus
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  inputBlurEvent: EventEmitter;

  /**
   * Fires when the search input loses focus after its value was changed
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  inputChangeEvent: EventEmitter;

  /**
   * Fires when the search input is clicked
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  inputClickEvent: EventEmitter;

  /**
   * Fires when the search input gains focus
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  inputFocusEvent: EventEmitter;

  /**
   * Fires when the search input is focused and a key is pressed
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  inputKeyDownEvent: EventEmitter;

  /**
   * Fires when the search button is clicked
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  buttonClickEvent: EventEmitter;

  /**
   * Fires when the search button gains focus
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  buttonFocusEvent: EventEmitter;

  /**
   * Fires when the search button is focused and a key is pressed
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  buttonKeyDownEvent: EventEmitter;

  /**
   * Identifies the currently active element
   */
  @Prop() ariaActiveDescendant?: string;

  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the element on which this attribute is set
   */
  @Prop() ariaControls?: string;

  /**
   * Adds an aria-label attribute to the input and button
   */
  @Prop() ariaExpanded: string;

  /**
   * Text displayed inside the search button
   */
  @Prop() buttonText?: string;

  /**
   * Hides the search button
   */
  @Prop() hideButton: boolean = false;

  /**
   * Initial value of input
   */
  @Prop() inputValue?: string;

  /**
   * Adds an aria-label attribute to the input and button
   */
  @Prop() label: string = 'Search';

  // Input Event Handlers
  private handleInputBlurEvent = (event: FocusEvent) => {
    this.inputBlurEvent.emit(event);
  };

  private handleInputChangeEvent = (event: Event) => {
    // const target = event.target as HTMLInputElement;
    this.inputChangeEvent.emit(event);
  };

  private handleInputClickEvent = (event: MouseEvent) => {
    this.inputClickEvent.emit(event);
  };

  private handleInputFocusEvent = (event: FocusEvent) => {
    this.inputFocusEvent.emit(event);
  };

  private handleInputKeyDownEvent = (event: Event) => {
    this.inputKeyDownEvent.emit(event);
  };

  // Button Event Handlers
  private handleButtonClickEvent = (event: MouseEvent) => {
    this.buttonClickEvent.emit(event);
  };

  private handleButtonFocusEvent = (event: FocusEvent) => {
    this.buttonFocusEvent.emit(event);
  };

  private handleButtonKeyDownEvent = (event: KeyboardEvent) => {
    this.buttonKeyDownEvent.emit(event);
  };

  render() {
    const {
      ariaActiveDescendant,
      ariaExpanded,
      ariaControls,
      buttonText,
      handleButtonClickEvent,
      handleButtonFocusEvent,
      handleButtonKeyDownEvent,
      handleInputBlurEvent,
      handleInputChangeEvent,
      handleInputClickEvent,
      handleInputFocusEvent,
      handleInputKeyDownEvent,
      hideButton,
      inputValue,
      label,
    } = this;

    return (
      <Host>
        <input
          id="va-search-input"
          aria-activedescendant={ariaActiveDescendant}
          aria-autocomplete="none"
          aria-controls={ariaControls}
          aria-expanded={ariaExpanded}
          aria-haspopup="listbox"
          aria-label={label}
          autocomplete="off"
          onBlur={handleInputBlurEvent}
          onChange={handleInputChangeEvent}
          onClick={handleInputClickEvent}
          onFocus={handleInputFocusEvent}
          onKeyDown={handleInputKeyDownEvent}
          role="combobox"
          type="text"
          value={inputValue}
        />
        {!hideButton && (
          <button
            id="va-search-button"
            type="submit"
            aria-label={label}
            onClick={handleButtonClickEvent}
            onFocus={handleButtonFocusEvent}
            onKeyDown={handleButtonKeyDownEvent}
          >
            <i aria-hidden="true" class="fa fa-search" />
            {buttonText && <span id="va-search-button-text">{buttonText}</span>}
          </button>
        )}
      </Host>
    );
  }
}
