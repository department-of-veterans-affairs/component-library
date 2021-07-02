/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
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
          * True if multiple items can be opened at once
         */
        "multi": boolean;
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
          * Determines the icon and border/background color. One of `info`, `error`, `success`, `warning`, or `continue`
         */
        "status": string;
        /**
          * If true, the alert will be visible.
         */
        "visible": boolean;
    }
    interface VaCheckbox {
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
    interface VaOnThisPage {
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
    interface VaTextInput {
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
        "value"?: string;
    }
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
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
    interface HTMLVaCheckboxElement extends Components.VaCheckbox, HTMLStencilElement {
    }
    var HTMLVaCheckboxElement: {
        prototype: HTMLVaCheckboxElement;
        new (): HTMLVaCheckboxElement;
    };
    interface HTMLVaOnThisPageElement extends Components.VaOnThisPage, HTMLStencilElement {
    }
    var HTMLVaOnThisPageElement: {
        prototype: HTMLVaOnThisPageElement;
        new (): HTMLVaOnThisPageElement;
    };
    interface HTMLVaSelectElement extends Components.VaSelect, HTMLStencilElement {
    }
    var HTMLVaSelectElement: {
        prototype: HTMLVaSelectElement;
        new (): HTMLVaSelectElement;
    };
    interface HTMLVaTextInputElement extends Components.VaTextInput, HTMLStencilElement {
    }
    var HTMLVaTextInputElement: {
        prototype: HTMLVaTextInputElement;
        new (): HTMLVaTextInputElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "va-accordion": HTMLVaAccordionElement;
        "va-accordion-item": HTMLVaAccordionItemElement;
        "va-alert": HTMLVaAlertElement;
        "va-checkbox": HTMLVaCheckboxElement;
        "va-on-this-page": HTMLVaOnThisPageElement;
        "va-select": HTMLVaSelectElement;
        "va-text-input": HTMLVaTextInputElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface VaAccordion {
        /**
          * Whether or not the accordion items will have borders
         */
        "bordered"?: boolean;
        /**
          * If true, doesn't fire the CustomEvent which can be used for analytics tracking.
         */
        "disableAnalytics"?: boolean;
        /**
          * True if multiple items can be opened at once
         */
        "multi"?: boolean;
        "onComponent-library-analytics"?: (event: CustomEvent<any>) => void;
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
        "onClose"?: (event: CustomEvent<any>) => void;
        "onComponent-library-analytics"?: (event: CustomEvent<any>) => void;
        /**
          * Determines the icon and border/background color. One of `info`, `error`, `success`, `warning`, or `continue`
         */
        "status"?: string;
        /**
          * If true, the alert will be visible.
         */
        "visible"?: boolean;
    }
    interface VaCheckbox {
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
        "onComponent-library-analytics"?: (event: CustomEvent<any>) => void;
        /**
          * Set the input to required and render the (Required) text.
         */
        "required"?: boolean;
    }
    interface VaOnThisPage {
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
        "onKeyDown"?: (event: CustomEvent<any>) => void;
        "onSelect"?: (event: CustomEvent<any>) => void;
        /**
          * Whether or not this is a required field.
         */
        "required"?: boolean;
        /**
          * Selected value (will get updated on select).
         */
        "value"?: string;
    }
    interface VaTextInput {
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
        "onComponent-library-analytics"?: (event: CustomEvent<any>) => void;
        /**
          * Placeholder text to show in the input field.
         */
        "placeholder"?: string;
        /**
          * Set the input to required and render the (Required) text.
         */
        "required"?: boolean;
        "value"?: string;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "va-accordion": VaAccordion;
        "va-accordion-item": VaAccordionItem;
        "va-alert": VaAlert;
        "va-checkbox": VaCheckbox;
        "va-on-this-page": VaOnThisPage;
        "va-select": VaSelect;
        "va-text-input": VaTextInput;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "va-accordion": LocalJSX.VaAccordion & JSXBase.HTMLAttributes<HTMLVaAccordionElement>;
            "va-accordion-item": LocalJSX.VaAccordionItem & JSXBase.HTMLAttributes<HTMLVaAccordionItemElement>;
            "va-alert": LocalJSX.VaAlert & JSXBase.HTMLAttributes<HTMLVaAlertElement>;
            "va-checkbox": LocalJSX.VaCheckbox & JSXBase.HTMLAttributes<HTMLVaCheckboxElement>;
            "va-on-this-page": LocalJSX.VaOnThisPage & JSXBase.HTMLAttributes<HTMLVaOnThisPageElement>;
            "va-select": LocalJSX.VaSelect & JSXBase.HTMLAttributes<HTMLVaSelectElement>;
            "va-text-input": LocalJSX.VaTextInput & JSXBase.HTMLAttributes<HTMLVaTextInputElement>;
        }
    }
}
