import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  Host,
  h,
  Prop,
  State,
  Watch,
} from '@stencil/core';

@Component({
  tag: 'va-search',
  styleUrl: 'va-search.css',
  shadow: true,
})
export class VaSearch {
  inputRef!: HTMLInputElement;

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
   * An array of formatted suggestions
   */
  @State() formattedSuggestions: string[] = [];

  /**
   * Index of selected suggestion
   */
  @Prop() activeIndex?: number;

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

  componentDidLoad() {
    if (!this.suggestions || !Array.isArray(this.suggestions)) return;
    this.formattedSuggestions = this.suggestions.map(suggestion =>
      this.formatSuggestion(suggestion),
    );
  }

  @Watch('suggestions')
  watchSuggestionsHandler(newSuggestions: string[]) {
    if (!Array.isArray(newSuggestions)) return;
    this.formattedSuggestions = newSuggestions.map(suggestion =>
      this.formatSuggestion(suggestion),
    );
  }

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

  /**
   * Formats suggested characters to bold
   */
  private formatSuggestion = (suggestion: string) => {
    const lowercaseSuggestion = suggestion.toLowerCase();
    const inputValue = this.inputRef.value.toLowerCase();
    if (lowercaseSuggestion.includes(inputValue)) {
      return (
        <Fragment>
          {inputValue}
          <strong>{lowercaseSuggestion.replace(inputValue, '')}</strong>
        </Fragment>
      );
    }
    return <strong>{suggestion}</strong>;
  };

  render() {
    const {
      activeIndex,
      buttonText,
      formattedSuggestions,
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
    } = this;

    const showSuggestions =
      Array.isArray(formattedSuggestions) && formattedSuggestions.length > 0;
    const ariaControls = showSuggestions
      ? 'va-search-listbox'
      : this.el.getAttribute('aria-controls');
    const ariaHasPopup = showSuggestions
      ? 'listbox'
      : this.el.getAttribute('aria-haspopup');
    const role = showSuggestions ? 'combobox' : this.el.getAttribute('role');

    return (
      <Host>
        <input
          ref={el => (this.inputRef = el as HTMLInputElement)}
          id="va-search-input"
          aria-activedescendant={this.el.getAttribute('aria-activedescendant')}
          aria-autocomplete="none"
          aria-controls={ariaControls}
          aria-expanded={this.el.getAttribute('aria-expanded')}
          aria-haspopup={ariaHasPopup}
          aria-label={label}
          autocomplete="off"
          onBlur={handleInputBlurEvent}
          onChange={handleInputChangeEvent}
          onFocus={handleInputFocusEvent}
          onKeyDown={handleInputKeyDownEvent}
          role={role}
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
            {formattedSuggestions.map(
              (suggestion: string | HTMLElement, index: number) => {
                return (
                  <div
                    aria-selected={activeIndex === index ? 'true' : undefined}
                    aria-hidden="true"
                    class="va-search-suggestion"
                    onClick={handleSuggestionClickEvent}
                    onFocus={handleSuggestionFocusEvent}
                    onKeyDown={handleSuggestionKeyDownEvent}
                    onMouseDown={handleSuggestionMouseDownEvent}
                    onMouseOver={handleSuggestionMouseOverEvent}
                    role="option"
                    tabIndex={0}
                  >
                    {suggestion}
                  </div>
                );
              },
            )}
          </div>
        )}
      </Host>
    );
  }
}
