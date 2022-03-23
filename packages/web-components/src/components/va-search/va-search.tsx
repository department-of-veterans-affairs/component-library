import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'va-search',
  styleUrl: 'va-search.css',
  shadow: true,
})
export class VaSearch {
  /**
   * Specifies where to send the form-data when a form is submitted
   */
  @Prop() action: string;

  /**
   * Adds an aria-label attribute to the input and button
   */
  @Prop() label: string = 'Search';

  /**
   * Specifies the HTTP method to use when sending form-data
   */
  @Prop() method?: 'GET' | 'POST' | 'dialog';

  render() {
    const { action, label, method } = this;

    return (
      <Host>
        <form id="va-search-form" action={action} method={method}>
          <input id="va-search-input" aria-label={label} type="text"></input>
          <button id="va-search-button" type="submit" aria-label={label}>
            <i aria-hidden="true" class="fa fa-search" />
          </button>
        </form>
      </Host>
    );
  }
}
