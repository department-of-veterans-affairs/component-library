import {
  Component,
  Element,
  Fragment,
  Host,
  h,
  Prop,
  State,
  Watch,
  EventEmitter,
  Event,
} from '@stencil/core';
import classnames from 'classnames';

/**
 * @componentName Search input
 * @maturityCategory use
 * @maturityLevel best_practice
 */

@Component({
  tag: 'va-search-input',
  styleUrl: 'va-search-input.scss',
  shadow: true,
})
export class VaSearchInput {
  @Element() el: HTMLElement;
  inputRef!: HTMLInputElement;

  /**
   * The event used to track usage of the component. This is emitted when the
   * search button is clicked and when blur occurs on the input field.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * An array of suggestions with suggested text bolded
   */
  @State() formattedSuggestions: string[] = [];

  /**
   * A boolean indicating whether listbox is open or closed
   */
  @State() isListboxOpen: boolean;

  /**
   * A boolean indicating whether listbox is open or closed
   */
  @State() isTouched: boolean = false;

  /**
   * Text displayed inside the search button
   */
  @Prop() buttonText?: string  = 'Search';

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
  @Prop({ mutable: true, reflect: true }) value?: string = '';
  // $('va-search-input').value will be correct
  // $('va-search-input').getAttribute('value') will be incorrect

  /**
   * If `true`, the component will use the big variant.
   */
  @Prop() big?: boolean = false;

  /**
   * If `true`, the component will use the small variant.
   */
  @Prop() small?: boolean = false;

  /**
   * If `true`, the component-library-analytics event is disabled.
   */
  @Prop() disableAnalytics?: boolean = false;


  /**
   * If `true`, clear button is shown
   */
  @State() showClearButton?: boolean = false;

  /**
   * Set the initial showClearButton value
   */
  componentWillLoad() {
    this.showClearButton = !!this.value;
  }

  /**
   * If suggestions are provided, then format suggestions and open the listbox.
   * Limits suggestions to 5 and sorts them.
   */
  componentDidLoad() {
    if (!Array.isArray(this.suggestions) || !this.suggestions?.length) return;
    this.updateSuggestions(this.suggestions);
  }

  /**
   * Fixes issue where submit event dispatches the initial value of value
   * instead of the current value of the input field.
   */
  @Watch('value')
  watchValueHandler() {
    this.value = this.inputRef.value;
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
   * and fires analytics event.
   */
  private handleBlur = () => {
    if (!this.disableAnalytics) {
      this.componentLibraryAnalytics.emit({
        componentName: 'va-search-input',
        action: 'blur',
        details: {
          value: this.value,
        },
      });
    }

    this.isTouched = false;
    this.isListboxOpen = false;
  };

  /**
   * Fires a submit and analytics events.
   */
  private handleSubmit = () => {
    const form = this.el.shadowRoot.querySelector('form');
    if (form) {
      form.onsubmit = (event) => {
        event.preventDefault();
      }
    }

    this.el.dispatchEvent(
      new SubmitEvent('submit', {
        bubbles: true,
        cancelable: true,
        composed: true,
      }),
    );

    if (!this.disableAnalytics) {
      this.componentLibraryAnalytics.emit({
        componentName: 'va-search-input',
        action: 'click',
        details: {
          value: this.value,
        },
      });
    }
  };

  // Input event handlers
  /**
   * Updates suggestion formatting as user types
   */
  private handleInput = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value;
    this.showClearButton = !!this.value;

    if (!this.suggestions) return;
    this.updateSuggestions(this.suggestions);
  };

  /**
   * Opens listbox when search input has focus and suggestions are provided
   */
  private handleInputFocus = () => {
    this.isTouched = true;
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

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        // Option doesn't exist if suggestions aren't provided
        if (!options?.length) return;
        const firstOption = options[0];
        this.selectSuggestion(firstOption);
        break;
      case 'ArrowUp':
        event.preventDefault();
        // Option doesn't exist if suggestions aren't provided
        if (!options?.length) return;
        const lastOption = options[options.length - 1];
        this.selectSuggestion(lastOption);
        break;
      case 'Enter':
        event.preventDefault();
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

  // clear the input and focus the input
  private handleClearButtonClick = () => {
    this.inputRef.value = '';
    this.inputRef.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        composed: true,
      }),
    );
    this.inputRef.focus();
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
    this.value = suggestion.innerText;
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
        event.preventDefault();
        if (index === 0) {
          this.selectSuggestion(options[options.length - 1]);
        } else {
          this.selectSuggestion(options[index - 1]);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (index === options.length - 1) {
          this.selectSuggestion(options[0]);
        } else {
          this.selectSuggestion(options[index + 1]);
        }
        break;
      case 'Enter':
        event.preventDefault();
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
        this.isTouched = false;
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
        event.preventDefault();
        this.inputRef.focus();
        this.inputRef.setSelectionRange(0, 0);
        break;
      case 'ArrowRight':
      case 'End':
        event.preventDefault();
        this.inputRef.focus();
        this.inputRef.setSelectionRange(
          this.inputRef.value.length + 1,
          this.inputRef.value.length + 1,
        );
        break;
      case 'ArrowLeft':
        event.preventDefault();
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
    return <strong>{lowercaseSuggestion}</strong>;
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

    // only open the listbox after the search input has been touched
    this.isTouched ? this.isListboxOpen = true : this.isListboxOpen = false;
  };

  render() {
    const {
      buttonText,
      formattedSuggestions,
      handleBlur,
      handleButtonClick,
      handleClearButtonClick,
      handleInput,
      handleInputFocus,
      handleInputKeyDown,
      handleListboxClick,
      handleListboxKeyDown,
      isListboxOpen,
      label,
      value,
      big,
      small,
      showClearButton,
    } = this;

    /**
     * If suggestions are provided, this component will be recognized as
     * a combobox. Used in determining what attributes should exist or be omitted on search input.
     */
    const isCombobox = formattedSuggestions.length;
    const ariaAutoComplete = isCombobox ? 'list' : undefined;
    /* eslint-disable-next-line i18next/no-literal-string */
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
    /* eslint-disable i18next/no-literal-string */
    const ariaHasPopup = isCombobox ? 'listbox' : undefined;
    const role = isCombobox ? 'combobox' : undefined;
    /* eslint-enable i18next/no-literal-string */

    const formClasses = classnames({
      'usa-search': true,
      'usa-search--big': big && !small,
      'usa-search--small': small && !big,
    });
    const clearButtonClasses = classnames({
      'usa-search__clear-input': true,
      'usa-search__clear-input_empty': !showClearButton
    });
    return (
      <Host onBlur={handleBlur}>
        <form class={formClasses} role="search">
          <label class="usa-sr-only" htmlFor="search-field">
            {label}
          </label>
          <div class='usa-search__input-wrapper'>
            <input
              class="usa-input"
              id="search-field"
              name="search"
              type="search"
              ref={el => (this.inputRef = el as HTMLInputElement)}
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
              value={value}
            />
            <button type="button" onClick={handleClearButtonClick} class={clearButtonClasses} aria-label="Clear the search contents">
              <va-icon
                class="usa-search__clear-icon"
                icon="close"
                size={3}
              />
            </button>
            <button
              class="usa-button"
              type="submit"
              onClick={handleButtonClick}
            >
              {!small && (
                <span class="usa-search__submit-text">{buttonText}</span>
              )}
              <va-icon
                class="usa-search__submit-icon"
                icon="search"
                size={3}
                srtext="Search"
              ></va-icon>
            </button>
          </div>
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
        </form>
      </Host>
    );
  }
}
