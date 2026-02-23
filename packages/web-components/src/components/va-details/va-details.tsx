import {
  Component,
  Element,
  Host,
  h,
  Prop,
} from '@stencil/core';
import classNames from 'classnames';

/**
 * @componentName Details
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-details',
  styleUrl: 'va-details.scss',
  shadow: true,
})
export class VaDetails {
  private firstChildIsVaComponent: boolean = false;

  @Element() el: HTMLElement;

  /**
   * Value to reflect on the details element to control whether the details element is open or not.
   */
  @Prop({ reflect: true }) open?: boolean = false;

  /**
   * The text for the summary element that triggers the details to expand.
   */
  @Prop() summaryText!: string;

  /**
   * Displays the component at a specific width. Accepts xl (40ex) or 2xl (50ex).
   */
  @Prop() width?: string;

  /**
   * Before component loads:
   * - Check if the first child of the component is a va- component, and set a
   *  flag to true if it is. This is used to apply different styling to the
   *  content container if the first child is a va- component, to remove extra
   *  padding that would be added if the content were wrapped in a div.
   */
  componentWillLoad() {
    const firstChild = this.el?.children[0];

    let firstChildTag = firstChild?.tagName.toLowerCase();
    if (firstChildTag?.startsWith('va-')) {
      this.firstChildIsVaComponent = true;
    }
  }

  render() {
    const contentContainerClass = classNames({
      'va-details__content': true,
      'va-details__content--va-component-child': this.firstChildIsVaComponent,
    });

    return (
      <Host>
        <details class="va-details" open={this.open}>
          <summary class="va-details__summary">
            <va-icon
              class="va-details__icon"
              icon="chevron_right"
              size={2}
            ></va-icon>
            {this.summaryText}
          </summary>
          <div class={contentContainerClass}>
            <slot></slot>
          </div>
        </details>
      </Host>
    );
  }
}
