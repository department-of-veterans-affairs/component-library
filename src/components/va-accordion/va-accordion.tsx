import { Component, Listen, Prop, h } from '@stencil/core';

@Component({
  tag: 'va-accordion',
  styleUrl: 'va-accordion.css',
  shadow: true,
})
export class VaAccordion {
  @Listen('accordionItemToggled')
  todoCompletedHandler(event: CustomEvent) {
    console.log('Received the custom todoCompleted event: ', event.detail);
    console.log(event.detail.target.parentNode);
    let prevAttr = event.detail.target.parentNode.host.getAttribute('open') === 'true' ? true : false;
    console.log(prevAttr);
    console.log(!prevAttr);
    event.detail.target.parentNode.host.setAttribute('open', !prevAttr);
  }

  /**
   * Whether or not the accordion has a border
   */
  @Prop() bordered: boolean;

  /**
   * Can multiple items be opened at once
   */
  @Prop() multi: boolean;

  render() {
    return (
      <ul class="usa-accordion">
        <slot />
      </ul>
    );
  }
}
