import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'va-on-this-page',
  styleUrl: 'va-on-this-page.css',
  shadow: true,
})
export class VaOnThisPage {
  render() {
    const h2s = Array.from(document.querySelectorAll('article > h2')) as Array<
      HTMLElement
    >;

    return (
      <Host>
        <h2>On this page</h2>
        <ul>
          {h2s.map(heading => (
            <li>
              <a href={`#${heading.id}`}>{heading.innerText}</a>
            </li>
          ))}
        </ul>
      </Host>
    );
  }
}
