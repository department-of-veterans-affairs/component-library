import { Component, Element, Host, Prop, State, h, Watch } from '@stencil/core';

/**
 * @componentName Loader
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-loader',
  styleUrl: 'va-loader.css',
  shadow: true,
})
export class VaLoader {
  @Element() el!: HTMLElement;
  private textRef?: HTMLDivElement;
  private rotationInterval: number;

  @State() rotation: number = 0;
  @State() loaderText: string;

  /**
   * The text to display in the center of the loader
   */
  @Prop() centerLabel?: string = 'Loading';

  /**
   * The ARIA role for the loader
   */
  @Prop() loaderRole?: string = 'status';

  /**
   * The ARIA live region setting
   */
  @Prop() ariaLiveRegion?: string;

  /**
   * Whether the loader is currently busy (use 'true' or 'false' as string)
   */
  @Prop() busy?: string;

  /**
   * Custom left alignment
   */
  @Prop() alignLeft?: string = '0px';

  /**
   * Custom top alignment
   */
  @Prop() alignTop?: string = '0px';

  componentWillLoad() {
    this.loaderText = this.centerLabel;
  }

  componentDidLoad() {
    this.startRotation();
    this.adjustPosition();
  }

  disconnectedCallback() {
    window.clearInterval(this.rotationInterval);
  }

  @Watch('rotation')
  handleRotationChange() {
    switch (this.rotation) {
      case 0:
        this.loaderText = this.centerLabel;
        break;
      case 90:
        this.loaderText = `${this.centerLabel}.`;
        break;
      case 180:
        this.loaderText = `${this.centerLabel}..`;
        break;
      case 270:
        this.loaderText = `${this.centerLabel}...`;
        break;
    }
    this.adjustPosition();
  }

  private startRotation() {
    this.rotationInterval = window.setInterval(() => {
      this.rotation = (this.rotation + 90) % 360;
    }, 250);
  }

  private adjustPosition() {
    if (this.textRef) {
      const containsSpace = this.loaderText.includes(' ');
      this.textRef.style.top = containsSpace ? '40%' : '45%';
      this.textRef.style.left = containsSpace ? '35%' : '30%';
    }
  }

  render() {
    const spanStyle = {
      left: this.alignLeft,
      top: this.alignTop,
    };

    return (
      <Host>
        <div
          class="va-loader"
          role={this.loaderRole}
          aria-live={this.ariaLiveRegion}
          aria-busy={this.busy}
          tabindex={0}
        >
          <div class="va-loader__border">
            <span class="va-loader__edge va-loader__edge--left"></span>
            <span class="va-loader__edge va-loader__edge--right"></span>
          </div>
          <div class="va-loader__text" ref={el => (this.textRef = el)}>
            <span style={spanStyle}>{this.loaderText}</span>
          </div>
        </div>
      </Host>
    );
  }
}
