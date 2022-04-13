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
   * Text displayed inside the search button
   */
  @Prop() buttonText?: string;

  /**
   * Initial value of input
   */
  @Prop() inputValue?: string;

  /**
   * The aria-label for search input and button. Default is 'Search'.
   */
  @Prop() label: string = 'Search';

  // Input Event Handlers
  private handleInputBlurEvent = (event: FocusEvent) => {
    this.inputBlurEvent.emit(event);
  };

  private handleInputChangeEvent = (event: Event) => {
    this.inputChangeEvent.emit(event);
  };

  private handleInputFocusEvent = (event: FocusEvent) => {
    this.inputFocusEvent.emit(event);
  };

  private handleInputKeyDownEvent = (event: KeyboardEvent) => {
    this.inputKeyDownEvent.emit(event);
  };

  // Button Event Handlers
  private handleButtonClickEvent = (event: KeyboardEvent | MouseEvent) => {
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
      buttonText,
      handleButtonClickEvent,
      handleButtonFocusEvent,
      handleButtonKeyDownEvent,
      handleInputBlurEvent,
      handleInputChangeEvent,
      handleInputFocusEvent,
      handleInputKeyDownEvent,
      inputValue,
      label,
    } = this;

    return (
      <Host>
        <input
          id="va-search-input"
          aria-activedescendant={this.el.getAttribute('aria-activedescendant')}
          aria-autocomplete="none"
          aria-controls={this.el.getAttribute('aria-controls')}
          aria-expanded={this.el.getAttribute('aria-expanded')}
          aria-haspopup={this.el.getAttribute('aria-haspopup')}
          aria-label={label}
          autocomplete="off"
          onBlur={handleInputBlurEvent}
          onChange={handleInputChangeEvent}
          onFocus={handleInputFocusEvent}
          onKeyDown={handleInputKeyDownEvent}
          role={this.el.getAttribute('role')}
          type="text"
          value={inputValue}
        />
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
      </Host>
    );
  }
}
