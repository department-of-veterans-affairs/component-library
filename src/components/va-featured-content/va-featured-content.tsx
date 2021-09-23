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
    if (this.level !== 3 && this.level !== 4) {
      throw new Error('Featured Content header level must be 3 or 4');
    }

    const Header = () =>
      h(
        `h${this.level}`,
        null,
        `${this.header}`,
      );
  
    return (
      <Host>
        <div class="feature">
          <Header />
          <slot></slot>
        </div>
      </Host>
    );
  }
}
