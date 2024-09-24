import React from 'react';
import { VaAlert } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from '../wc-helpers';

const alertDocs = getWebComponentDocs('va-alert');
// Remove backgroundOnly prop, this code and prop should be removed with the v1 version
alertDocs.props = alertDocs.props.filter((prop) => prop.name !== 'backgroundOnly');

export default {
  title: 'Patterns/Prefill/Components/Prefill Alert',
  id: 'patterns/components/prefill-alert',
  argTypes: {
    headline: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    componentSubtitle: 'va prefill alert',
    docs: {
      page: () => <StoryDocs storyDefault={SignedInPrefillAlert} data={alertDocs} />,
    },
  },
};

// Fix for displaying component name when using bindings in 'Show code'
VaAlert.displayName = 'VaAlert';

const defaultArgs = {
  'slim': false,
  'status': 'info',
  'disable-analytics': false,
  'visible': true,
  'close-btn-aria-label': 'Close notification',
  'closeable': false,
  'full-width': false,
//   'headline': (
//     <h2 id="track-your-status-on-mobile" slot="headline">
// Note: Since you’re signed in to your account, we can prefill part of your form based on your account details. You can also save your form in progress and come back later to finish filling it out.    </h2>
//   ),
  'children': (
    <p className="vads-u-margin-y--0">
 Note: Since you’re signed in to your account, we can prefill part of your form based on your account details. You can also save your form in progress and come back later to finish filling it out.
    </p>
  ),
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
  if (onCloseEvent)
    return (
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
    );

  return (
    <va-alert
      slim={slim}
      status={status}
      disable-analytics={disableAnalytics}
      visible={visible}
      close-btn-aria-label={closeBtnAriaLabel}
      closeable={closeable}
      full-width={fullWidth}
    >
      {headline}
      {children}
    </va-alert>
  );
};

const SlimTemplate = ({
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  slim,
  uswds,
}) => {
  return (
    <>
      <va-alert
        slim={slim}
        status="info"
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <p className="vads-u-margin-y--0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
        </p>
      </va-alert>
      <va-alert
        slim={slim}
        status="error"
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <>
          <p className="vads-u-margin-y--0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </p>
        </>
      </va-alert>
      <va-alert
        slim={slim}
        status="success"
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <p className="vads-u-margin-y--0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
        </p>
      </va-alert>
      <va-alert
        slim={slim}
        status="warning"
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <>
          <p className="vads-u-margin-y--0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </p>
        </>
      </va-alert>
      <va-alert
        slim={slim}
        status="continue"
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <>
          <p className="vads-u-margin-y--0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </p>
        </>
      </va-alert>
    </>
  );
};


export const SignedInPrefillAlert = Template.bind(null);
SignedInPrefillAlert.args = {
  ...defaultArgs,
};
SignedInPrefillAlert.argTypes = propStructure(alertDocs);


export const UnauthenticatedPrefillAlert = Template.bind(null);
UnauthenticatedPrefillAlert.args = {
  ...defaultArgs,
  headline: (
    <h2 slot="headline">
    Sign in with a verified account to update your information online
    </h2>
  ),
  children: (
    <div>
      <p className="vads-u-margin-top--0">
      You’ll need to sign in with an identity-verified account  through one of our account providers. Identity verification helps us  protect all Veterans’ information and prevent scammers from stealing  your benefits.
      </p>
      <p>
<strong>Don't yet have a verified account?</strong> Create a <strong>Login.gov</strong> or <strong>ID.me</strong> account now. Then come back here and sign in. We’ll help you verify your identity for your account.
      </p>
      <p>
        <strong>Not sure if your account is verified?</strong> Sign in here. We’ll tell you if you need to verify.
      </p>
    
      <p><strong>Note:</strong> You can sign in after you start your application. But you'll lose any information you already filled in.</p>
      <va-button text="Sign in to start your form"/>
    </div>
  )
};

export const PrefilledInfoAlert = Template.bind(null);
PrefilledInfoAlert.args = {
  ...defaultArgs,
  children: (
    <p className="vads-u-margin-y--0">
     We've prefilled some of your information from your account. If you need to correct anything, you can select edit below.
    </p>
  ),
};





