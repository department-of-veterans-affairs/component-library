import {
  Component,
  Element,
  Host,
  h,
  Prop,
} from '@stencil/core';

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
  @Element() host: HTMLElement;

  /**
   * The text for the summary element that triggers the details to expand.
   */
  @Prop() trigger!: string;

  /**
   * Value to reflect on the details element to control whether the details element is open or not.
   */
  @Prop({ reflect: true }) open?: boolean = false;

  render() {
    return (
      <Host>
        <details class="va-details" open={this.open}>
          <summary class="va-details__summary">
            <va-icon
              class="va-details__icon"
              icon="chevron_right"
              size={2}
            ></va-icon>
            {this.trigger}
          </summary>
          <div class="va-details__content">
            <slot></slot>
          </div>
        </details>
      </Host>
    );
  }
}
