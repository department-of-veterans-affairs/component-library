import React from 'react';
import { VaAlert } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const alertDocs = getWebComponentDocs('va-alert');
// Remove backgroundOnly prop, this code and prop should be removed with the v1 version
alertDocs.props = alertDocs.props.filter((prop) => prop.name !== 'backgroundOnly');

export default {
  title: 'Components/Alert USWDS',
  id: 'uswds/va-alert',
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
    componentSubtitle: 'va-alert web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={alertDocs} />,
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
  'headline': (
    <h2 id="track-your-status-on-mobile" slot="headline">
      Track your claim or appeal on your mobile device
    </h2>
  ),
  'children': (
    <p className="vads-u-margin-y--0">
      Lorem ipsum dolor sit amet <a className="usa-link" href="javascript:void(0);">consectetur adipiscing</a> elit sed do eiusmod.
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

const WithARIARoleTemplate = ({}) => {
  return (
    <>
      <va-alert
        status="error"
        disable-analytics="false"
        visible="true"
        closeable="false"
        full-width="false"
        class="vads-u-margin-bottom--1"
        role="alert"
      >
        <h2 id="track-your-status-on-mobile" slot="headline">
          Alert Role
        </h2>
        <p className="vads-u-margin-y--0">
          Important messages that demand the user's immediate attention, such as an error message.
        </p>
      </va-alert>

      <va-alert
        status="success"
        disable-analytics="false"
        visible="true"
        closeable="false"
        full-width="false"
        class="vads-u-margin-bottom--1"
        role="status"
      >
        <h2 id="track-your-status-on-mobile" slot="headline">
          Status Role
        </h2>
        <p className="vads-u-margin-y--0">
          Messages that provide advisory information but do not have the same urgency as alerts, such as a success message.
        </p>
      </va-alert>
    </>
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(alertDocs);

export const SignInOrToolPrompt = Template.bind(null);
SignInOrToolPrompt.args = {
  ...defaultArgs,
  children: (
    <>
      <p className="vads-u-margin-y--0">
        You can use our new mobile app to check the status of your claims or
        appeals on your mobile device. Download the{' '}
        <strong>VA: Health and Benefits</strong> mobile app to get started.
      </p>
      <va-button uswds primary-alternate text="Sign-in to VA.gov"/>
    </>
  ),
  status: 'continue',
};

export const SignInToStartYourApplication = Template.bind(null);
SignInToStartYourApplication.args = {
  ...defaultArgs,
  headline: (
    <h2 slot="headline">
      {/* Sign in now to save time and save your work in progress */}
      Sign in with a verified account
    </h2>
  ),
  children: (
    <div>
      <p className="vads-u-margin-top--0">
      Here’s how signing in with an identity-verified account helps you:
        {/* Here's how signing in now helps you: */}
      </p>
      <ul>
        <li>We can fill in some of your information for you to save you time.</li>
        <li>You can save your work in progress. You'll have (input time limit) from when you start or make changes to submit your form.</li>
        {/* <li>You can save your work in progress. You'll have 60 days from when you start or make updates to your application to come back and finish it.</li> */}
      </ul>
      <p>After you sign in, we’ll tell you if you need to verify your identity for your account.</p>
      <p><strong>Note:</strong> You can sign in after you start filling out your form. But you'll lose any information you already filled in.</p>
      <va-button text="Sign in or create an account"/>
      <p>
        <a href="#start">Start your form without signing in</a>
      </p>
    </div>
  )
};

export const Success = Template.bind(null);
Success.args = {
  ...defaultArgs,
  headline: (
    <h2 slot="headline">
      Thank you for accepting the Terms and Conditions for using VA.gov health
      tools
    </h2>
  ),
  children: (
    <p className="vads-u-margin-y--0">
      You can now access health tools on VA.gov.
    </p>
  ),
  status: 'success',
};

export const Warning = Template.bind(null);
Warning.args = {
  ...defaultArgs,
  headline: (
    <h2 slot="headline">Warning status</h2>
  ),
  children: (
    <>
      <p className="vads-u-margin-y--0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </p>
    </>
  ),
  status: 'warning',
};

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  headline: <h2 slot="headline">Sorry, we couldn't find any eligible issues</h2>,
  children: (
    <>
      <p className="vads-u-margin-y--0">
        If you’d like to add an issue for review, select "Add a new issue" to get started.
      </p>
    </>
  ),
  status: 'error',
};

export const HeadingLevel = Template.bind(null);
HeadingLevel.args = {
  ...defaultArgs,
  headline: (
    <h4 slot="headline">Track your claim or appeal on your mobile device</h4>
  ),
};

export const Dismissable = Template.bind(null);
Dismissable.args = {
  ...defaultArgs,
  closeable: true,
  onCloseEvent: () => console.log('Close event triggered'),
};

export const Slim = SlimTemplate.bind(null);
Slim.args = {
  ...defaultArgs,
  slim: true,
};

export const NotVisible = Template.bind(null);
NotVisible.args = {
  ...defaultArgs,
  visible: false,
};

export const WithARIARole = WithARIARoleTemplate.bind(null);
WithARIARole.args = {
  ...defaultArgs,
};