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
    }
    interface VaAlert {
        /**
          * If true, renders the alert with only a background color corresponding to the status - no icon or left border.
         */
        "backgroundOnly": boolean;
        "closeBtnAriaLabel": string;
        /**
          * If true, doesn't fire the CustomEvent which can be used for analytics tracking
         */
        "disableAnalytics": boolean;
        "headline": string;
        /**
          * Determines the level of the heading in the alert
         */
        "level": number;
        "status": string;
        "uncloseable": boolean;
        "visible": boolean;
    }
    interface VaOnThisPage {
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
    interface HTMLVaOnThisPageElement extends Components.VaOnThisPage, HTMLStencilElement {
    }
    var HTMLVaOnThisPageElement: {
        prototype: HTMLVaOnThisPageElement;
        new (): HTMLVaOnThisPageElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "va-accordion": HTMLVaAccordionElement;
        "va-accordion-item": HTMLVaAccordionItemElement;
        "va-alert": HTMLVaAlertElement;
        "va-on-this-page": HTMLVaOnThisPageElement;
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
          * True if multiple items can be opened at once
         */
        "multi"?: boolean;
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
    }
    interface VaAlert {
        /**
          * If true, renders the alert with only a background color corresponding to the status - no icon or left border.
         */
        "backgroundOnly"?: boolean;
        "closeBtnAriaLabel"?: string;
        /**
          * If true, doesn't fire the CustomEvent which can be used for analytics tracking
         */
        "disableAnalytics"?: boolean;
        "headline"?: string;
        /**
          * Determines the level of the heading in the alert
         */
        "level"?: number;
        "onClose"?: (event: CustomEvent<any>) => void;
        "onComponent-library-analytics"?: (event: CustomEvent<any>) => void;
        "status"?: string;
        "uncloseable"?: boolean;
        "visible"?: boolean;
    }
    interface VaOnThisPage {
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "va-accordion": VaAccordion;
        "va-accordion-item": VaAccordionItem;
        "va-alert": VaAlert;
        "va-on-this-page": VaOnThisPage;
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
            "va-on-this-page": LocalJSX.VaOnThisPage & JSXBase.HTMLAttributes<HTMLVaOnThisPageElement>;
        }
    }
}
