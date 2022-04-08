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
   * Fires when a suggestion is clicked
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  suggestionClickEvent: EventEmitter;

  /**
   * Fires when a suggestion is focused
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  suggestionFocusEvent: EventEmitter;

  /**
   * Fires when a suggestion is focused and a key is pressed
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  suggestionKeyDownEvent: EventEmitter;

  /**
   * Fires when a suggestion is pressed
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  suggestionMouseDownEvent: EventEmitter;

  /**
   * Fires when user moves cursor over the suggestion
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  suggestionMouseOverEvent: EventEmitter;

  /**
   * Text displayed inside the search button
   */
  @Prop() buttonText?: string;

  /**
   * Hides the search button
   */
  @Prop() hideButton?: boolean = false;

  /**
   * Initial value of input
   */
  @Prop() inputValue?: string;

  /**
   * Adds an aria-label attribute to the input and button
   */
  @Prop() label: string = 'Search';

  /**
   * An array of strings containing suggestions
   */
  @Prop() suggestions: Array<string>;

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

  // Suggestions Event Handlers
  private handleSuggestionClickEvent = (event: KeyboardEvent | MouseEvent) => {
    this.suggestionClickEvent.emit(event);
  };

  private handleSuggestionFocusEvent = (event: FocusEvent) => {
    this.suggestionFocusEvent.emit(event);
  };

  private handleSuggestionKeyDownEvent = (event: KeyboardEvent) => {
    this.suggestionKeyDownEvent.emit(event);
  };

  private handleSuggestionMouseDownEvent = (event: MouseEvent) => {
    this.suggestionMouseDownEvent.emit(event);
  };

  private handleSuggestionMouseOverEvent = (event: MouseEvent) => {
    this.suggestionMouseOverEvent.emit(event);
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
      handleSuggestionClickEvent,
      handleSuggestionFocusEvent,
      handleSuggestionKeyDownEvent,
      handleSuggestionMouseDownEvent,
      handleSuggestionMouseOverEvent,
      hideButton,
      inputValue,
      label,
      suggestions,
    } = this;

    const showSuggestions =
      Array.isArray(suggestions) && suggestions.length > 0;

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
          type={this.el.getAttribute('type') || 'text'}
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
        {showSuggestions && (
          <div
            id="va-search-listbox"
            aria-label="Search Suggestions"
            role="listbox"
          >
            {suggestions.map(suggestion => {
              return (
                <div
                  aria-hidden="true"
                  onClick={handleSuggestionClickEvent}
                  onFocus={handleSuggestionFocusEvent}
                  onKeyDown={handleSuggestionKeyDownEvent}
                  onMouseDown={handleSuggestionMouseDownEvent}
                  onMouseOver={handleSuggestionMouseOverEvent}
                  role="option"
                  tabIndex={-1}
                >
                  {suggestion}
                </div>
              );
            })}
          </div>
        )}
      </Host>
    );
  }
}
