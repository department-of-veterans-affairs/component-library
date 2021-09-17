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
  @Prop() headingLevel: number;

  /**
   * Sets the text for the section heading.
   */
  @Prop() headingContent: string;

  render() {
    const Header = () => h(`h${this.headingLevel}`);

    return (
      <Host>
        <div class="feature">
          <Header>
            {this.headingContent}
          </Header>
          <slot />
        </div>
      </Host>
    );
  }
}
