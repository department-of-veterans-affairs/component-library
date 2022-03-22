import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'va-search',
  styleUrl: 'va-search.css',
  shadow: true,
})
export class VaSearch {
  @Prop() action: string;

  @Prop() label: string = 'Search';

  @Prop() method?: 'GET' | 'POST' | 'dialog';

  @Event({ bubbles: true, composed: true })
  submitEvent: EventEmitter;

  private handleSubmitEvent(event: KeyboardEvent | MouseEvent) {
    this.submitEvent.emit(event);
  }

  render() {
    const { action, label, method } = this;

    return (
      <Host>
        <form
          id="va-search-form"
          action={action}
          method={method}
          onSubmit={(event: KeyboardEvent | MouseEvent) =>
            this.handleSubmitEvent(event)
          }
        >
          <input id="va-search-input" aria-label={label} type="text"></input>
          <button id="va-search-button" type="submit" aria-label={label}>
            <i aria-hidden="true" class="fa fa-search" />
          </button>
        </form>
      </Host>
    );
  }
}
