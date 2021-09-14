import { Component, h } from '@stencil/core';

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
      <nav aria-label="table of contents">
        <dl>
        <dt role="heading">On this page</dt>
        <dd>
          {h2s.map(heading => (
            <a href={`#${heading.id}`}>
              <i aria-hidden="true" class="fas fa-arrow-down"></i>
              {heading.innerText}
            </a>
          ))}
        </dd>
        </dl>
      </nav>
    );
  }
}
