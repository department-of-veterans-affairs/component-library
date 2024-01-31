import React from 'react';
import { VaAlert } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const alertDocs = getWebComponentDocs('va-alert');

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: `Components/Alert`,
  id: 'components/va-alert',
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
  'status': 'info',
  'background-only': false,
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
    <div>
      <p className="vads-u-margin-y--0">
        We'll come get you from the waiting room when it's time for your appointment to start. If you wait more than 15 minutes, tell a staff member.
      </p>
    </div>
  ),
  'uswds': false
};

const Template = ({
  status,
  'background-only': backgroundOnly,
  'disable-analytics': disableAnalytics,
  visible,
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  'full-width': fullWidth,
  headline,
  onCloseEvent,
  children,
  uswds
}) => {
  if (onCloseEvent)
    return (
      <VaAlert
        status={status}
        backgroundOnly={backgroundOnly}
        disableAnalytics={disableAnalytics}
        visible={visible}
        closeBtnAriaLabel={closeBtnAriaLabel}
        closeable={closeable}
        fullWidth={fullWidth}
        onCloseEvent={onCloseEvent}
        uswds={uswds}
      >
        {headline}
        {children}
      </VaAlert>
    );

  return (
    <va-alert
      status={status}
      background-only={backgroundOnly}
      disable-analytics={disableAnalytics}
      visible={visible}
      close-btn-aria-label={closeBtnAriaLabel}
      closeable={closeable}
      full-width={fullWidth}
      uswds={uswds}
    >
      {headline}
      {children}
    </va-alert>
  );
};

const BackgroundOnlyTemplate = ({
  'background-only': backgroundOnly,
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  headline,
  uswds
}) => {
  return (
    <>
      <va-alert
        status="info"
        background-only={backgroundOnly}
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
        uswds={uswds}
      >
        <p className="vads-u-margin-y--0">
          We'll come get you from the waiting room when it's time for your appointment to start. If you wait more than 15 minutes, tell a staff member.
        </p>
      </va-alert>
      <va-alert
        status="error"
        background-only={backgroundOnly}
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
        uswds={uswds}
      >
        <div>
          <p className="vads-u-margin-y--0">
          Sorry, we couldn’t find any eligible issues. If you’d like to add an issue for review, select "Add a new issue" to
          get started.
          </p>
        </div>
      </va-alert>
      <va-alert
        status="success"
        background-only={backgroundOnly}
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
        uswds={uswds}
      >
        <p className="vads-u-margin-y--0">
          <strong>We're processing your travel reimbursement claim.</strong> We'll send you a text
          to let you know the status of your claim.
        </p>
      </va-alert>
      <va-alert
        status="warning"
        background-only={backgroundOnly}
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
        uswds={uswds}
      >
        <div>
          <p className="vads-u-margin-y--0 vads-u-margin-bottom--2">
            We're sorry. Something went wrong on our end. We can't file a travel reimbursement
            claim for you right now. But you can still file within <strong>30 days</strong> 
            of the appointment.
          </p>
          <a href="#">Find out how to file for travel reimbursement</a>
        </div>
      </va-alert>
      <va-alert
        status="continue"
        background-only={backgroundOnly}
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        uswds={uswds}
      >
        <div>
          <p className="vads-u-margin-top--0">
            You can use our new mobile app to check the status of your claims or
            appeals on your mobile device. Download the{' '}
            <strong>VA: Health and Benefits</strong> mobile app to get started.
          </p>
        </div>
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
    <div>
      <p className="vads-u-margin-top--0">
        You can use our new mobile app to check the status of your claims or
        appeals on your mobile device. Download the{' '}
        <strong>VA: Health and Benefits</strong> mobile app to get started.
      </p>
      <va-button primary-alternate text="Sign-in to VA.gov" uswds="false"></va-button>
    </div>
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
      <button class="usa-button-primary" type="button">Sign in to start your application</button>
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
    <h2 slot="headline">The health care application is down for maintenance</h2>
  ),
  children: (
    <div>
      <p className="vads-u-margin-y--0">
        We’re sorry. The health care application is currently down while we fix
        a few things. We’ll be back up as soon as we can.
      </p>
      <p className="vads-u-margin-bottom--0">
        In the meantime, you can call{' '}
        <a href="tel:+18772228387">877-222-8387</a>, Monday &#8211; Friday, 8:00
        a.m. &#8211; 8:00 p.m. (<abbr title="eastern time">ET</abbr>) and press
        2 to complete this application over the phone.
      </p>
    </div>
  ),
  status: 'warning',
};

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  headline: (
    <h2 slot="headline">Sorry, we couldn’t find any eligible issues</h2>
  ),
  children: (
    <div className="vads-u-margin-y--0">
      <p className="vads-u-margin-bottom--0">If you’d like to add an issue for review, select "Add a new issue" to get started.</p>
    </div>
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

export const DismissableSlim = Template.bind(null);
DismissableSlim.args = {
  ...defaultArgs,
  'background-only': true,
  'closeable': true,
  'onCloseEvent': () => console.log('Close event triggered'),
};

export const Slim = BackgroundOnlyTemplate.bind(null);
Slim.args = {
  ...defaultArgs,
  'background-only': true,
};

export const NotVisible = Template.bind(null);
NotVisible.args = {
  ...defaultArgs,
  visible: false,
};
