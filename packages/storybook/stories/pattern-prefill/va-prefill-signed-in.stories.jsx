import React from 'react';
import { VaAlert, VaButtonPair } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from '../wc-helpers';

const textInputDocs = getWebComponentDocs('va-text-input');

export default {
  title: 'Patterns/Prefill/Usage Examples/Signed In Alert',
  id: 'patterns/va-prefill-signed-in',
  parameters: {
    componentSubtitle: 'va prefill pattern signed in',
  },
};

const Template = ({
    slim,
    status,
    'disable-analytics': disableAnalytics,
    visible,
    'close-btn-aria-label': closeBtnAriaLabel,
    closeable,
    'full-width': fullWidth,
    headline,
    onCloseEvent,
    children,
}) => {
  return (
    <>
    <div class="schemaform-title">
        <h1 data-testid="form-title">Request a Board Appeal</h1>
        <div class="schemaform-subtitle" data-testid="form-subtitle">VA Form 10182 (Notice of Disagreement)</div>
    </div>
    <div className="vads-u-padding-y--2">
          <VaAlert
              slim={slim}
              status={status}
              disableAnalytics={disableAnalytics}
              visible={visible}
              closeBtnAriaLabel={closeBtnAriaLabel}
              closeable={closeable}
              fullWidth={fullWidth}
              onCloseEvent={onCloseEvent}
          >
              {headline}
              {children}
          </VaAlert>
    </div>
    <a href="#start" class="vads-c-action-link--green">Start the Board Appeal request</a>
</>
  );
};

const defaultArgs = {
    'slim': true,
    'status': 'info',
    'disable-analytics': false,
    'visible': true,
    'close-btn-aria-label': 'Close notification',
    'closeable': false,
    'full-width': false,
  'children': (
    <p className="vads-u-margin-y--0">
      Note: Since you’re signed in to your account, we can prefill part of your application based on your account details. You can also save your application in progress and come back later to finish filling it out.
    </p>
  ),
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
