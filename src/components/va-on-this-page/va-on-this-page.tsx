import { Component, Host, h } from '@stencil/core';

/**
 * This component will render links based on the content around it. It scans the document for any `<h2>`s
 * inside of an `<article>` and will create a list of links to the headings.
 */
@Component({
  tag: 'va-on-this-page',
  styleUrl: 'va-on-this-page.css',
  shadow: true,
})
export class VaOnThisPage {
  render() {
    const h2s = Array.from(document.querySelectorAll('article h2')) as Array<
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
