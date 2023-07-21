import { Component, h, Prop } from '@stencil/core';

/**
 * This component expects `<li>` elements as its children.
 */

/**
 * @componentName Process list
 * @maturityCategory use
 * @maturityLevel deployed
 */
@Component({
  tag: 'va-process-list',
  styleUrl: 'va-process-list.css',
  shadow: true,
})
export class VaProcessList {
  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false

  render() {
    const { uswds } = this;
    console.log(uswds)
    if (uswds) {
      return (
        <div>
          <div>Test</div>
          <ol role="list">
            <slot></slot>
          </ol>
        </div>
      );
    } else {
      return (
        <ol role="list">
          <slot></slot>
        </ol>
      );
    }
  }
}
