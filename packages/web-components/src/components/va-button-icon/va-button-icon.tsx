import {
  Component,
  Event,
  EventEmitter,
  Host,
  h,
  Listen,
  Prop,
  Element,
} from '@stencil/core';
import classnames from 'classnames';

/**
 * @componentName Button - Icon
 * @nativeHandler onClick
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-button-icon',
  styleUrl: 'va-button-icon.scss',
  shadow: true,
})
export class VaButtonIcon {
  @Element() el: HTMLElement;

  /**
   * If `true`, the component-library-analytics event is disabled.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * The aria-label of the component.
   */
  @Prop() label?: string; // could use this.el.getAttribute('aria-label') but this is more explicit

  /**
   * The type of button this will render as, currently a limited number of options
   */

  private buttonTypeMap = {
    // eslint-disable-next-line i18next/no-literal-string
    'change-file': { icon: 'attach_file', text: 'Change File' },
    // eslint-disable-next-line i18next/no-literal-string
    'delete': { icon: 'delete', text: 'Delete' },
    // eslint-disable-next-line i18next/no-literal-string
    'cancel': { icon: 'cancel', text: 'Cancel' },
  };
  @Prop() buttonType: keyof typeof this.buttonTypeMap;

  /**
   * The event used to track usage of the component.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  @Listen('click')
  handleClick(_: MouseEvent): void {
    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-button',
        action: 'click',
        details: {
          // eslint-disable-next-line i18next/no-literal-string
          type: 'tertiary',
          label: this.buttonTypeMap[this.buttonType].text,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  }

  render() {
    const { label, buttonType } = this;

    const buttonClass = classnames({
      'usa-button': true,
      'va-button-icon--destructive':
        buttonType === 'cancel' || buttonType === 'delete',
    });

    return (
      <Host>
        <button
          class={buttonClass}
          aria-label={label}
          type="button"
          part="button"
        >
          <va-icon
            icon={this.buttonTypeMap[buttonType].icon}
            size={3}
          ></va-icon>
          {this.buttonTypeMap[buttonType].text}
        </button>
      </Host>
    );
  }
}
