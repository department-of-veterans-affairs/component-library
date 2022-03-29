import { Component, Element, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'va-search',
  styleUrl: 'va-search.css',
  shadow: true,
})
export class VaSearch {
  @Element() el: HTMLElement;

  /**
   * Specifies where to send the form-data when a form is submitted.
   * Ignored when method="dialog" is set.
   */
  @Prop() action?: string = 'javascript:void(0);';

  /**
   * Identifies the currently active element
   */
  @Prop() ariaActiveDescendant?: string;

  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the element on which this attribute is set
   */
  @Prop() ariaControls?: string;

  /**
   * Text displayed inside the search button
   */
  @Prop() buttonText?: string;

  /**
   * Adds an aria-label attribute to the input and button
   */
  @Prop() label: string = 'Search';

  /**
   * Specifies the HTTP method to use when sending form-data.
   * GET: form data appended to the action URL with a ? separator.
   * POST: form data sent as the request body.
   * dialog: Closes the dialog and throws a submit event on submission without submitting data or clearing the form.
   */
  // @Prop() method?: 'GET' | 'POST' | 'dialog';

  private handleOnBlur(event: FocusEvent) {
    console.log(event);
    const syntheticBlur = new FocusEvent('blur', {
      bubbles: true,
      composed: true,
    });
    this.el.dispatchEvent(syntheticBlur);
  }

  private handleOnChange(event: Event) {
    console.log(event);
    const syntheticChange = new Event('change', {
      bubbles: true,
      composed: true,
    });
    this.el.dispatchEvent(syntheticChange);
  }

  private handleOnClick(event: MouseEvent) {
    console.log(event);
    const syntheticClick = new MouseEvent('click', {
      bubbles: true,
      composed: true,
    });
    this.el.dispatchEvent(syntheticClick);
  }

  private handleOnKeyDown(event: KeyboardEvent) {
    console.log(event);
    const syntheticKeyDown = new KeyboardEvent('keydown', {
      bubbles: true,
      composed: true,
    });
    this.el.dispatchEvent(syntheticKeyDown);
  }

  render() {
    const {
      // action,
      ariaActiveDescendant,
      ariaControls,
      buttonText,
      label,
      // method,
    } = this;

    return (
      <Host>
        {/* <form id="va-search-form" action={action} method={method}> */}
        <input
          id="va-search-input"
          aria-activedescendant={ariaActiveDescendant}
          aria-controls={ariaControls}
          aria-label={label}
          type="text"
          onBlur={e => this.handleOnBlur(e)}
          onChange={e => this.handleOnChange(e)}
          onClick={e => this.handleOnClick(e)}
          onKeyDown={e => this.handleOnKeyDown(e)}
        />
        <button id="va-search-button" type="submit" aria-label={label}>
          <i aria-hidden="true" class="fa fa-search" />
          {buttonText && <span id="va-search-button-text">{buttonText}</span>}
        </button>
        {/* </form> */}
      </Host>
    );
  }
}
