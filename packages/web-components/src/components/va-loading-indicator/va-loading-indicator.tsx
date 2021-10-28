import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'va-loading-indicator',
  styleUrl: 'va-loading-indicator.css',
  shadow: true,
})
export class VaLoadingIndicator {
  spinner!: HTMLDivElement;

  /**
   * The message visible on screen when loading
   */
  @Prop() message: string;

  /**
   * An aria label
   */
  @Prop() label: string = 'Loading';

  /**
   * Set to true if the loading indicator should capture focus
   */
  @Prop() setFocus: boolean = false;

  componentDidLoad() {
    if (this.setFocus && this.spinner) {
      this.spinner.focus();
    }
  }

  render() {
    const { message, label } = this;

    return (
      <Host>
        <div
          ref={el => (this.spinner = el as HTMLDivElement)}
          class="loading-indicator"
          role="progressbar"
          aria-label={label}
          aria-valuetext={message}
          tabindex="0"
        />
        {message}
      </Host>
    );
  }
}
