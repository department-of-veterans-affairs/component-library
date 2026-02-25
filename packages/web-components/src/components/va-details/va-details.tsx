import {
  Component,
  Element,
  Host,
  h,
  Prop,
  State,
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
  @Element() el: HTMLElement;

  /**
   * Value to reflect on the details element to control whether the details element is open or not.
   */
  @Prop({ reflect: true }) open?: boolean = false;

  /**
   * The text for the summary element that triggers the details to expand.
   */
  @Prop() label!: string;

  /**
   * Displays the component at a specific width. Accepts xl (40ex) or 2xl (50ex).
   */
  @Prop() width?: string;

  @State() firstNodeIsElement: boolean = false;

  /**
   * When the slot changes (i.e., when content is added to the details
   * component), check if the first child of the slot is an element rather than
   * text, and set a flag to true if it is. This is used to conditionally apply
   * a class to the content container that removes extra padding.
   * @returns {void}
   */
  private inspectSlot(): void {
    const detailsSlot = this.el.shadowRoot.querySelector('slot') as HTMLSlotElement;

    const detailsSlotAssignedNodes = detailsSlot?.assignedNodes();

    if (detailsSlotAssignedNodes?.length > 0) {
      const firstAssignedNode = detailsSlotAssignedNodes[0];
      if (firstAssignedNode.nodeName !== '#text') {
        this.firstNodeIsElement = true;
      }
    }
  }

  render() {
    const { open, label, width } = this;

    if (!label) { return null; }

    const detailsClass = classNames({
      'va-details': true,
      'va-details--width-xl': width === 'xl',
      'va-details--width-2xl': width === '2xl',
    });

    const contentContainerClass = classNames({
      'va-details__content': true,
      'va-details__content--component-child': this.firstNodeIsElement,
    });

    return (
      <Host>
        <details class={detailsClass} open={open}>
          <summary class="va-details__summary">
            <va-icon
              class="va-details__icon"
              icon="chevron_right"
              size={2}
            ></va-icon>
            {label}
          </summary>
          <div class={contentContainerClass}>
            <slot onSlotchange={() => this.inspectSlot()}></slot>
          </div>
        </details>
      </Host>
    );
  }
}
