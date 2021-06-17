import {
  Component,
  Element,
  Prop,
  Host,
  h,
  Event,
  EventEmitter,
} from '@stencil/core';

@Component({
  tag: 'va-text-input',
  styleUrl: 'va-text-input.css',
  shadow: true,
})
export class VaTextInput {
  @Element() el: HTMLElement;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * The label for the text input.
   */
  @Prop() label: string | HTMLElement;

  /**
   * The error message to render.
   */
  @Prop() error?: string | HTMLElement;

  /**
   * Set the input to required and render the (Required) text.
   */
  @Prop() required?: boolean;

  /**
   * Placeholder text to show in the input field.
   */
  @Prop() placeholder?: string;

  /**
   * The maximum number of characters allowed in the input.
   */
  @Prop() maxlength?: number;

  /**
   * What to tell the browser to auto-complete the field with.
   */
  @Prop() autocomplete?: string;

  /**
   * Don't emit any component-library-analytics events.
   */
  @Prop() disableAnalytics?: boolean;

  /**
   * The name to pass to the input element.
   */
  @Prop() name?: string;

  /*
   * The value for the input.
   */
  @Prop({ mutable: true }) value?: string = '';
  // TODO: Make the value prop reflective. Currently, it isn't because it screws
  // up the input behavior. For now, the only "bug" is that the changed value
  // isn't reflected in the DOM on the web component. That seems to be how the
  // <input> is supposed to work, however:
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-value
  //
  // $('va-text-input').value will be correct
  // $('va-text-input').getAttribute('value') will be incorrect

  private handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
  };

  private handleBlur = () => {
    if (this.disableAnalytics) return;

    this.componentLibraryAnalytics.emit({
      componentName: 'va-text-input',
      action: 'blur',
      details: {
        label: this.label,
        value: this.value,
      },
    });
  };

  render() {
    const atts = assembleAttributes(this.el.attributes);
    if (this.error) {
      atts['aria-describedby'] = (
        (atts['aria-describedby'] || '') + ' error-message'
      ).trim();
    }
    return (
      <Host>
        {this.label && (
          <label htmlFor="inputField">
            {this.label}{' '}
            {this.required && <span class="required">(*Required)</span>}
          </label>
        )}
        {this.error && <span id="error-message">{this.error}</span>}
        <input
          id="inputField"
          type="text"
          {...atts}
          onInput={this.handleChange}
          onBlur={this.handleBlur}
        />
        {this.maxlength && this.value.length >= this.maxlength && (
          <small>(Max. {this.maxlength} characters)</small>
        )}
      </Host>
    );
  }
}

// The props passed to the web component which we don't want to pass to the
// input element. Note: The following attributes are deliberately left out so
// they get passed to the input:
//   - required
//   - placeholder
//   - maxlength
//   - autocomplete
//   - value
const wcPropNames = ['label', 'error', 'disableAnalytics'];

const assembleAttributes = (atts: NamedNodeMap) =>
  Array.from(atts)
    .filter(a => !wcPropNames.some(p => a.nodeName === p))
    .reduce(
      // Transform the NamedNodeMap into an object we can spread on <input>
      (all, a) => ({
        ...all,
        [a.nodeName]:
          // a.nodeValue will be an empty string when the attribute value isn't
          // specified such as when using a boolean true like for the required prop.
          // ...except for value. We want to keep value="" because that's
          // meaningful.
          a.nodeValue || (a.nodeName !== 'value' && a.nodeValue === ''),
      }),
      {},
    );
