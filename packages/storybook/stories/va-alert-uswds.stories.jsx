import React from 'react';
import { VaAlert } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const alertDocs = getWebComponentDocs('va-alert');

export default {
  title: `USWDS/Alert USWDS`,
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
    componentSubtitle: `va-alert web component`,
    docs: {
      page: () => <StoryDocs data={alertDocs} />,
    },
  },
};

// Fix for displaying component name when using bindings in 'Show code'
VaAlert.displayName = 'VaAlert';

const defaultArgs = {
  'uswds': true,
  'slim': false,
  'status': 'info',
  'disable-analytics': false,
  'visible': true,
  'close-btn-aria-label': 'Close notification',
  'closeable': false,
  'full-width': false,
  'background-only': false,
  'headline': (
    <h2 id="track-your-status-on-mobile" slot="headline">
      Track your claim or appeal on your mobile device
    </h2>
  ),
  'children': (
    <p className="vads-u-margin-y--0">
      Lorem ipsum dolor sit amet <a class="usa-link" href="javascript:void(0);">consectetur adipiscing</a> elit sed do eiusmod.
    </p>
  ),
};

const Template = ({
  uswds,
  slim,
  status,
  'disable-analytics': disableAnalytics,
  visible,
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  'full-width': fullWidth,
  headline,
  onCloseEvent,
  'background-only': backgroundOnly,
  children,
}) => {
  if (onCloseEvent)
    return (
      <VaAlert
        slim={slim}
        uswds={uswds}
        status={status}
        disableAnalytics={disableAnalytics}
        visible={visible}
        closeBtnAriaLabel={closeBtnAriaLabel}
        closeable={closeable}
        fullWidth={fullWidth}
        onCloseEvent={onCloseEvent}
        background-only={backgroundOnly}
      >
        {headline}
        {children}
      </VaAlert>
    );

  return (
    <va-alert
      uswds={uswds}
      slim={slim}
      status={status}
      disable-analytics={disableAnalytics}
      visible={visible}
      close-btn-aria-label={closeBtnAriaLabel}
      closeable={closeable}
      full-width={fullWidth}
      background-only={backgroundOnly}
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
        uswds={uswds}
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
        uswds={uswds}
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
        uswds={uswds}
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
        uswds={uswds}
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
        uswds={uswds}
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
      Sign in now to save time and save your work in progress
    </h2>
  ),
  children: (
    <div>
      <p className="vads-u-margin-top--0">
        Here's how signing in now helps you:
      </p>
      <ul>
        <li>We can fill in some of your information for you to save you time.</li>
        <li>You can save your work in progress. You'll have 60 days from when you start or make updates to your application to come back and finish it.</li>
      </ul>
      <p><strong>Note:</strong> You can sign in after you start your application. But you'll lose any information you already filled in.</p>
      <va-button uswds text="Sign in to start your application"/>
      <p>
        <a href="#start">Start your application without signing in</a>
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

export const BackgroundOnly = Template.bind(null);
BackgroundOnly.args = {
  ...defaultArgs,
  'background-only': true,
  status: 'fake'
}

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
