import {
  Component,
  Host,
  Prop,
  h,
} from '@stencil/core';

@Component({
  tag: 'va-featured-content',
  styleUrl: 'va-featured-content.css',
  shadow: true,
})
export class VaFeaturedContent {
  /**
   * Sets the level for the HTML section heading elements.
   * Valid values: 3, 4
   */
  @Prop() level: number;

  /**
   * Sets the text for the section heading.
   */
  @Prop() header: string;

  render() {
    const Header = () => h(`h${this.level}`, `${this.header}`);

    return (
      <Host>
        <h1>{this.header}</h1>
      </Host>
    );
  }
}
