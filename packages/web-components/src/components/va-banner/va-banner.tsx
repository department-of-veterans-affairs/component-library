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
  tag: 'va-banner',
  styleUrl: 'va-banner.css',
  shadow: true,
})
export class VaBanner {
  @Element() el!: any;

  /**
   * If true, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics: boolean = false;

  /**
   * Enable the close functionality. The banner will be closed until storage is cleared.
   * */
  @Prop() showClose: boolean = false;

  /**
   * The headline of the banner.
   * */
  @Prop() headline: string;

  /**
   * The type of the banner. One of 'info', 'error', 'success', 'continue', or 'warning'. This affects both the icon of the AlertBox and the top border color.
   * */
  @Prop() type: string = 'info';

  /**
   * A boolean that when false makes it so that the banner does not render.
   * */
  @Prop() visible: boolean = true;

  /**
   * Enable sessionStorage for Banner
   * Defaults to localStorage
   * */
  @Prop() storage: boolean = false;

  /**
   * The event used to track usage of the component. This is emitted when an
   * anchor link is clicked and disableAnalytics is not true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private dismiss(e: Event): void {
    console.log(e, 'DISMISS')
    // Handle Storage Settings
    // Run Analytics event for Close Click
  }

  private handleAlertBodyClick(e: MouseEvent): void {
    let headlineText = null;

    // This is the happy path, meaning the user isn't using IE11
    try {
      const children = this.el.shadowRoot.querySelector('slot').assignedNodes();
      // An empty array means that there isn't a node with `slot="headline"`
      headlineText = children.length > 0 ? children[0].textContent : null;
    } catch (e) {
      // This is where we handle the edge case of the user being on IE11
      const children = this.el.shadowRoot.childNodes;
      const headerList = children.filter((node: any) =>
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(
          node.tagName.toLowerCase(),
        ),
      );

      headlineText = headerList.length > 0 ? headerList[0].textContent : null;
    }

    if (!this.disableAnalytics) {
      const target = e.target as HTMLElement;
      // If it's a link being clicked, dispatch an analytics event
      if (target?.tagName === 'A') {
        const detail = {
          componentName: 'Banner',
          action: 'linkClick',
          details: {
            clickLabel: target.innerText,
            headline: headlineText,
          },
        };
        this.componentLibraryAnalytics.emit(detail);
      }
    }
  }

  render() {
    // Derive onCloseAlert depending on the environment.
    const onCloseAlert =
      this.showClose && this.storage ? this.dismiss : undefined;

    return (
      <Host
        data-e2e-id="emergency-banner"
        onClick={this.handleAlertBodyClick.bind(this)}
      >
        <va-alert
          visible
          full-width
          closeable={this.showClose}
          onCloseEvent={onCloseAlert}
          status={this.type}
        >
          <h3 slot="headline">{this.headline}</h3>
          <slot></slot>
        </va-alert>
      </Host>
    );
  }
}
