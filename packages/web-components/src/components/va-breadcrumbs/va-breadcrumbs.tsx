import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  State,
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

  @State() breadcrumbs: Array<Node>;

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
            totalLevels: this.breadcrumbs.length,
          },
        };
        this.componentLibraryAnalytics.emit(details);
      }
    }
  }

  componentWillLoad() {
    //  This renders slot content outside of a slot.
    //  This is a workaround for the limitations of styling slotted nested elements.
    //  See https://stackoverflow.com/questions/61626493/slotted-css-selector-for-nested-children-in-shadowdom-slot/61631668
    const anchorNodes = Array.from(this.el.querySelectorAll('a'));
    this.breadcrumbs = anchorNodes.map(
      (node: HTMLAnchorElement, index: number) => {
        return (
          <li>
            <a
              aria-current={
                index === anchorNodes.length - 1 ? 'page' : undefined
              }
              href={node.attributes['href'].value}
            >
              {node.innerText}
            </a>
          </li>
        );
      },
    );
  }

  render() {
    const { label } = this;

    return (
      <Host>
        <nav aria-label={label}>
          <ul role="list" onClick={e => this.fireAnalyticsEvent(e)}>
            {this.breadcrumbs}
          </ul>
        </nav>
        <slot></slot>
      </Host>
    );
  }
}
