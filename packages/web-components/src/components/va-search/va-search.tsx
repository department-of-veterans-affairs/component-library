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
   * Initial value of input
   */
  @Prop() inputValue?: string;

  /**
   * The aria-label for search input and button. Default is 'Search'.
   */
  @Prop() label: string = 'Search';

  /**
   * A boolean that controls whether suggestions are visible
   */
  @Prop() showSuggestions?: boolean;

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

    const options = this.el.shadowRoot.querySelectorAll('[role="option"]');
    const firstOption = options[0] as HTMLDivElement;
    const lastOption = options[options.length - 1] as HTMLDivElement;
    if (event.key === 'ArrowDown') {
      if (!firstOption) return;
      firstOption.focus();
      firstOption.setAttribute('aria-selected', 'true');
    }

    // if escape key, clear input
    if (event.key === 'Escape') {
      this.inputRef.value = '';
    }

    // if up arrow, select last element
    if (event.key === 'ArrowUp') {
      if (!lastOption) return;
      lastOption.focus();
      lastOption.setAttribute('aria-selected', 'true');
    }
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

  private handleSuggestionKeyDownEvent = (event, index) => {
    this.suggestionKeyDownEvent.emit(event);

    const options = this.el.shadowRoot.querySelectorAll('[role="option"]');
    const firstOption = options[0] as HTMLDivElement;
    const lastOption = options[options.length - 1] as HTMLDivElement;

    if (event.key === 'ArrowUp') {
      if (index === 0) {
        if (!lastOption) return;
        lastOption.focus();
        this.inputRef.setAttribute('aria-activedescendant', lastOption.id);
        firstOption.setAttribute('aria-selected', 'true');
      } else {
        // otherwise select the option before it
        (options[index - 1] as HTMLDivElement).focus();
        this.inputRef.setAttribute(
          'aria-activedescendant',
          options[index - 1].id,
        );
        options[index - 1].setAttribute('aria-selected', 'true');
      }
    }

    if (event.key === 'ArrowDown') {
      if (index === options.length - 1) {
        firstOption.focus();
        this.inputRef.setAttribute('aria-activedescendant', firstOption.id);
        firstOption.setAttribute('aria-selected', 'true');
      } else {
        this.inputRef.setAttribute(
          'aria-activedescendant',
          options[index + 1].id,
        );
        (options[index + 1] as HTMLDivElement).focus();
        options[index + 1].setAttribute('aria-selected', 'true');
      }
    }

    if (event.key === 'Enter') {
      this.inputRef.value = options[index].textContent;
      this.inputRef.focus();
      this.inputRef.setAttribute('aria-activedescendant', options[index].id);
    }

    if (event.key === 'Escape') {
      this.inputRef.value = '';
      this.inputRef.focus();
    }

    if (event.key === 'Home') {
      this.inputRef.focus();
      this.inputRef.setSelectionRange(0, 0);
    }

    if (event.key === 'End' || event.key === 'ArrowRight') {
      const length = this.inputRef.value.length;
      this.inputRef.focus();
      this.inputRef.setSelectionRange(length + 1, length + 1);
    }

    if (event.key === 'ArrowLeft') {
      const length = this.inputRef.value.length;
      this.inputRef.focus();
      this.inputRef.setSelectionRange(length, length);
    }

    // TODO: Printable Characters
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
      inputValue,
      label,
      showSuggestions,
    } = this;

    const isListboxVisible = showSuggestions && formattedSuggestions.length > 0;
    const ariaControls = showSuggestions ? 'va-search-listbox' : undefined;
    /**
     * If showSugestion is false, set aria-expanded to undefined
     * If showSuggestion is true and isListboxVisible is true, set aria-expanded to "true"
     * If showSuggestion is true but isListboxVisible is false, set aria-expanded to "false"
     */
    const ariaExpanded = showSuggestions
      ? isListboxVisible
        ? 'true'
        : 'false'
      : undefined;
    const ariaHasPopup = showSuggestions ? 'listbox' : undefined;
    const role = showSuggestions ? 'combobox' : undefined;
    const type = this.el.getAttribute('type') || 'text';

    return (
      <Host>
        <input
          ref={el => (this.inputRef = el as HTMLInputElement)}
          id="va-search-input"
          aria-autocomplete="none"
          aria-controls={ariaControls}
          aria-expanded={ariaExpanded}
          aria-haspopup={ariaHasPopup}
          aria-label={label}
          autocomplete="off"
          onBlur={handleInputBlurEvent}
          onChange={handleInputChangeEvent}
          onFocus={handleInputFocusEvent}
          onKeyDown={handleInputKeyDownEvent}
          role={role}
          type={type}
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
        {isListboxVisible && (
          <ul
            id="va-search-listbox"
            aria-label="Search Suggestions"
            role="listbox"
          >
            {formattedSuggestions.map(
              (suggestion: string | HTMLElement, index: number) => {
                return (
                  <li
                    id={`listbox-option-${index}`}
                    aria-selected={activeIndex === index ? 'true' : undefined}
                    aria-hidden="true"
                    class="va-search-suggestion"
                    onClick={handleSuggestionClickEvent}
                    onFocus={handleSuggestionFocusEvent}
                    onKeyDown={e => handleSuggestionKeyDownEvent(e, index)}
                    onMouseDown={handleSuggestionMouseDownEvent}
                    onMouseOver={handleSuggestionMouseOverEvent}
                    role="option"
                    tabIndex={-1}
                  >
                    {suggestion}
                  </li>
                );
              },
            )}
          </ul>
        )}
      </Host>
    );
  }
}
