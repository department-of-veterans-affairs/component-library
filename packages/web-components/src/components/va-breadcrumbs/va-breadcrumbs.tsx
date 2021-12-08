import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
} from '@stencil/core';
import classnames from 'classnames';

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
   * Adds a custom id attribute to the UL element
   */
  @Prop() listId: string;

  /**
   * Adds CSS class `.va-nav-breadcrumbs--mobile` to the
   * NAV element. The mobile breadcrumb will always
   * be displayed while mobileFirstProp is True.
   */
  @Prop() mobileFirstProp: boolean;

  /**
   * Adds a custom id attribute to the NAV element
   */
  @Prop() navId: string;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private fireAnalyticsEvent(event) {
    if (!this.disableAnalytics) {
      // If it's a link being clicked, dispatch an analytics event
      if (event.target?.tagName === 'A') {
        const details = {
          componentName: 'va-breadcrumbs',
          action: 'linkClick',
          details: {
            clickLabel: event.target.innerText.trim(),
            clickLevel: parseInt(event.target.dataset.index, 10) + 1,
            // totalLevels: this.el.shadowRoot
            //   .querySelector('slot')
            //   .assignedNodes(),
            mobileFirstProp: this.mobileFirstProp,
          },
        };
        this.componentLibraryAnalytics.emit(details);
      }
    }
  }

  componentDidLoad() {
    const nodes = this.el.shadowRoot.querySelector('slot').assignedNodes();
    if (!nodes?.length) return;

    nodes.forEach((node: HTMLSlotElement, index: number) => {
      const wrapper = document.createElement('li');
      node.parentNode.insertBefore(wrapper, node);
      wrapper.appendChild(node);

      node.setAttribute('data-index', `${index}`);
      if (index === nodes.length - 1) {
        node.setAttribute('aria-current', 'page');
      }
    });
  }

  render() {
    const { label, navId, listId, mobileFirstProp } = this;

    return (
      <Host>
        <nav
          aria-label={label}
          class={classnames('va-nav-breadcrumbs', {
            'va-nav-breadcrumbs--mobile': mobileFirstProp,
          })}
          data-mobile-first={mobileFirstProp}
          id={navId}
        >
          <ul
            class="row va-nav-breadcrumbs-list columns"
            role="list"
            id={listId}
            onClick={this.fireAnalyticsEvent}
          >
            <slot></slot>
          </ul>
        </nav>
      </Host>
    );
  }
}
