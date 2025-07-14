import { Component, Host, h, Prop, Listen, Element } from '@stencil/core';
import { forceUpdate } from '@stencil/core';

/**
 * Value corresponds with the --tablet breakpoint size.
 * https://design.va.gov/foundation/breakpoints
 */
const TABLET_BREAKPOINT = 640;

/**
 * @componentName Side Navigation
 * @maturityCategory caution
 * @maturityLevel candidate
 */
@Component({
  tag: 'va-sidenav',
  styleUrl: 'va-sidenav.scss',
  shadow: true,
})
export class VaSidenav {

  @Element() el!: HTMLElement;

  /**
   * Header text to display at the top of the side navigation.
   */
  @Prop() header?: string;

  /**
   * Used to describe the navigation for screen readers. If the `header` property is set, the `header` text will be used instead of this value.
   */
  @Prop() sectionName?: string;

  /**
   * The [icon name](https://design.va.gov/components/icon) for the icon that will display to the left of the header text. The `icon-background-color` prop must be set too.
   */
  @Prop() iconName?: string;

  /**
   * Adds a circle around the icon with the provided background [VADS color token](https://design.va.gov/foundation/color-palette). 
   */
  @Prop() iconBackgroundColor?: string = 'vads-color-primary';

  // Mutation observer to watch for current-page attribute changes
  private mutationObserver: MutationObserver;

  @Listen('resize', { target: 'window' })
  handleResize() {
    this.isDesktop = window.innerWidth > TABLET_BREAKPOINT;
    forceUpdate(this);
  }

  /**
   * Checks for multiple current-page links and sets only the first one found to true.
   */
  setOnlyOneCurrentPage() {
    const currentPageElements = this.el.querySelectorAll('va-sidenav-item[current-page], va-sidenav-submenu[current-page]');
    currentPageElements.forEach((el, index) => {
      if (index > 0) {
        el.setAttribute('current-page', 'false');
      }
    });
  }

  /**
   * Watch for changes to the current-page attribute on any va-sidenav-item or va-sidenav-submenu elements.
   * When a change is detected, it updates all other elements to have current-page="false"
   * except the one that triggered the mutation. This ensures only one item is marked as the current-page.
   */
  setupCurrentPageObserver() {
    // Create a new mutation observer
    this.mutationObserver = new MutationObserver((mutations) => {
      // Filter for mutations that involve the current-page attribute
      const currentPageMutations = mutations.filter(mutation => 
        mutation.type === 'attributes' && 
        mutation.attributeName === 'current-page'
      );

      if (currentPageMutations.length > 0) {
        // Get the element that triggered the mutation
        const changedElement = currentPageMutations[0].target as Element;
        const isCurrentPage = changedElement.getAttribute('current-page') === 'true';

        // Only proceed if the element was set to true
        if (isCurrentPage) {
          // Get all elements with current-page attribute
          const allElements = this.el.querySelectorAll('va-sidenav-item[current-page], va-sidenav-submenu[current-page]');
          
          // Set current-page="false" for all elements except the one that triggered the mutation
          allElements.forEach(el => {
            if (el !== changedElement) {
              el.setAttribute('current-page', 'false');
            }
          });
        }
      }
    });

    // Start observing the sidenav element for attribute changes on its descendants
    this.mutationObserver.observe(this.el, {
      attributes: true,
      attributeFilter: ['current-page'],
      subtree: true, // Watch all descendants
    });
  }

  componentWillLoad() {
    this.setOnlyOneCurrentPage();
  }

  componentDidLoad() {
    this.setupCurrentPageObserver();
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private isDesktop: boolean = window.innerWidth > TABLET_BREAKPOINT;

  private iconBackgroundColorStyle = () => {
    return {
      backgroundColor: `var(--${this.iconBackgroundColor})`
    };
  };

  private ariaLabel = () => {
    return "Related pages menu";
  };

  render() {
    if (this.isDesktop) {
      return (
        <Host>
          <nav aria-label={this.ariaLabel()}>
            {this.header && (
              <h2 class="va-sidenav__header">
                {this.iconName ? (
                  <span class="va-sidenav__icon-background" style={this.iconBackgroundColorStyle()}>
                    <va-icon icon={this.iconName}></va-icon>
                  </span>
                ) : null}
                {this.header}
              </h2>
            )}
            <div role="list" class="va-sidenav__list">
              <slot></slot>
            </div>
          </nav>
        </Host>
      );
    }
  
    return (
      <Host>
        <va-accordion open-single>
          <va-accordion-item bordered header="Related pages menu">
            <span slot="icon">
              <va-icon icon="menu" />
            </span>
            <nav aria-label={this.ariaLabel()}>
              <div role="list" class="va-sidenav__list">
                <slot></slot>
              </div>
            </nav>
          </va-accordion-item>
        </va-accordion>
      </Host> 
    );
  }
}
