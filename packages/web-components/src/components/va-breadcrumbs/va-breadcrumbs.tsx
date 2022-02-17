import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
} from '@stencil/core';

@Component({
  tag: 'va-breadcrumbs',
  styleUrl: 'va-breadcrumbs.css',
  shadow: true,
})
export class VaBreadcrumbs {
  @Element() el: HTMLElement;

  /**
   * Adds an aria-label attribute to the <nav /> element.
   */
  @Prop() label: string = 'Breadcrumb';

  /**
   * Analytics tracking function(s) will not be called
   */
  @Prop() disableAnalytics: boolean;

  /**
   * The event used to track usage of the component. This is emitted when a
   * breadcrumb anchor is clicked and disableAnalytics is not true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private getClickLevel(target: HTMLAnchorElement) {
    const anchorNodes = Array.from(this.el.querySelectorAll('a'));
    const index = anchorNodes.findIndex((node: HTMLAnchorElement) =>
      node.isEqualNode(target),
    );
    return index + 1;
  }

  private fireAnalyticsEvent(event: MouseEvent): void {
    if (!this.disableAnalytics) {
      const target = event.target as HTMLAnchorElement;
      // If it's a link being clicked, dispatch an analytics event
      if (target?.tagName === 'A') {
        const details = {
          componentName: 'va-breadcrumbs',
          action: 'linkClick',
          details: {
            clickLabel: target.innerText.trim(),
            clickLevel: this.getClickLevel(target),
            totalLevels: this.el.querySelectorAll('a').length,
          },
        };
        this.componentLibraryAnalytics.emit(details);
      }
    }
  }

  componentWillLoad() {
    const anchorNodes = Array.from(this.el.querySelectorAll('a'));
    anchorNodes.forEach((crumb: HTMLAnchorElement, index: number) => {
      const li = document.createElement('li');
      if (index === anchorNodes.length - 1) {
        crumb.setAttribute('aria-current', 'page');
      }
      crumb.parentNode.replaceChild(li, crumb);
      li.appendChild(crumb);
    });
  }

  render() {
    const { label } = this;

    return (
      <Host>
        <nav aria-label={label}>
          <ul role="list" onClick={e => this.fireAnalyticsEvent(e)}>
            <slot></slot>
          </ul>
        </nav>
      </Host>
    );
  }
}
