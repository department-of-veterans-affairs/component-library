import { Component, h } from '@stencil/core';

/**
 * @componentName Process list
 * @maturityCategory use
 * @maturityLevel best_practice
 */
@Component({
  tag: 'va-process-list',
  styleUrl: 'va-process-list.scss',
  shadow: true,
})
export class VaProcessList {

  render() {
    return (
      <ol role="list" class={'usa-process-list'}>
        <slot></slot>
      </ol>
    );
  }
}
