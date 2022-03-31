import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

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
  @Prop() enableAnalytics: boolean;

  private handleOnClick = () => {
    if (!this.enableAnalytics) return;
    this.componentLibraryAnalytics.emit({
      componentName: 'va-on-this-page',
      // TODO: reach out to Analytics team for action and details
      action: 'linkClick',
      details: {},
    });
  };

  render() {
    const { handleOnClick } = this;

    const h2s = Array.from(
      document.querySelectorAll('article h2'),
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
