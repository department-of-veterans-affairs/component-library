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
  tag: 'va-search-input',
  styleUrl: 'va-search-input.css',
  shadow: true,
})
export class VaSearchInput {
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
   * An array of strings containing suggestions to be displayed in listbox.
   * This component displays up to 5 suggestions.
   */
  @Prop() suggestions?: any;

  /**
   * The value of the input field
   */
  @Prop() value?: string = '';

  /**
   * If suggestions are provided, then format suggestions and open the listbox.
   * Limits suggestions to 5 and sorts them.
   */
  componentDidLoad() {
    if (!Array.isArray(this.suggestions) || !this.suggestions?.length) return;
    this.updateSuggestions(this.suggestions);
  }

  /**
   * If suggestions are provided, then format suggestions and open the listbox.
   * Limits suggestions to 5 and sorts them.
   */
  @Watch('suggestions')
  watchSuggestionsHandler(newSuggestions: string[]) {
    if (!Array.isArray(newSuggestions)) return;
    this.updateSuggestions(newSuggestions);
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
   * Fires a submit event
   */
  private handleSubmit = () => {
    this.el.dispatchEvent(
      new CustomEvent('submit', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: { value: this.inputRef.value },
      }),
    );
  };

  // Input event handlers
  /**
   * Updates suggestion formatting as user types
   */
  private handleInput = () => {
    if (!this.suggestions) return;
    this.updateSuggestions(this.suggestions);
  };

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
   * Enter key was added to fire a submit event.
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
        // Option doesn't exist if suggestions aren't provided
        if (!firstOption) return;
        this.selectSuggestion(firstOption);
        break;
      case 'ArrowUp':
        // Option doesn't exist if suggestions aren't provided
        if (!lastOption) return;
        this.selectSuggestion(lastOption);
        break;
      case 'Enter':
        this.handleSubmit();
        break;
      case 'Escape':
        this.inputRef.value = '';
        this.inputRef.dispatchEvent(
          new InputEvent('input', {
            bubbles: true,
            composed: true,
          }),
        );
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
   * Fires a submit event when search button is clicked
   */
  private handleButtonClick = () => {
    this.handleSubmit();
  };

  // Listbox event handlers
  /**
   * Sets search input value to the suggestion clicked,
   * closes the listbox and fires a submit event.
   */
  private handleListboxClick = (index: number) => {
    const suggestion = this.el.shadowRoot.getElementById(
      `listbox-option-${index}`,
    );
    this.inputRef.value = suggestion.innerText;
    this.inputRef.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        composed: true,
      }),
    );
    this.inputRef.removeAttribute('aria-activedescendant');
    this.isListboxOpen = false;
    this.handleSubmit();
  };

  /**
   * Implements keyboard interface from Keyboard Support and guidance from Role, Property, State, and Tabindex Attribute at
   * https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.1pattern/listbox-combo.html
   *
   * Enter key was modified to also fire a submit event.
   */
  private handleListboxKeyDown = (event: KeyboardEvent, index: number) => {
    const options = this.el.shadowRoot.querySelectorAll(
      '[role="option"]',
    ) as NodeListOf<HTMLLIElement>;

    switch (event.key) {
      case 'ArrowUp':
        if (index === 0) {
          this.selectSuggestion(options[options.length - 1]);
        } else {
          this.selectSuggestion(options[index - 1]);
        }
        break;
      case 'ArrowDown':
        if (index === options.length - 1) {
          this.selectSuggestion(options[0]);
        } else {
          this.selectSuggestion(options[index + 1]);
        }
        break;
      case 'Enter':
        this.inputRef.value = options[index].innerText;
        this.inputRef.dispatchEvent(
          new InputEvent('input', {
            bubbles: true,
            composed: true,
          }),
        );
        this.inputRef.focus();
        this.inputRef.removeAttribute('aria-activedescendant');
        this.isListboxOpen = false;
        this.handleSubmit();
        break;
      case 'Escape':
        this.inputRef.value = '';
        this.inputRef.dispatchEvent(
          new InputEvent('input', {
            bubbles: true,
            composed: true,
          }),
        );
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
    selectedSuggestion?.removeAttribute('aria-selected');
    suggestion.focus();
    suggestion.setAttribute('aria-selected', 'true');
    this.inputRef.setAttribute('aria-activedescendant', suggestion.id);
  };

  /**
   * Updates formatting for all suggestions
   */
  private updateSuggestions = (suggestionsArr: string[]) => {
    // If it's an empty array, reset formatted suggestions and close the listbox
    if (!suggestionsArr.length) {
      this.formattedSuggestions = [];
      this.isListboxOpen = false;
      return;
    }

    this.formattedSuggestions = suggestionsArr
      .slice(0, 5)
      .sort()
      .map(suggestion => this.formatSuggestion(suggestion));
    this.isListboxOpen = true;
  };

  render() {
    const {
      buttonText,
      formattedSuggestions,
      handleBlur,
      handleButtonClick,
      handleInput,
      handleInputFocus,
      handleInputKeyDown,
      handleListboxClick,
      handleListboxKeyDown,
      isListboxOpen,
      label,
      value,
    } = this;

    /**
     * If suggestions are provided, this component will be recognized as
     * a combobox. Used in determining what attributes should exist or be omitted on search input.
     */
    const isCombobox = formattedSuggestions.length;
    const ariaAutoComplete = isCombobox ? 'list' : 'none';
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
          aria-autocomplete={ariaAutoComplete}
          aria-controls={ariaControls}
          aria-expanded={ariaExpanded}
          aria-haspopup={ariaHasPopup}
          aria-label={label}
          autocomplete="off"
          onFocus={handleInputFocus}
          onInput={handleInput}
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
