import { HTMLAttributes, Key } from 'react';
import { Components as WCTypes } from '../web-components/dist/types/components';

// Applies the component's type plus HTMLAttributes<HTMLElement> from React in order to satisfy the JSX "children" prop

type IsElement = HTMLAttributes<HTMLElement> & { class?: string };

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'va-accordion': WCTypes.VaAccordion & IsElement;
      'va-accordion-item': WCTypes.VaAccordionItem & IsElement;
      'va-additional-info': WCTypes.VaAdditionalInfo & IsElement;
      'va-alert': WCTypes.VaAlert & IsElement;
      'va-alert-expandable': WCTypes.VaAlertExpandable & IsElement;
      'va-alert-sign-in': WCTypes.VaAlertSignIn & IsElement;
      'va-back-to-top': WCTypes.VaBackToTop & IsElement;
      'va-banner': WCTypes.VaBanner & IsElement;
      'va-button': WCTypes.VaButton & IsElement;
      'va-button-icon': WCTypes.VaButtonIcon & IsElement;
      'va-button-pair': WCTypes.VaButtonPair & IsElement;
      'va-card': WCTypes.VaCard & IsElement;
      'va-checkbox': WCTypes.VaCheckbox & IsElement & { value?: string };
      'va-checkbox-group': WCTypes.VaCheckboxGroup & IsElement;
      'va-combo-box': WCTypes.VaComboBox & IsElement & IsElement;
      'va-crisis-line-modal': WCTypes.VaCrisisLineModal & IsElement;
      'va-date': WCTypes.VaDate & IsElement;
      'va-header-minimal': WCTypes.VaHeaderMinimal & IsElement;
      'va-icon': WCTypes.VaIcon & IsElement;
      'va-link': WCTypes.VaLink & IsElement;
      'va-link-action': WCTypes.VaLinkAction & IsElement;
      'va-loading-indicator': WCTypes.VaLoadingIndicator & IsElement;
      'va-loader': WCTypes.VaLoader & IsElement;
      'va-maintenance-banner': WCTypes.VaMaintenanceBanner & IsElement;
      'va-minimal-footer': WCTypes.VaMinimalFooter & IsElement;
      'va-need-help': WCTypes.VaNeedHelp & IsElement;
      'va-notification': WCTypes.VaNotification & IsElement;
      'va-official-gov-banner': WCTypes.VaOfficialGovBanner & IsElement;
      'va-omb-info': WCTypes.VaOmbInfo & IsElement;
      'va-on-this-page': WCTypes.VaOnThisPage & IsElement;
      'va-process-list': WCTypes.VaProcessList & IsElement;
      'va-process-list-item': WCTypes.VaProcessListItem & IsElement;
      'va-progress-bar': WCTypes.VaProgressBar & IsElement;
      'va-promo-banner': WCTypes.VaPromoBanner & IsElement;
      'va-radio': WCTypes.VaRadio & IsElement;
      'va-radio-option': WCTypes.VaRadioOption & IsElement;
      'va-segmented-progress-bar': WCTypes.VaSegmentedProgressBar & IsElement;
      'va-select': WCTypes.VaSelect & IsElement & { inert?: boolean };
      'va-service-list-item': WCTypes.VaServiceListItem &
        IsElement & { ref?: any } & { key?: Key };
      'va-summary-box': WCTypes.VaSummaryBox & IsElement;
      'va-table': WCTypes.VaTable & IsElement;
      'va-table-row': WCTypes.VaTableRow & IsElement & { key?: Key };
      'va-telephone': WCTypes.VaTelephone & IsElement;
      'va-text-input': WCTypes.VaTextInput & IsElement;
      'va-textarea': WCTypes.VaTextarea & IsElement;
    }
  }
}
