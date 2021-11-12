import {
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  Listen,
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

  @Listen('click', { capture: true })
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

  @Listen('keydown', { capture: true })
  handleKeydown(event): void {
    if (event.key === ' ') {
      event.preventDefault();
      this.toggleOpen();
    }
  }

  render() {
    return (
      <Host aria-expanded={this.open ? 'true' : 'false'}>
        <a role="button" aria-controls="info" tabIndex={0}>
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
