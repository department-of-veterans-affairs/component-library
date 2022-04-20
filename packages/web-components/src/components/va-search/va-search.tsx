import {
  Component,
  Element,
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
   * A boolean indicating whether listbox is open or closed
   */
  @State() isListboxOpen: boolean;

  /**
   * An array of formatted suggestions
   */
  @State() formattedSuggestions: string[] = [];

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
   * An array of strings containing suggestions
   */
  @Prop() suggestions: any;

  componentDidLoad() {
    if (!this.suggestions || !Array.isArray(this.suggestions)) return;
    this.formattedSuggestions = this.suggestions
      .sort()
      .map(suggestion => this.formatSuggestion(suggestion));
    this.isListboxOpen = true;
  }

  @Watch('suggestions')
  watchSuggestionsHandler(newSuggestions: string[]) {
    if (!Array.isArray(newSuggestions)) return;
    this.formattedSuggestions = newSuggestions
      .sort()
      .map(suggestion => this.formatSuggestion(suggestion));
    this.isListboxOpen = true;
  }

  private handleBlur = () => {
    if (!this.formattedSuggestions.length) return;
    this.isListboxOpen = false;
  };

  private submit = () => {
    this.el.dispatchEvent(
      new CustomEvent('submit', {
        bubbles: true,
        cancelable: true,
        detail: { value: this.inputRef.value },
      }),
    );
  };

  // Input Event Handlers
  private handleInputFocusEvent = () => {
    if (this.formattedSuggestions.length && !this.isListboxOpen) {
      this.isListboxOpen = true;
    }
  };

  private handleInputKeyDownEvent = (event: KeyboardEvent) => {
    const options = this.el.shadowRoot.querySelectorAll('[role="option"]');
    const firstOption = options[0] as HTMLDivElement;
    const lastOption = options[options.length - 1] as HTMLDivElement;

    if (event.key === 'ArrowDown') {
      if (!firstOption) return;
      this.selectSuggestion(firstOption);
    }

    // if escape key, clear input
    if (event.key === 'Escape') {
      this.inputRef.value = '';
    }

    // if up arrow, select last element
    if (event.key === 'ArrowUp') {
      if (!lastOption) return;
      this.selectSuggestion(lastOption);
    }

    // submit
    if (event.key === 'Enter') {
      this.submit();
    }

    // close listbox on tab
    if (event.key === 'Tab') {
      this.isListboxOpen = false;
    }
  };

  // Button Event Handlers
  private handleButtonClickEvent = () => {
    this.submit();
  };

  // Suggestions Event Handlers
  private handleSuggestionClickEvent = (index: number) => {
    const suggestion = this.el.shadowRoot.getElementById(
      `listbox-option-${index}`,
    );
    if (!suggestion) return;
    const selectedSuggestion = this.el.shadowRoot.querySelector(
      '[aria-selected="true"]',
    );
    if (selectedSuggestion) selectedSuggestion.removeAttribute('aria-selected');
    this.inputRef.value = suggestion.innerText;
    this.isListboxOpen = false;

    this.submit();
  };

  private handleSuggestionKeyDownEvent = (
    event: KeyboardEvent,
    index: number,
  ) => {
    const options = this.el.shadowRoot.querySelectorAll('[role="option"]');

    switch (event.key) {
      case 'ArrowUp':
        const lastOption = options[options.length - 1] as HTMLDivElement;
        if (index === 0) {
          if (!lastOption) return;
          this.selectSuggestion(lastOption);
        } else {
          if (!options[index - 1]) return;
          this.selectSuggestion(options[index - 1]);
        }
        break;
      case 'ArrowDown':
        const firstOption = options[0] as HTMLDivElement;
        if (index === options.length - 1) {
          if (!firstOption) return;
          this.selectSuggestion(firstOption);
        } else {
          if (!options[index + 1]) return;
          this.selectSuggestion(options[index + 1]);
        }
        break;
      case 'Enter':
        this.inputRef.value = (options[index] as HTMLElement).innerText;
        this.inputRef.focus();
        this.inputRef.removeAttribute('aria-activedescendant');
        this.isListboxOpen = false;
        this.submit();
        break;
      case 'Escape':
        this.inputRef.value = '';
        this.inputRef.focus();
        this.inputRef.removeAttribute('aria-activedescendant');
        this.isListboxOpen = false;
        break;
      case 'Home':
        this.inputRef.focus();
        this.inputRef.setSelectionRange(0, 0);
        break;
      case 'ArrowRight':
      case 'End':
        this.inputRef.focus();
        this.inputRef.setSelectionRange(
          this.inputRef.value.length + 1,
          this.inputRef.value.length + 1,
        );
        break;
      case 'ArrowLeft':
        this.inputRef.focus();
        this.inputRef.setSelectionRange(
          this.inputRef.value.length,
          this.inputRef.value.length,
        );
        break;
      default:
        this.inputRef.focus();
        break;
    }
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

  /**
   * Focuses a suggestion, sets its aria-selected attribute to true, updates aria-activedescendant on input
   * and removes aria-selected from previously selected option if it exists
   */
  private selectSuggestion = suggestion => {
    const selectedSuggestion = this.el.shadowRoot.querySelector(
      '[aria-selected="true"]',
    );
    if (selectedSuggestion) selectedSuggestion.removeAttribute('aria-selected');
    suggestion.focus();
    suggestion.setAttribute('aria-selected', 'true');
    this.inputRef.setAttribute('aria-activedescendant', suggestion.id);
  };

  render() {
    const {
      buttonText,
      formattedSuggestions,
      handleBlur,
      handleButtonClickEvent,
      handleInputFocusEvent,
      handleInputKeyDownEvent,
      handleSuggestionClickEvent,
      handleSuggestionKeyDownEvent,
      inputValue,
      isListboxOpen,
      label,
    } = this;

    const isCombobox = formattedSuggestions.length;
    const ariaControls = isCombobox ? 'va-search-listbox' : undefined;
    /**
     * If isCombobox is false, set aria-expanded to undefined
     * If isCombobox is true and isListboxOpen is true, set aria-expanded to "true"
     * If isCombobox is true but isListboxOpen is false, set aria-expanded to "false"
     */
    const ariaExpanded = isCombobox
      ? isListboxOpen
        ? 'true'
        : 'false'
      : undefined;
    const ariaHasPopup = isCombobox ? 'listbox' : undefined;
    const role = isCombobox ? 'combobox' : undefined;
    const type = this.el.getAttribute('type') || 'text';

    return (
      <Host onBlur={handleBlur}>
        <input
          ref={el => (this.inputRef = el as HTMLInputElement)}
          id="va-search-input"
          aria-autocomplete="none"
          aria-controls={ariaControls}
          aria-expanded={ariaExpanded}
          aria-haspopup={ariaHasPopup}
          aria-label={label}
          autocomplete="off"
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
        >
          <i aria-hidden="true" class="fa fa-search" />
          {buttonText && <span id="va-search-button-text">{buttonText}</span>}
        </button>
        {isListboxOpen && (
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
                    class="va-search-suggestion"
                    onClick={() => handleSuggestionClickEvent(index)}
                    onKeyDown={e => handleSuggestionKeyDownEvent(e, index)}
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
