import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { consoleDevError } from '../../utils/utils';

/**
 * This component will render links based on the content around it. It scans the document for any `<h2>`
 * elements that contain an `id` inside of an `<article>` and will create a list of links to the headings.
 */
@Component({
  tag: 'va-on-this-page',
  styleUrl: 'va-on-this-page.css',
  shadow: true,
})
export class VaOnThisPage {
  /**
   * The event used to track usage of the component. This is emitted when the
   * user clicks on a link and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * Whether or not an analytics event will be fired
   */
  @Prop() enableAnalytics?: boolean;

  private handleOnClick = event => {
    if (!this.enableAnalytics) return;
    this.componentLibraryAnalytics.emit({
      componentName: 'va-on-this-page',
      action: 'click',
      details: {
        'click-text':
          event.composedPath()?.[0]?.textContent ||
          event.path?.[0]?.textContent,
      },
    });
  };

  render() {
    const { handleOnClick } = this;

    const h2s = Array.from(document.querySelectorAll('article h2')).filter(
      heading => {
        if (!heading.id) {
          consoleDevError(`${heading.textContent} is missing an id`);
        }
        return heading.id;
      },
    ) as Array<HTMLElement>;

    return (
      <nav aria-labelledby="on-this-page">
        <dl>
          <dt id="on-this-page">On this page</dt>
          <dd role="definition">
            {h2s.map(heading => (
              <a href={`#${heading.id}`} onClick={handleOnClick}>
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
