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
  @Element() el: HTMLElement;
  inputRef!: HTMLInputElement;

  /**
   * An array of suggestions with suggested text bolded
   */
  @State() formattedSuggestions: string[] = [];

  /**
   * A boolean indicating whether listbox is open or closed
   */
  @State() isListboxOpen: boolean;

  /**
   * Text displayed inside the search button
   */
  @Prop() buttonText?: string;

  /**
   * The aria-label for search input and button. Default is 'Search'.
   */
  @Prop() label?: string = 'Search';

  /**
   * An array of strings containing suggestions to be displayed in listbox
   */
  @Prop() suggestions?: any;

  /**
   * The value of the input field
   */
  @Prop() value?: string;

  /**
   * If suggestions are provided, then format suggestions and open the listbox
   */
  componentDidLoad() {
    if (!this.suggestions || !Array.isArray(this.suggestions)) return;
    this.formattedSuggestions = this.suggestions
      .sort()
      .map(suggestion => this.formatSuggestion(suggestion));
    this.isListboxOpen = true;
  }

  /**
   * If suggestions are provided, then format suggestions and open the listbox
   */
  @Watch('suggestions')
  watchSuggestionsHandler(newSuggestions: string[]) {
    if (!Array.isArray(newSuggestions)) return;
    this.formattedSuggestions = newSuggestions
      .sort()
      .map(suggestion => this.formatSuggestion(suggestion));
    this.isListboxOpen = true;
  }

  // Host event handlers
  /**
   * Closes listbox when focus is outside of the host element
   */
  private handleBlur = () => {
    if (!this.formattedSuggestions.length) return;
    this.isListboxOpen = false;
  };

  /**
   * Fires a submit event if search input has a value
   */
  private handleSubmit = () => {
    if (!this.inputRef.value) return;
    this.el.dispatchEvent(
      new CustomEvent('submit', {
        bubbles: true,
        cancelable: true,
        detail: { value: this.inputRef.value },
      }),
    );
  };

  // Input event handlers
  /**
   * Opens listbox when search input has focus and suggestions are provided
   */
  private handleInputFocus = () => {
    if (this.formattedSuggestions.length && !this.isListboxOpen) {
      this.isListboxOpen = true;
    }
  };

  /**
   * Implements keyboard interface from Keyboard Support at
   * https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.1pattern/listbox-combo.html
   *
   * Enter key was added to attempt to fire submit event.
   * Tab key was added to aid in isListboxOpen state management.
   */
  private handleInputKeyDown = (event: KeyboardEvent) => {
    const options = this.el.shadowRoot.querySelectorAll(
      '[role="option"]',
    ) as NodeListOf<HTMLLIElement>;
    const firstOption = options[0];
    const lastOption = options[options.length - 1];

    switch (event.key) {
      case 'ArrowDown':
        if (!firstOption) return;
        this.selectSuggestion(firstOption);
        break;
      case 'ArrowUp':
        if (!lastOption) return;
        this.selectSuggestion(lastOption);
        break;
      case 'Enter':
        this.handleSubmit();
        break;
      case 'Escape':
        this.inputRef.value = '';
        break;
      case 'Tab':
        this.isListboxOpen = false;
        break;
      default:
        break;
    }
  };

  // Button event handlers
  /**
   * Attempts to fire a submit event when search button is clicked
   */
  private handleButtonClick = () => {
    this.handleSubmit();
  };

  // Listbox event handlers
  /**
   * Sets search input value to the suggestion clicked,
   * removes aria-selected from previously selected suggestion if it exists,
   * closes the listbox and attempts to fire a submit event.
   */
  private handleListboxClick = (index: number) => {
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
    this.handleSubmit();
  };

  /**
   * Implements keyboard interface from Keyboard Support and guidance from Role, Property, State, and Tabindex Attribute at
   * https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.1pattern/listbox-combo.html
   *
   * Enter key was modified to also attempt to fire a submit event.
   */
  private handleListboxKeyDown = (event: KeyboardEvent, index: number) => {
    const options = this.el.shadowRoot.querySelectorAll(
      '[role="option"]',
    ) as NodeListOf<HTMLLIElement>;

    switch (event.key) {
      case 'ArrowUp':
        const lastOption = options[options.length - 1];
        if (index === 0) {
          if (!lastOption) return;
          this.selectSuggestion(lastOption);
        } else {
          if (!options[index - 1]) return;
          this.selectSuggestion(options[index - 1]);
        }
        break;
      case 'ArrowDown':
        const firstOption = options[0];
        if (index === options.length - 1) {
          if (!firstOption) return;
          this.selectSuggestion(firstOption);
        } else {
          if (!options[index + 1]) return;
          this.selectSuggestion(options[index + 1]);
        }
        break;
      case 'Enter':
        this.inputRef.value = options[index].innerText;
        this.inputRef.focus();
        this.inputRef.removeAttribute('aria-activedescendant');
        this.isListboxOpen = false;
        this.handleSubmit();
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
  private selectSuggestion = (suggestion: HTMLLIElement) => {
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
      handleButtonClick,
      handleInputFocus,
      handleInputKeyDown,
      handleListboxClick,
      handleListboxKeyDown,
      isListboxOpen,
      label,
      value,
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
          onFocus={handleInputFocus}
          onKeyDown={handleInputKeyDown}
          role={role}
          type={type}
          value={value}
        />
        <button
          id="va-search-button"
          type="submit"
          aria-label={label}
          onClick={handleButtonClick}
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
                    onClick={() => handleListboxClick(index)}
                    onKeyDown={e => handleListboxKeyDown(e, index)}
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
