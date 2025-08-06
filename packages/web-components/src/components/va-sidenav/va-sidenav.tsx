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
   * Checks for multiple current-page links and allow only the first one found.
   */
  setOnlyOneCurrentPage() {
    const currentPageElements = this.el.querySelectorAll('va-sidenav-item[current-page], va-sidenav-submenu[current-page]');
    currentPageElements.forEach((el, index) => {
      if (index > 0) {
        el.removeAttribute('current-page');
      }
    });
  }

  /**
   * Watch for changes to the current-page attribute on any va-sidenav-item or va-sidenav-submenu element.
   * With those changed current-page attributes, check if the attribute value is not null and not "false".
   * If it is not null and not "false", allow the first element found to hav a truthy current-page value 
   * to be marked as the current-page. Otherwise, remove the current-page attribute from all elements. 
   * Only one element should be the current-page.
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
        // Find the first mutation with a truthy current-page value
        const truthyMutation = currentPageMutations.find(mutation => {
          const element = mutation.target as Element;
          const attrValue = element.getAttribute('current-page');
          return attrValue !== null && attrValue !== 'false';
        });
        
        // If we found a truthy current-page attribute, make sure it's the only one by removing current-page from all other elements
        if (truthyMutation) {
          const truthyElement = truthyMutation.target as Element;
          
          // Get all elements with current-page attribute
          const allCurrentPageElements = this.el.querySelectorAll('va-sidenav-item[current-page], va-sidenav-submenu[current-page]');
          
          // Remove the current-page attribute for all elements except the first truthy one found
          allCurrentPageElements.forEach(el => {
            if (el !== truthyElement) {
              el.removeAttribute('current-page');
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

  private ariaLabel = "Related pages menu";

  render() {
    if (this.isDesktop) {
      return (
        <Host>
          <nav aria-label={this.ariaLabel}>
            {this.header && (
              <span class="va-sidenav__header">
                {this.iconName ? (
                  <span class="va-sidenav__icon-background" style={this.iconBackgroundColorStyle()}>
                    <va-icon icon={this.iconName}></va-icon>
                  </span>
                ) : null}
                {this.header}
              </span>
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
          <va-accordion-item bordered header={this.ariaLabel}>
            <nav aria-label={this.ariaLabel}>
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
