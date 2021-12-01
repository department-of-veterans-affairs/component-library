import {
    Component,
    Element,
    Event,
    EventEmitter,
    Host,
    h,
    Prop,
} from '@stencil/core';

@Component({
  tag: 'va-checkbox-group',
  styleUrl: 'va-checkbox-group.css',
  shadow: true,
})
export class VaCheckboxGroup {
  @Element() el: HTMLElement;

  /**
   * Any additional fieldset classes.
   */
  @Prop() additionalFieldsetClass?: string;

  /**
   * Any additional legend classes.
   */
  @Prop() additionalLegendClass?: string;

  /**
   * Error message.
   */
  @Prop() errorMessage?: string;

  /**
   * group field label.
   */
  @Prop() label: string | HTMLElement;

  /**
   * name attribute.
   */
  @Prop() name: string;

  /**
   * ID.
   */
  @Prop() id: string;

  /**
   * Array of options to populate group.
   */
  @Prop() options: Array<object>;

  /**
   * Values of the checkbox field.
   */
  @Prop() values?: Object;

  /**
   * Is this field required.
   */
  @Prop() required?: boolean;

  /**
   * True if the analytics event should fire.
   */
  @Prop() enableAnalytics: boolean = false;

  /**
   * On value change event handler.
   */
  @Event() vaChange: EventEmitter;

  /**
   * On mouse down event handler.
   */
  @Event() vaMouseDown: EventEmitter;

  /**
   * On key down event handler.
   */
  @Event() vaKeyDown: EventEmitter;

  /**
   * The event used to track usage of the component. This is emitted when the
   * input value changes and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private fireAnalyticsEvent = () => {
    // console.log(this.checked);
    this.componentLibraryAnalytics.emit({
      componentName: 'va-checkbox-group',
      action: 'change',
      details: {
        label: this.label,
        required: this.required,
        // checked: this.checked,
      },
    });
  };

  private handleChange = (e: Event) => {
    this.checked = (e.target as HTMLInputElement).checked;
    this.vaChange.emit({ checked: this.checked });
    if (this.enableAnalytics) this.fireAnalyticsEvent();
  };

  private handleBlur = () => {
    this.vaBlur.emit();
  };

  private getMatchingSubSection = (checked, optionValues) => {
    if (checked && this.props.children) {
      const children = Array.isArray(this.props.children)
        ? this.props.children
        : [this.props.children];
      const subsections = children.filter(child =>
        optionValues.contains(child.props.showIfValueChosen),
      );
      return subsections.length > 0 ? subsections[0] : null;
    }

    return null;
  };

  render() {
    const describedBy = `${this.ariaDescribedby} description ${
      this.error && 'error-message'
    }`.trim();

    return (
      <Host>
        <div id="description">
          {this.description ? (
            <p>{this.description}</p>
          ) : (
            <slot name="description" />
          )}
        </div>
        <input
          type="checkbox"
          id="checkbox-element"
          checked={this.checked}
          aria-describedby={describedBy}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        <label htmlFor="checkbox-element">
          {this.label}
          {this.required && <span class="required">(Required)</span>}
        </label>
        {this.error && <span id="error-message">{this.error}</span>}
      </Host>
    );
  }
}
