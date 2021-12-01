/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface VaAccordion {
        /**
          * Whether or not the accordion items will have borders
         */
        "bordered": boolean;
        /**
          * If true, doesn't fire the CustomEvent which can be used for analytics tracking.
         */
        "disableAnalytics": boolean;
        /**
          * True if only a single item can be opened at once
         */
        "openSingle": boolean;
        /**
          * Optional accordion section heading text. Only used in analytics event. Default is null.
         */
        "sectionHeading": string;
    }
    interface VaAccordionItem {
        /**
          * The accordion item header text
         */
        "header": string;
        /**
          * Header level for button wrapper. Must be between 1 and 6
         */
        "level": number;
        /**
          * True if the item is open
         */
        "open": boolean;
        /**
          * Optional accordion item subheader text. Default is null.
         */
        "subheader": string;
    }
    interface VaAlert {
        /**
          * If true, renders the alert with only a background color corresponding to the status - no icon or left border.
         */
        "backgroundOnly": boolean;
        /**
          * Aria-label text for the close button.
         */
        "closeBtnAriaLabel": string;
        /**
          * If true, a close button will be displayed.
         */
        "closeable": boolean;
        /**
          * If true, doesn't fire the CustomEvent which can be used for analytics tracking.
         */
        "disableAnalytics": boolean;
        /**
          * If true, the alert will be full width. Should be for emergency communication only.
         */
        "fullWidth": boolean;
        /**
          * Determines the icon and border/background color. One of `info`, `error`, `success`, `warning`, or `continue`
         */
        "status": string;
        /**
          * If true, the alert will be visible.
         */
        "visible": boolean;
    }
    interface VaBackToTop {
    }
    interface VaCheckbox {
        /**
          * The aria-describedby attribute for the <intput> in the shadow DOM.
         */
        "ariaDescribedby": string;
        /**
          * Whether the checkbox is checked or not.  Note: Because this isn't reflective, vaCheckbox.getAttribute('checked') will not reflect the correct value. Use the property vaCheckbox.checked instead.
         */
        "checked": boolean;
        /**
          * The description to render. If this prop exists, va-checkbox will render it instead of the named slot.
         */
        "description"?: string;
        /**
          * True if the analytics event should fire.
         */
        "enableAnalytics": boolean;
        /**
          * The error message to render.
         */
        "error"?: string | HTMLElement;
        /**
          * The label for the checkbox.
         */
        "label": string;
        /**
          * Set the input to required and render the (Required) text.
         */
        "required"?: boolean;
    }
    interface VaFeaturedContent {
    }
    interface VaLoadingIndicator {
        /**
          * Analytics tracking function(s) will be called. Form components are disabled by default due to PII/PHI concerns.
         */
        "enableAnalytics": boolean;
        /**
          * An aria label
         */
        "label": string;
        /**
          * The message visible on screen when loading
         */
        "message": string;
        /**
          * Set to true if the loading indicator should capture focus
         */
        "setFocus": boolean;
    }
    interface VaOnThisPage {
    }
    interface VaRadio {
        /**
          * Whether or not an analytics event will be fired.
         */
        "enableAnalytics": boolean;
        /**
          * A string with an error message.
         */
        "error": string;
        /**
          * The text label for the radio group.
         */
        "label": string;
        /**
          * Whether or not this input field is required.
         */
        "required": boolean;
    }
    interface VaRadioOption {
        /**
          * Optional string for the ariaDescribedBy attribute.
         */
        "ariaDescribedby": string;
        /**
          * Whether or not the option is selected.
         */
        "checked": boolean;
        /**
          * The text label for the input element.
         */
        "label": string;
        /**
          * The name attribute for the input element.
         */
        "name": string;
        /**
          * The value attribute for the input element.
         */
        "value": string;
    }
    interface VaSelect {
        /**
          * Whether or not to fire the analytics events
         */
        "enableAnalytics": boolean;
        /**
          * Error message to display. When defined, this indicates an error.
         */
        "error": string;
        /**
          * Text label for the field.
         */
        "label": string;
        /**
          * Name attribute for the select field.
         */
        "name": string;
        /**
          * Whether or not this is a required field.
         */
        "required": boolean;
        /**
          * Selected value (will get updated on select).
         */
        "value": string;
    }
    interface VaTelephone {
        /**
          * 3 or 10 digit string representing the contact number
         */
        "contact": string;
        "extension": number;
        /**
          * Indicates if this is a number meant to be called from outside the US. Prepends a "+1" to the formatted number.
         */
        "international": boolean;
    }
    interface VaTextInput {
        /**
          * The aria-describedby attribute for the <input> in the shadow DOM.
         */
        "ariaDescribedby"?: string;
        /**
          * What to tell the browser to auto-complete the field with.
         */
        "autocomplete"?: string;
        /**
          * Emit component-library-analytics events on the blur event.
         */
        "enableAnalytics"?: boolean;
        /**
          * The error message to render.
         */
        "error"?: string | HTMLElement;
        /**
          * The inputmode attribute.
         */
        "inputmode"?: string;
        /**
          * The label for the text input.
         */
        "label": string | HTMLElement;
        /**
          * The maximum number of characters allowed in the input.
         */
        "maxlength"?: number;
        /**
          * The name to pass to the input element.
         */
        "name"?: string;
        /**
          * Placeholder text to show in the input field.
         */
        "placeholder"?: string;
        /**
          * Set the input to required and render the (Required) text.
         */
        "required"?: boolean;
        /**
          * The type attribute.
         */
        "type"?: string;
        "value"?: string;
    }
}
declare global {
    interface HTMLVaAccordionElement extends Components.VaAccordion, HTMLStencilElement {
    }
    var HTMLVaAccordionElement: {
        prototype: HTMLVaAccordionElement;
        new (): HTMLVaAccordionElement;
    };
    interface HTMLVaAccordionItemElement extends Components.VaAccordionItem, HTMLStencilElement {
    }
    var HTMLVaAccordionItemElement: {
        prototype: HTMLVaAccordionItemElement;
        new (): HTMLVaAccordionItemElement;
    };
    interface HTMLVaAlertElement extends Components.VaAlert, HTMLStencilElement {
    }
    var HTMLVaAlertElement: {
        prototype: HTMLVaAlertElement;
        new (): HTMLVaAlertElement;
    };
    interface HTMLVaBackToTopElement extends Components.VaBackToTop, HTMLStencilElement {
    }
    var HTMLVaBackToTopElement: {
        prototype: HTMLVaBackToTopElement;
        new (): HTMLVaBackToTopElement;
    };
    interface HTMLVaCheckboxElement extends Components.VaCheckbox, HTMLStencilElement {
    }
    var HTMLVaCheckboxElement: {
        prototype: HTMLVaCheckboxElement;
        new (): HTMLVaCheckboxElement;
    };
    interface HTMLVaFeaturedContentElement extends Components.VaFeaturedContent, HTMLStencilElement {
    }
    var HTMLVaFeaturedContentElement: {
        prototype: HTMLVaFeaturedContentElement;
        new (): HTMLVaFeaturedContentElement;
    };
    interface HTMLVaLoadingIndicatorElement extends Components.VaLoadingIndicator, HTMLStencilElement {
    }
    var HTMLVaLoadingIndicatorElement: {
        prototype: HTMLVaLoadingIndicatorElement;
        new (): HTMLVaLoadingIndicatorElement;
    };
    interface HTMLVaOnThisPageElement extends Components.VaOnThisPage, HTMLStencilElement {
    }
    var HTMLVaOnThisPageElement: {
        prototype: HTMLVaOnThisPageElement;
        new (): HTMLVaOnThisPageElement;
    };
    interface HTMLVaRadioElement extends Components.VaRadio, HTMLStencilElement {
    }
    var HTMLVaRadioElement: {
        prototype: HTMLVaRadioElement;
        new (): HTMLVaRadioElement;
    };
    interface HTMLVaRadioOptionElement extends Components.VaRadioOption, HTMLStencilElement {
    }
    var HTMLVaRadioOptionElement: {
        prototype: HTMLVaRadioOptionElement;
        new (): HTMLVaRadioOptionElement;
    };
    interface HTMLVaSelectElement extends Components.VaSelect, HTMLStencilElement {
    }
    var HTMLVaSelectElement: {
        prototype: HTMLVaSelectElement;
        new (): HTMLVaSelectElement;
    };
    interface HTMLVaTelephoneElement extends Components.VaTelephone, HTMLStencilElement {
    }
    var HTMLVaTelephoneElement: {
        prototype: HTMLVaTelephoneElement;
        new (): HTMLVaTelephoneElement;
    };
    interface HTMLVaTextInputElement extends Components.VaTextInput, HTMLStencilElement {
    }
    var HTMLVaTextInputElement: {
        prototype: HTMLVaTextInputElement;
        new (): HTMLVaTextInputElement;
    };
    interface HTMLElementTagNameMap {
        "va-accordion": HTMLVaAccordionElement;
        "va-accordion-item": HTMLVaAccordionItemElement;
        "va-alert": HTMLVaAlertElement;
        "va-back-to-top": HTMLVaBackToTopElement;
        "va-checkbox": HTMLVaCheckboxElement;
        "va-featured-content": HTMLVaFeaturedContentElement;
        "va-loading-indicator": HTMLVaLoadingIndicatorElement;
        "va-on-this-page": HTMLVaOnThisPageElement;
        "va-radio": HTMLVaRadioElement;
        "va-radio-option": HTMLVaRadioOptionElement;
        "va-select": HTMLVaSelectElement;
        "va-telephone": HTMLVaTelephoneElement;
        "va-text-input": HTMLVaTextInputElement;
    }
}
declare namespace LocalJSX {
    interface VaAccordion {
        /**
          * Whether or not the accordion items will have borders
         */
        "bordered"?: boolean;
        /**
          * If true, doesn't fire the CustomEvent which can be used for analytics tracking.
         */
        "disableAnalytics"?: boolean;
        "onComponent-library-analytics"?: (event: CustomEvent<any>) => void;
        /**
          * True if only a single item can be opened at once
         */
        "openSingle"?: boolean;
        /**
          * Optional accordion section heading text. Only used in analytics event. Default is null.
         */
        "sectionHeading"?: string;
    }
    interface VaAccordionItem {
        /**
          * The accordion item header text
         */
        "header"?: string;
        /**
          * Header level for button wrapper. Must be between 1 and 6
         */
        "level"?: number;
        /**
          * This event is fired so that `<va-accordion>` can manage which items are opened or closed
         */
        "onAccordionItemToggled"?: (event: CustomEvent<any>) => void;
        /**
          * True if the item is open
         */
        "open"?: boolean;
        /**
          * Optional accordion item subheader text. Default is null.
         */
        "subheader"?: string;
    }
    interface VaAlert {
        /**
          * If true, renders the alert with only a background color corresponding to the status - no icon or left border.
         */
        "backgroundOnly"?: boolean;
        /**
          * Aria-label text for the close button.
         */
        "closeBtnAriaLabel"?: string;
        /**
          * If true, a close button will be displayed.
         */
        "closeable"?: boolean;
        /**
          * If true, doesn't fire the CustomEvent which can be used for analytics tracking.
         */
        "disableAnalytics"?: boolean;
        /**
          * If true, the alert will be full width. Should be for emergency communication only.
         */
        "fullWidth"?: boolean;
        "onClose"?: (event: CustomEvent<any>) => void;
        "onComponent-library-analytics"?: (event: CustomEvent<any>) => void;
        /**
          * Fires when the component has successfully finished rendering for the first time.
         */
        "onVa-component-did-load"?: (event: CustomEvent<any>) => void;
        /**
          * Determines the icon and border/background color. One of `info`, `error`, `success`, `warning`, or `continue`
         */
        "status"?: string;
        /**
          * If true, the alert will be visible.
         */
        "visible"?: boolean;
    }
    interface VaBackToTop {
    }
    interface VaCheckbox {
        /**
          * The aria-describedby attribute for the <intput> in the shadow DOM.
         */
        "ariaDescribedby"?: string;
        /**
          * Whether the checkbox is checked or not.  Note: Because this isn't reflective, vaCheckbox.getAttribute('checked') will not reflect the correct value. Use the property vaCheckbox.checked instead.
         */
        "checked"?: boolean;
        /**
          * The description to render. If this prop exists, va-checkbox will render it instead of the named slot.
         */
        "description"?: string;
        /**
          * True if the analytics event should fire.
         */
        "enableAnalytics"?: boolean;
        /**
          * The error message to render.
         */
        "error"?: string | HTMLElement;
        /**
          * The label for the checkbox.
         */
        "label"?: string;
        /**
          * The event used to track usage of the component. This is emitted when the input value changes and enableAnalytics is true.
         */
        "onComponent-library-analytics"?: (event: CustomEvent<any>) => void;
        /**
          * The event emitted when the input is blurred.
         */
        "onVaBlur"?: (event: CustomEvent<any>) => void;
        /**
          * The event emitted when the input value changes.
         */
        "onVaChange"?: (event: CustomEvent<any>) => void;
        /**
          * Set the input to required and render the (Required) text.
         */
        "required"?: boolean;
    }
    interface VaFeaturedContent {
    }
    interface VaLoadingIndicator {
        /**
          * Analytics tracking function(s) will be called. Form components are disabled by default due to PII/PHI concerns.
         */
        "enableAnalytics"?: boolean;
        /**
          * An aria label
         */
        "label"?: string;
        /**
          * The message visible on screen when loading
         */
        "message"?: string;
        /**
          * The event used to track usage of the component.
         */
        "onComponent-library-analytics"?: (event: CustomEvent<any>) => void;
        /**
          * Set to true if the loading indicator should capture focus
         */
        "setFocus"?: boolean;
    }
    interface VaOnThisPage {
    }
    interface VaRadio {
        /**
          * Whether or not an analytics event will be fired.
         */
        "enableAnalytics"?: boolean;
        /**
          * A string with an error message.
         */
        "error"?: string;
        /**
          * The text label for the radio group.
         */
        "label"?: string;
        "onComponent-library-analytics"?: (event: CustomEvent<any>) => void;
        "onVaValueChange"?: (event: CustomEvent<any>) => void;
        /**
          * Whether or not this input field is required.
         */
        "required"?: boolean;
    }
    interface VaRadioOption {
        /**
          * Optional string for the ariaDescribedBy attribute.
         */
        "ariaDescribedby"?: string;
        /**
          * Whether or not the option is selected.
         */
        "checked"?: boolean;
        /**
          * The text label for the input element.
         */
        "label"?: string;
        /**
          * The name attribute for the input element.
         */
        "name"?: string;
        "onRadioOptionSelected"?: (event: CustomEvent<any>) => void;
        /**
          * The value attribute for the input element.
         */
        "value"?: string;
    }
    interface VaSelect {
        /**
          * Whether or not to fire the analytics events
         */
        "enableAnalytics"?: boolean;
        /**
          * Error message to display. When defined, this indicates an error.
         */
        "error"?: string;
        /**
          * Text label for the field.
         */
        "label"?: string;
        /**
          * Name attribute for the select field.
         */
        "name"?: string;
        "onComponent-library-analytics"?: (event: CustomEvent<any>) => void;
        "onVaKeyDown"?: (event: CustomEvent<any>) => void;
        "onVaSelect"?: (event: CustomEvent<any>) => void;
        /**
          * Whether or not this is a required field.
         */
        "required"?: boolean;
        /**
          * Selected value (will get updated on select).
         */
        "value"?: string;
    }
    interface VaTelephone {
        /**
          * 3 or 10 digit string representing the contact number
         */
        "contact"?: string;
        "extension"?: number;
        /**
          * Indicates if this is a number meant to be called from outside the US. Prepends a "+1" to the formatted number.
         */
        "international"?: boolean;
    }
    interface VaTextInput {
        /**
          * The aria-describedby attribute for the <input> in the shadow DOM.
         */
        "ariaDescribedby"?: string;
        /**
          * What to tell the browser to auto-complete the field with.
         */
        "autocomplete"?: string;
        /**
          * Emit component-library-analytics events on the blur event.
         */
        "enableAnalytics"?: boolean;
        /**
          * The error message to render.
         */
        "error"?: string | HTMLElement;
        /**
          * The inputmode attribute.
         */
        "inputmode"?: string;
        /**
          * The label for the text input.
         */
        "label"?: string | HTMLElement;
        /**
          * The maximum number of characters allowed in the input.
         */
        "maxlength"?: number;
        /**
          * The name to pass to the input element.
         */
        "name"?: string;
        /**
          * The event used to track usage of the component. This is emitted when the input is blurred and enableAnalytics is true.
         */
        "onComponent-library-analytics"?: (event: CustomEvent<any>) => void;
        /**
          * The event emitted when the input is blurred.
         */
        "onVaBlur"?: (event: CustomEvent<any>) => void;
        /**
          * The event emitted when the input value changes
         */
        "onVaChange"?: (event: CustomEvent<any>) => void;
        /**
          * Placeholder text to show in the input field.
         */
        "placeholder"?: string;
        /**
          * Set the input to required and render the (Required) text.
         */
        "required"?: boolean;
        /**
          * The type attribute.
         */
        "type"?: string;
        "value"?: string;
    }
    interface IntrinsicElements {
        "va-accordion": VaAccordion;
        "va-accordion-item": VaAccordionItem;
        "va-alert": VaAlert;
        "va-back-to-top": VaBackToTop;
        "va-checkbox": VaCheckbox;
        "va-featured-content": VaFeaturedContent;
        "va-loading-indicator": VaLoadingIndicator;
        "va-on-this-page": VaOnThisPage;
        "va-radio": VaRadio;
        "va-radio-option": VaRadioOption;
        "va-select": VaSelect;
        "va-telephone": VaTelephone;
        "va-text-input": VaTextInput;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "va-accordion": LocalJSX.VaAccordion & JSXBase.HTMLAttributes<HTMLVaAccordionElement>;
            "va-accordion-item": LocalJSX.VaAccordionItem & JSXBase.HTMLAttributes<HTMLVaAccordionItemElement>;
            "va-alert": LocalJSX.VaAlert & JSXBase.HTMLAttributes<HTMLVaAlertElement>;
            "va-back-to-top": LocalJSX.VaBackToTop & JSXBase.HTMLAttributes<HTMLVaBackToTopElement>;
            "va-checkbox": LocalJSX.VaCheckbox & JSXBase.HTMLAttributes<HTMLVaCheckboxElement>;
            "va-featured-content": LocalJSX.VaFeaturedContent & JSXBase.HTMLAttributes<HTMLVaFeaturedContentElement>;
            "va-loading-indicator": LocalJSX.VaLoadingIndicator & JSXBase.HTMLAttributes<HTMLVaLoadingIndicatorElement>;
            "va-on-this-page": LocalJSX.VaOnThisPage & JSXBase.HTMLAttributes<HTMLVaOnThisPageElement>;
            "va-radio": LocalJSX.VaRadio & JSXBase.HTMLAttributes<HTMLVaRadioElement>;
            "va-radio-option": LocalJSX.VaRadioOption & JSXBase.HTMLAttributes<HTMLVaRadioOptionElement>;
            "va-select": LocalJSX.VaSelect & JSXBase.HTMLAttributes<HTMLVaSelectElement>;
            "va-telephone": LocalJSX.VaTelephone & JSXBase.HTMLAttributes<HTMLVaTelephoneElement>;
            "va-text-input": LocalJSX.VaTextInput & JSXBase.HTMLAttributes<HTMLVaTextInputElement>;
        }
    }
}
