import {
  Component,
  Element,
  Host,
  Prop,
  h,
} from '@stencil/core';

/**
 * @componentName Tag
 * @maturityCategory caution
 * @maturityLevel candidate
 */
@Component({
  tag: 'va-tag',
  styleUrl: 'va-tag.scss',
  shadow: true,
})
export class VaTag {
  @Element() el: HTMLElement;

  /**
   * The text to be displayed in the tag element.
   */
  @Prop() text!: string;

  render() {
    const { text } = this;

    return <Host class="va-tag">{text}</Host>;
  }
}
