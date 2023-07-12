import {
  Component,
  Element,
  Host,
  Prop,
  h,
} from '@stencil/core';
@Component({
  tag: 'va-breadcrumbs-item',
  styleUrl: 'va-breadcrumbs-item.scss',
  shadow: true,
})
export class VaBreadcrumbsItem {
  /**
   * Reference to host element
   */
  @Element() el: HTMLElement;

  /**
   * Breadcrumb path
   */
  @Prop() path?: string;

  /**
   * Breadcrumb label
   */
  @Prop() label?: string;

  render() {
    return (
      <Host>
        <li class="usa-breadcrumb__list-item">
          <a href={this.path} class="usa-breadcrumb__link">
            <span>{this.label}</span>
          </a>
        </li>
      </Host>
    );
  }
}