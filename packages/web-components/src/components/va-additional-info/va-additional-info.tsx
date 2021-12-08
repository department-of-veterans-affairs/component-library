import {
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  h,
} from '@stencil/core';

@Component({
  tag: 'va-additional-info',
  styleUrl: 'va-additional-info.css',
  shadow: true,
})
export class VaAdditionalInfo {
  @State() open: boolean;

  /**
   * The text to trigger the expansion
   */
  @Prop() trigger: string;

  /**
   * If true, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics: boolean;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  toggleOpen(): void {
    // Conditionally track the event.
    if (!this.disableAnalytics) {
      this.componentLibraryAnalytics.emit({
        componentName: 'va-additional-info',
        action: !this.open ? 'expand' : 'collapse',
        details: {
          triggerText: this.trigger,
        },
      });
    }

    this.open = !this.open;
  }

  handleKeydown(event): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggleOpen();
    }
  }

  render() {
    return (
      <Host>
        <a
          role="button"
          aria-controls="info"
          aria-expanded={this.open ? 'true' : 'false'}
          tabIndex={0}
          onClick={this.toggleOpen.bind(this)}
          onKeyDown={this.handleKeydown.bind(this)}
        >
          <span class="additional-info-title">
            {this.trigger}
            <i class="fa-angle-down" role="presentation" />
          </span>
        </a>

        <div id="info" class={this.open ? 'open' : 'closed'}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
