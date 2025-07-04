import keymap from 'receptor/keymap';
import selectOrMatches from '@uswds/uswds/packages/uswds-core/src/js/utils/select-or-matches';
import behavior from '@uswds/uswds/packages/uswds-core/src/js/utils/behavior';
import Sanitizer from '@uswds/uswds/packages/uswds-core/src/js/utils/sanitizer';
import { CLICK } from '@uswds/uswds/packages/uswds-core/src/js/events';

const PREFIX = 'usa';

const COMBO_BOX_CLASS = `${PREFIX}-combo-box`;
const COMBO_BOX_PRISTINE_CLASS = `${COMBO_BOX_CLASS}--pristine`;
const SELECT_CLASS = `${COMBO_BOX_CLASS}__select`;
const INPUT_CLASS = `${COMBO_BOX_CLASS}__input`;
const CLEAR_INPUT_BUTTON_CLASS = `${COMBO_BOX_CLASS}__clear-input`;
const CLEAR_INPUT_BUTTON_WRAPPER_CLASS = `${CLEAR_INPUT_BUTTON_CLASS}__wrapper`;
const INPUT_BUTTON_SEPARATOR_CLASS = `${COMBO_BOX_CLASS}__input-button-separator`;
const TOGGLE_LIST_BUTTON_CLASS = `${COMBO_BOX_CLASS}__toggle-list`;
const TOGGLE_LIST_BUTTON_WRAPPER_CLASS = `${TOGGLE_LIST_BUTTON_CLASS}__wrapper`;
const LIST_CLASS = `${COMBO_BOX_CLASS}__list`;
const LIST_OPTION_CLASS = `${COMBO_BOX_CLASS}__list-option`;
const LIST_OPTION_GROUP_CLASS = `${LIST_OPTION_CLASS}--group`;
const LIST_OPTION_GROUP_OPTION_CLASS = `${LIST_OPTION_CLASS}--group-option`;
const LIST_OPTION_FOCUSED_CLASS = `${LIST_OPTION_CLASS}--focused`;
const LIST_OPTION_SELECTED_CLASS = `${LIST_OPTION_CLASS}--selected`;
const STATUS_CLASS = `${COMBO_BOX_CLASS}__status`;
const ERROR_CLASS = `usa-input--error`;

const COMBO_BOX = `.${COMBO_BOX_CLASS}`;
const SELECT = `.${SELECT_CLASS}`;
const INPUT = `.${INPUT_CLASS}`;
const CLEAR_INPUT_BUTTON = `.${CLEAR_INPUT_BUTTON_CLASS}`;
const TOGGLE_LIST_BUTTON = `.${TOGGLE_LIST_BUTTON_CLASS}`;
const LIST = `.${LIST_CLASS}`;
const LIST_OPTION = `.${LIST_OPTION_CLASS}`;
const LIST_OPTION_FOCUSED = `.${LIST_OPTION_FOCUSED_CLASS}`;
const LIST_OPTION_SELECTED = `.${LIST_OPTION_SELECTED_CLASS}`;
const STATUS = `.${STATUS_CLASS}`;

const DEFAULT_FILTER = '.*{{query}}.*';

const noop = () => {};

  /**
   * set the value of the element and dispatch a change event
   *
   * @param {HTMLInputElement|HTMLSelectElement} el The element to update
   * @param {string} value The new value of the element
   */
  const changeElementValue = (el, value = '') => {
    const elementToChange = el;
    elementToChange.value = value;

    const event = new CustomEvent('change', {
      bubbles: true,
      cancelable: true,
      detail: { value },
    });
    elementToChange.dispatchEvent(event);
  };

  /**
   * The elements within the combo box.
   * @typedef {Object} ComboBoxContext
   * @property {HTMLElement} comboBoxEl
   * @property {HTMLSelectElement} selectEl
   * @property {HTMLInputElement} inputEl
   * @property {HTMLUListElement} listEl
   * @property {HTMLDivElement} statusEl
   * @property {HTMLLIElement} focusedOptionEl
   * @property {HTMLLIElement} selectedOptionEl
   * @property {HTMLButtonElement} toggleListBtnEl
   * @property {HTMLButtonElement} clearInputBtnEl
   * @property {boolean} isPristine
   * @property {boolean} disableFiltering
   */

  /**
   * Get an object of elements belonging directly to the given
   * combo box component.
   *
   * @param {HTMLElement} el the element within the combo box
   * @returns {ComboBoxContext} elements
   */
  const getComboBoxContext = el => {
    const comboBoxEl = el.closest(COMBO_BOX);

    if (!comboBoxEl) {
      throw new Error(`Element is missing outer ${COMBO_BOX}`);
    }

    const selectEl = comboBoxEl.querySelector(SELECT);
    const inputEl = comboBoxEl.querySelector(INPUT);
    const listEl = comboBoxEl.querySelector(LIST);
    const statusEl = comboBoxEl.querySelector(STATUS);
    const focusedOptionEl = comboBoxEl.querySelector(LIST_OPTION_FOCUSED);
    const selectedOptionEl = comboBoxEl.querySelector(LIST_OPTION_SELECTED);
    const toggleListBtnEl = comboBoxEl.querySelector(TOGGLE_LIST_BUTTON);
    const clearInputBtnEl = comboBoxEl.querySelector(CLEAR_INPUT_BUTTON);

    const isPristine = comboBoxEl.classList.contains(COMBO_BOX_PRISTINE_CLASS);
    const disableFiltering = comboBoxEl.dataset.disableFiltering === 'true';

    return {
      comboBoxEl,
      selectEl,
      inputEl,
      listEl,
      statusEl,
      focusedOptionEl,
      selectedOptionEl,
      toggleListBtnEl,
      clearInputBtnEl,
      isPristine,
      disableFiltering,
    };
  };

  /**
   * Disable the combo-box component
   *
   * @param {HTMLInputElement} el An element within the combo box component
   */
  const disable = el => {
    const { inputEl, toggleListBtnEl, clearInputBtnEl } =
      getComboBoxContext(el);

    clearInputBtnEl.hidden = true;
    clearInputBtnEl.disabled = true;
    toggleListBtnEl.disabled = true;
    inputEl.disabled = true;
  };

  /**
   * Check for aria-disabled on initialization
   *
   * @param {HTMLInputElement} el An element within the combo box component
   */
  const ariaDisable = el => {
    const { inputEl, toggleListBtnEl, clearInputBtnEl } =
      getComboBoxContext(el);

    clearInputBtnEl.hidden = true;
    clearInputBtnEl.setAttribute('aria-disabled', true);
    toggleListBtnEl.setAttribute('aria-disabled', true);
    inputEl.setAttribute('aria-disabled', true);
  };

  /**
   * Enable the combo-box component
   *
   * @param {HTMLInputElement} el An element within the combo box component
   */
  const enable = el => {
    const { inputEl, toggleListBtnEl, clearInputBtnEl } =
      getComboBoxContext(el);

    clearInputBtnEl.hidden = false;
    clearInputBtnEl.disabled = false;
    toggleListBtnEl.disabled = false;
    inputEl.disabled = false;
  };

  const handleMouseUp = (event) => {
    const target = event.target;
    if (target.selectionStart === target.selectionEnd) {
      target.select(); // Select all text if nothing is selected
    }
  };

  /**
   * Enhance a select element into a combo box component.
   *
   * @param {HTMLElement} _comboBoxEl The initial element of the combo box component
   */
  const enhanceComboBox = (_comboBoxEl, _labelEl, initValue) => {
    const comboBoxEl = _comboBoxEl.closest(COMBO_BOX);

    if (comboBoxEl.dataset.enhanced) return;

    const selectEl = comboBoxEl.querySelector('select');

    if (!selectEl) {
      throw new Error(`${COMBO_BOX} is missing inner select`);
    }

    const selectId = selectEl.id;
    const selectLabel = _labelEl;
    const listId = `${selectId}--list`;
    const listIdLabel = `${selectId}-label`;
    const assistiveHintID = `${selectId}--assistiveHint`;
    const additionalAttributes = [];
    const { defaultValue } = comboBoxEl.dataset;
    const { placeholder } = comboBoxEl.dataset;
    let selectedOption;

    if (placeholder) {
      additionalAttributes.push({ placeholder });
    }

    if (defaultValue) {
      for (let i = 0, len = selectEl.options.length; i < len; i += 1) {
        const optionEl = selectEl.options[i];

        if (optionEl.value === defaultValue) {
          selectedOption = optionEl;
          break;
        }
      }
    }

    /**
     * Throw error if combobox is missing a label or label is missing
     * `for` attribute. Otherwise, set the ID to match the <ul> aria-labelledby
     */
    if (!selectLabel || !selectLabel.matches(`label[for="${selectId}"]`)) {
      throw new Error(
        `${COMBO_BOX} for ${selectId} is either missing a label or a "for" attribute`,
      );
    } else {
      selectLabel.setAttribute('id', listIdLabel);
    }

    selectLabel.setAttribute('id', listIdLabel);
    selectEl.setAttribute('aria-hidden', 'true');
    selectEl.setAttribute('tabindex', '-1');
    selectEl.classList.add('usa-sr-only', SELECT_CLASS);
    selectEl.id = '';
    selectEl.value = '';

    ['required', 'aria-label', 'aria-labelledby'].forEach(name => {
      if (selectEl.hasAttribute(name)) {
        const value = selectEl.getAttribute(name);
        additionalAttributes.push({ [name]: value });
        selectEl.removeAttribute(name);
      }
    });

    // sanitize doesn't like functions in template literals
    const input = document.createElement('input');
    input.setAttribute('id', selectId);
    input.setAttribute('aria-owns', listId);
    input.setAttribute('aria-controls', listId);
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-describedby', assistiveHintID);
    input.setAttribute('aria-expanded', 'false');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('class', INPUT_CLASS);
    input.setAttribute('type', 'text');
    input.setAttribute('role', 'combobox');
    input.onmouseup = handleMouseUp;
    additionalAttributes.forEach(attr =>
      Object.keys(attr).forEach(key => {
        const value = Sanitizer.escapeHTML`${attr[key]}`;
        input.setAttribute(key, value);
      }),
    );

    // Check for the error state and add the error class if needed
    if (comboBoxEl.dataset.error === 'true') {
      input.classList.add(ERROR_CLASS);
    }

    comboBoxEl.insertAdjacentElement('beforeend', input);

    comboBoxEl.insertAdjacentHTML(
      'beforeend',
      Sanitizer.escapeHTML`
    <span class="${CLEAR_INPUT_BUTTON_WRAPPER_CLASS}" tabindex="-1">
        <button type="button" class="${CLEAR_INPUT_BUTTON_CLASS}" aria-label="Clear the select contents">&nbsp;</button>
      </span>
      <span class="${INPUT_BUTTON_SEPARATOR_CLASS}">&nbsp;</span>
      <span class="${TOGGLE_LIST_BUTTON_WRAPPER_CLASS}" tabindex="-1">
        <button type="button" tabindex="-1" class="${TOGGLE_LIST_BUTTON_CLASS}" aria-label="Toggle the dropdown list">&nbsp;</button>
      </span>
      <ul
        tabindex="-1"
        id="${listId}"
        class="${LIST_CLASS}"
        role="listbox"
        aria-labelledby="${listIdLabel}"
        hidden>
      </ul>
      <div class="${STATUS_CLASS} usa-sr-only" role="status"></div>`,
    );

    //Sanitizer does not allow conditional rendering of elements
    // this approach allows tests to pass
    if (comboBox.isInVaInputTelephone) {
      comboBoxEl.querySelector(`:scope > span.${CLEAR_INPUT_BUTTON_WRAPPER_CLASS}`).remove();
    }


    if (selectedOption) {
      const { inputEl } = getComboBoxContext(comboBoxEl);
      changeElementValue(selectEl, selectedOption.value);
      changeElementValue(inputEl, selectedOption.text);
      comboBoxEl.classList.add(COMBO_BOX_PRISTINE_CLASS);
    }

    if (selectEl.disabled) {
      disable(comboBoxEl);
      selectEl.disabled = false;
    }

    if (selectEl.hasAttribute('aria-disabled')) {
      ariaDisable(comboBoxEl);
      selectEl.removeAttribute('aria-disabled');
    }

    comboBoxEl.dataset.enhanced = 'true';
  };

  /**
   * Manage the focused element within the list options when
   * navigating via keyboard.
   *
   * @param {HTMLElement} el An anchor element within the combo box component
   * @param {HTMLElement} nextEl An element within the combo box component
   * @param {Object} options options
   * @param {boolean} options.skipFocus skip focus of highlighted item
   * @param {boolean} options.preventScroll should skip procedure to scroll to element
   */
  const highlightOption = (el, nextEl, { skipFocus, preventScroll } = {}) => {
    const { inputEl, listEl, focusedOptionEl } = getComboBoxContext(el);

    if (focusedOptionEl) {
      focusedOptionEl.classList.remove(LIST_OPTION_FOCUSED_CLASS);
      focusedOptionEl.setAttribute('tabIndex', '-1');
    }

    if (nextEl) {
      inputEl.setAttribute('aria-activedescendant', nextEl.id);
      nextEl.setAttribute('tabIndex', '0');
      nextEl.classList.add(LIST_OPTION_FOCUSED_CLASS);

      if (!preventScroll) {
        const optionBottom = nextEl.offsetTop + nextEl.offsetHeight;
        const currentBottom = listEl.scrollTop + listEl.offsetHeight;

        if (optionBottom > currentBottom) {
          listEl.scrollTop = optionBottom - listEl.offsetHeight;
        }

        if (nextEl.offsetTop < listEl.scrollTop) {
          listEl.scrollTop = nextEl.offsetTop;
        }
      }

      if (!skipFocus) {
        nextEl.focus({ preventScroll });
      }
    } else {
      inputEl.setAttribute('aria-activedescendant', '');
      inputEl.focus();
    }
  };

  /**
   * Generate a dynamic regular expression based off of a replaceable and possibly filtered value.
   *
   * @param {string} el An element within the combo box component
   * @param {string} query The value to use in the regular expression
   * @param {object} extras An object of regular expressions to replace and filter the query
   */
  const generateDynamicRegExp = (filter, query = '', extras = {}) => {
    const escapeRegExp = text =>
      text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

    let find = filter.replace(/{{(.*?)}}/g, (m, $1) => {
      const key = $1.trim();
      const queryFilter = extras[key];
      if (key !== 'query' && queryFilter) {
        const matcher = new RegExp(queryFilter, 'i');
        const matches = query.match(matcher);

        if (matches) {
          return escapeRegExp(matches[1]);
        }

        return '';
      }
      return escapeRegExp(query);
    });

    find = `^(?:${find})$`;

    return new RegExp(find, 'i');
  };

  const isDataOptGroup = option => option.getAttribute('data-optgroup') === 'true';

  /**
   * Display the option list of a combo box component.
   *
   * @param {HTMLElement} el An element within the combo box component
   */
  const displayList = el => {
    const {
      comboBoxEl,
      selectEl,
      inputEl,
      listEl,
      statusEl,
      isPristine,
      disableFiltering,
    } = getComboBoxContext(el);
    let selectedItemId;
    let firstFoundId;

    const listOptionBaseId = `${listEl.id}--option-`;

    const inputValue = (inputEl.value || '').trim().toLowerCase();
    const filter = comboBoxEl.dataset.filter || DEFAULT_FILTER;
    const regex = generateDynamicRegExp(filter, inputValue, comboBoxEl.dataset);

    const options = [];
    let parentOptGroupId = '';
    for (let i = 0, len = selectEl.options.length; i < len; i += 1) {
      const optionEl = selectEl.options[i];
      const optionId = `${listOptionBaseId}${options.length}`;
      const filterKey = comboBox.isInVaInputTelephone ? 'innerHTML' : 'text';
      const filterValue = optionEl[filterKey];

      if (
        optionEl.value &&
        (disableFiltering ||
          isPristine ||
          !inputValue ||
          regex.test(filterValue))
      ) {
        if (selectEl.value && optionEl.value === selectEl.value) {
          selectedItemId = optionId;
        }

        if (disableFiltering && !firstFoundId && regex.test(filterValue)) {
          firstFoundId = optionId;
        }

        // handle filtering when input contains a value
        if (
          inputValue &&
          regex.test(filterValue) &&
          optionEl.getAttribute('data-optgroup') !== 'true'
        ) {

          // Check if the option element is not a header optgroup
          // and has a header optgroup associated with it
          if (
            optionEl.getAttribute('data-optgroup-option') === 'true' &&
            parentOptGroupId !== optionEl.getAttribute('aria-describedby')
          ) {
            // Get an associated header optgroup element
            parentOptGroupId = optionEl.getAttribute('aria-describedby');
            const parentOptgroupEl = selectEl.querySelector(
              '#' + parentOptGroupId,
            );
            // Add the header optgroup element first
            options.push(parentOptgroupEl);
          }
        }
        // Add the option element
        options.push(optionEl);
      }
    }

    const numOptions = options.length;
    let isFocused = false;
    let groupLength = 0;
    let optionIndex = 0;
    const optionsLength = options.filter(option => !isDataOptGroup(option)).length;
    const optionHtml = options.map((option, index) => {
      const isOptGroup = isDataOptGroup(option);
      const isOptgroupOption = option.getAttribute('data-optgroup-option') !== null;
      if (isOptGroup)
        groupLength += 1;

      if (!isOptGroup) {
        optionIndex += 1;
      }
      const optionId = `${listOptionBaseId}${index}`;
      const classes = !isOptGroup ? [LIST_OPTION_CLASS] : [];
      let tabindex = '-1';
      let ariaSelected = 'false';

      if (selectEl.value && option.value === selectEl.value && !isOptGroup) {
        classes.push(LIST_OPTION_SELECTED_CLASS, LIST_OPTION_FOCUSED_CLASS);
        tabindex = '0';
        ariaSelected = 'true';
      }

      if (!selectedItemId && !isFocused && !isOptGroup) {
        classes.push(LIST_OPTION_FOCUSED_CLASS);
        tabindex = '0';
        isFocused = true;
      }

      if (isOptGroup) {
        classes.push(LIST_OPTION_GROUP_CLASS);
      } else if (isOptgroupOption) {
        classes.push(LIST_OPTION_GROUP_OPTION_CLASS);
      }

      const li = document.createElement('li');

      if (!isOptGroup) {
        li.setAttribute('aria-setsize', optionsLength);
        li.setAttribute('aria-posinset', optionIndex);
        li.setAttribute('aria-describedby', option.getAttribute('aria-describedby'));
      }
      li.setAttribute('aria-selected', ariaSelected);
      li.setAttribute('id', !isOptGroup ? optionId : option.id);
      li.setAttribute('class', classes.join(' '));
      li.setAttribute('tabindex', tabindex);
      li.setAttribute('role', isOptGroup ? 'group' : 'option');
      li.setAttribute('data-value', option.value);

      if (comboBox.isInVaInputTelephone) {
        li.innerHTML = Sanitizer.escapeHTML`<div class="flag-wrapper">
        <span class="flag flag-${option.value.toLowerCase()}"></span>
        <span class="flag-text">${option.text}</span></div>`;
      } else {
        li.textContent = option.text;
      }

      return li;
    });

    const noResults = document.createElement('li');
    noResults.setAttribute('class', `${LIST_OPTION_CLASS}--no-results`);
    noResults.textContent = 'No results found';

    listEl.hidden = false;

    if (numOptions) {
      listEl.innerHTML = '';
      optionHtml.forEach(item =>
        listEl.insertAdjacentElement('beforeend', item),
      );
    } else {
      listEl.innerHTML = '';
      listEl.insertAdjacentElement('beforeend', noResults);
    }

    inputEl.setAttribute('aria-expanded', 'true');

    const getPluralizedMessage = (count, singular, plural) =>
      count ? `${count} ${count > 1 ? plural : singular} available.` : '';

    const groupsStatus = getPluralizedMessage(groupLength, 'group', 'groups');
    const optionsStatus = getPluralizedMessage(optionIndex, 'result', 'results');

    statusEl.textContent = optionIndex
      ? `${groupsStatus} ${optionsStatus}`
      : 'No results.';

    let itemToFocus;

    if (isPristine && selectedItemId) {
      itemToFocus = listEl.querySelector(`#${selectedItemId}`);
    } else if (disableFiltering && firstFoundId) {
      itemToFocus = listEl.querySelector(`#${firstFoundId}`);
    }

    if (itemToFocus) {
      highlightOption(listEl, itemToFocus, {
        skipFocus: true,
      });
    }
  };

  /**
   * Hide the option list of a combo box component.
   *
   * @param {HTMLElement} el An element within the combo box component
   */
  const hideList = el => {
    const { inputEl, listEl, statusEl, focusedOptionEl } =
      getComboBoxContext(el);

    statusEl.innerHTML = '';

    inputEl.setAttribute('aria-expanded', 'false');
    inputEl.setAttribute('aria-activedescendant', '');

    if (focusedOptionEl) {
      focusedOptionEl.classList.remove(LIST_OPTION_FOCUSED_CLASS);
    }

    listEl.scrollTop = 0;
    listEl.hidden = true;
  };

  /**
   * Select an option list of the combo box component.
   *
   * @param {HTMLElement} listOptionEl The list option being selected
   */
  const selectItem = listOptionEl => {
    const { comboBoxEl, selectEl, inputEl } = getComboBoxContext(listOptionEl);

    // Update the select value after selection
    changeElementValue(selectEl, listOptionEl.dataset.value);

    // Update the input value after selection
    // To prevent display error, use different text extraction method for telephone inputs
    if (comboBox.isInVaInputTelephone) {
      // Extract just the flag-text portion or preserve the original input value if re-selecting
      const flagText = listOptionEl.querySelector('.flag-text');
      if (flagText) {
        changeElementValue(inputEl, flagText.textContent);
      }
    } else {
      // Standard behavior for non-telephone inputs
      changeElementValue(inputEl, listOptionEl.textContent);
    }

    comboBoxEl.classList.add(COMBO_BOX_PRISTINE_CLASS);
    hideList(comboBoxEl);
    inputEl.focus();
  };

  /**
   * Clear the input of the combo box
   *
   * @param {HTMLButtonElement} clearButtonEl The clear input button
   */
  const clearInput = clearButtonEl => {
    const { comboBoxEl, listEl, selectEl, inputEl } =
      getComboBoxContext(clearButtonEl);
    const listShown = !listEl.hidden;

    if (selectEl.value) changeElementValue(selectEl);
    if (inputEl.value) changeElementValue(inputEl);
    comboBoxEl.classList.remove(COMBO_BOX_PRISTINE_CLASS);

    if (listShown) displayList(comboBoxEl);
    inputEl.focus();
  };

  /**
   * Select an option list of the combo box component based off of
   * having a current focused list option or
   * having test that completely matches a list option.
   * Otherwise it clears the input and select.
   *
   * @param {HTMLElement} el An element within the combo box component
   */
const completeSelection = el => {
    const { comboBoxEl, selectEl, inputEl, statusEl } = getComboBoxContext(el);

    statusEl.textContent = '';

    const inputValue = (inputEl.value || '').trim().toLowerCase();

    if (inputValue) {
      // Find a matching option
    const matchingFunc = comboBox.isInVaInputTelephone
        ? (option => {
          const [name, _] = inputValue.split('...');
          return option.text.toLowerCase().startsWith(name.toLowerCase());
        })
        : (option => option.text.toLowerCase() === inputValue)
      const matchingOption = Array.from(selectEl.options).find(matchingFunc)

      if (matchingOption) {
        // If a match is found, update the input and select values
        changeElementValue(selectEl, matchingOption.value);
        const _text = comboBox.isInVaInputTelephone ? inputEl.value : matchingOption.text;
        changeElementValue(inputEl, _text);
        comboBoxEl.classList.add(COMBO_BOX_PRISTINE_CLASS);
        return;
      }
    }

    // If no match is found or input value is empty,
    // clear the select value but maintain the input value.
    // This allows the user to type a value that doesn't exist in the options
    // and still have it displayed in the input.
    // error handling should be added per unique team requirements
    changeElementValue(selectEl, '');
    comboBoxEl.classList.remove(COMBO_BOX_PRISTINE_CLASS);
  };

  /**
   * Handle the escape event within the combo box component.
   *
   * @param {KeyboardEvent} event An event within the combo box component
   */
  const handleEscape = event => {
    const { comboBoxEl, inputEl } = getComboBoxContext(event.target);

    hideList(comboBoxEl);
    completeSelection(comboBoxEl);
    inputEl.focus();
  };

  /**
   * Handle the down event within the combo box component.
   *
   * @param {KeyboardEvent} event An event within the combo box component
   */
  const handleDownFromInput = event => {
    const { comboBoxEl, listEl } = getComboBoxContext(event.target);

    if (listEl.hidden) {
      displayList(comboBoxEl);
    }

    let nextOptionEl =
      listEl.querySelector(LIST_OPTION_FOCUSED) ||
      listEl.querySelector(LIST_OPTION);

    if (nextOptionEl) {
      if (nextOptionEl.getAttribute('role') === 'group') {
        nextOptionEl = nextOptionEl.nextSibling
      }
      highlightOption(comboBoxEl, nextOptionEl);
    }

    event.preventDefault();
  };

  /**
   * Handle the enter event from an input element within the combo box component.
   *
   * @param {KeyboardEvent} event An event within the combo box component
   */
  const handleEnterFromInput = event => {
    const { comboBoxEl, listEl } = getComboBoxContext(event.target);
    const listShown = !listEl.hidden;

    completeSelection(comboBoxEl);

    if (listShown) {
      hideList(comboBoxEl);
    }

    event.preventDefault();
  };

  /**
   * Handle the down event within the combo box component.
   *
   * @param {KeyboardEvent} event An event within the combo box component
   */
  const handleDownFromListOption = event => {
    const focusedOptionEl = event.target;
    let nextOptionEl = focusedOptionEl.nextSibling;

    if (nextOptionEl) {
      if (nextOptionEl.getAttribute('role') === 'group') {
        nextOptionEl = nextOptionEl.nextSibling
      }
      highlightOption(focusedOptionEl, nextOptionEl);
    }

    event.preventDefault();
  };

  /**
   * Handle the space event from an list option element within the combo box component.
   *
   * @param {KeyboardEvent} event An event within the combo box component
   */
  const handleSpaceFromListOption = event => {
    selectItem(event.target);
    event.preventDefault();
  };

  /**
   * Handle the enter event from list option within the combo box component.
   *
   * @param {KeyboardEvent} event An event within the combo box component
   */
  const handleEnterFromListOption = event => {
    selectItem(event.target);
    event.preventDefault();
  };

  /**
   * Handle the up event from list option within the combo box component.
   *
   * @param {KeyboardEvent} event An event within the combo box component
   */
  const handleUpFromListOption = event => {
    const { comboBoxEl, listEl, focusedOptionEl } = getComboBoxContext(
      event.target,
    );
    let nextOptionEl = focusedOptionEl && focusedOptionEl.previousSibling;
    const listShown = !listEl.hidden;

    if (nextOptionEl) {
      if (nextOptionEl.getAttribute('role') === 'group') {
        nextOptionEl = nextOptionEl.previousSibling
      }
      highlightOption(focusedOptionEl, nextOptionEl);
    }

    if (listShown) {
      event.preventDefault();
    }

    if (!nextOptionEl) {
      hideList(comboBoxEl);
    }
  };

  /**
   * Select list option on the mouseover event.
   *
   * @param {MouseEvent} event The mouseover event
   * @param {HTMLLIElement} listOptionEl An element within the combo box component
   */
  const handleMouseover = listOptionEl => {
    const isCurrentlyFocused = listOptionEl.classList.contains(
      LIST_OPTION_FOCUSED_CLASS,
    );

    if (isCurrentlyFocused) return;

    highlightOption(listOptionEl, listOptionEl, {
      preventScroll: true,
    });
  };

  /**
   * Toggle the list when the button is clicked
   *
   * @param {HTMLElement} el An element within the combo box component
   */
  const toggleList = el => {
    const { comboBoxEl, listEl, inputEl } = getComboBoxContext(el);

    if (listEl.hidden) {
      displayList(comboBoxEl);
    } else {
      hideList(comboBoxEl);
    }

    inputEl.focus();
  };

  /**
   * Handle click from input
   *
   * @param {HTMLInputElement} el An element within the combo box component
   */
  const handleClickFromInput = el => {
    const { comboBoxEl, listEl } = getComboBoxContext(el);

    if (listEl.hidden) {
      displayList(comboBoxEl);
    }
  };

  export const comboBox = behavior(
    {
      [CLICK]: {
        [INPUT]() {
          if (this.disabled) return;
          handleClickFromInput(this);
        },
        [TOGGLE_LIST_BUTTON]() {
          if (this.disabled) return;
          toggleList(this);
        },
        [LIST_OPTION]() {
          if (this.disabled) return;
          selectItem(this);
        },
        [CLEAR_INPUT_BUTTON]() {
          if (this.disabled) return;
          clearInput(this);
        },
      },
      focusout: {
        [COMBO_BOX](event) {
          if (!this.contains(event.relatedTarget)) {
            completeSelection(this);
            hideList(this);
          }
        },
      },
      keydown: {
        [COMBO_BOX]: keymap({
          Escape: handleEscape,
        }),
        [INPUT]: keymap({
          Enter: handleEnterFromInput,
          ArrowDown: handleDownFromInput,
          Down: handleDownFromInput,
        }),
        [LIST_OPTION]: keymap({
          'ArrowUp': handleUpFromListOption,
          'Up': handleUpFromListOption,
          'ArrowDown': handleDownFromListOption,
          'Down': handleDownFromListOption,
          'Enter': handleEnterFromListOption,
          ' ': handleSpaceFromListOption,
          'Shift+Tab': noop,
        }),
      },
      input: {
        [INPUT]() {
          const comboBoxEl = this.closest(COMBO_BOX);
          comboBoxEl.classList.remove(COMBO_BOX_PRISTINE_CLASS);
          displayList(this);
        },
      },
      mouseover: {
        [LIST_OPTION]() {
          handleMouseover(this);
        },
      },
    },
    {
      init(root, labelEl, value, isInVaInputTelephone = false) {
        // only set this variable once
        if (this.isInVaInputTelephone === undefined) {
          this.isInVaInputTelephone = isInVaInputTelephone;
        }
        selectOrMatches(COMBO_BOX, root).forEach(comboBoxEl => {
          enhanceComboBox(comboBoxEl, labelEl, value);
        });
      },
      getComboBoxContext,
      enhanceComboBox,
      generateDynamicRegExp,
      disable,
      enable,
      displayList,
      hideList,
      COMBO_BOX_CLASS,
    },
  )

  // module.exports = comboBox;
