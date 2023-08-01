import { Component, h, Prop } from '@stencil/core';

/**
 * This component expects `<va-process-list-item>` elements as its children.
 * Or for v1 `<li>` elements are also acceptable
 */

/**
 * @componentName Process list
 * @maturityCategory use
 * @maturityLevel deployed
 */
@Component({
  tag: 'va-process-list',
  styleUrl: 'va-process-list.scss',
  shadow: true,
})
export class VaProcessList {
  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false

  render() {
    const { uswds } = this;
    
    if (uswds) {
      return (
        <ol role="list" class={'usa-process-list'}>
          <slot></slot>
        </ol>
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
