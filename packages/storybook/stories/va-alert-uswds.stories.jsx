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
  'background-only': false,
  'show-icon': false,
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
      You can use our new mobile app to check the status of your claims or
      appeals on your mobile device. Download the{' '}
      <strong>VA: Health and Benefits</strong> mobile app to get started.
    </p>
  ),
};

const Template = ({
  uswds,
  slim,
  status,
  'background-only': backgroundOnly,
  'show-icon': showIcon,
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
        uswds={uswds}
        status={status}
        backgroundOnly={backgroundOnly}
        showIcon={showIcon}
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
      uswds={uswds}
      slim={slim}
      status={status}
      background-only={backgroundOnly}
      show-icon={showIcon}
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

const BackgroundOnlyTemplate = ({
  'background-only': backgroundOnly,
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  headline,
  uswds,
}) => {
  return (
    <>
      <va-alert
        uswds={uswds}
        status="info"
        background-only={backgroundOnly}
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <p className="vads-u-margin-y--0">
          We'll come get you from the waiting room when it's time for your appointment to start. If you wait more than 15 minutes, tell a staff member.
        </p>
      </va-alert>
      <va-alert
        uswds={uswds}
        status="error"
        background-only={backgroundOnly}
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <>
          <p className="vads-u-margin-top--0">
            We’re sorry for the interruption, but we’ve found some more
            information that we need you to review before you can apply for VA
            health care. Please sign in to VA.gov to review. If you don’t have
            an account, you can create one now.
          </p>
          <a className="vads-c-action-link--green" href="#">Sign in to VA.gov</a>
        </>
      </va-alert>
      <va-alert
        uswds={uswds}
        status="success"
        background-only={backgroundOnly}
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <p className="vads-u-margin-y--0">
        <strong>We're processing your travel reimbursement claim.</strong> We'll send you a text
          to let you know the status of your claim.
        </p>
      </va-alert>
      <va-alert
        uswds={uswds}
        status="warning"
        background-only={backgroundOnly}
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <>
          <p className="vads-u-margin-y--0 vads-u-margin-bottom--2">
          We're sorry. Something went wrong on our end. We can't file a travel reimbursement
            claim for you right now. But you can still file within <strong>30 days</strong> 
            of the appointment.
          </p>
          <a href="#">Find out how to file for travel reimbursement</a>
        </>
      </va-alert>
      <va-alert
        uswds={uswds}
        status="continue"
        background-only={backgroundOnly}
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
      >
        <>
          <p className="vads-u-margin-top--0">
            You can use our new mobile app to check the status of your claims or
            appeals on your mobile device. Download the{' '}
            <strong>VA: Health and Benefits</strong> mobile app to get started.
          </p>
          <a className="vads-c-action-link--green" href="#">Sign in to VA.gov</a>
        </>
      </va-alert>
    </>
  );
};

const SlimTemplate = ({
  'background-only': backgroundOnly,
  'show-icon': showIcon,
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  headline,
  slim,
  uswds,
}) => {
  return (
    <>
      <va-alert
        uswds={uswds}
        slim={slim}
        status="info"
        background-only={backgroundOnly}
        show-icon={showIcon}
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
        background-only={backgroundOnly}
        show-icon={showIcon}
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
        background-only={backgroundOnly}
        show-icon={showIcon}
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
        background-only={backgroundOnly}
        show-icon={showIcon}
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
        background-only={backgroundOnly}
        show-icon={showIcon}
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
      <p className="vads-u-margin-top--0">
        You can use our new mobile app to check the status of your claims or
        appeals on your mobile device. Download the{' '}
        <strong>VA: Health and Benefits</strong> mobile app to get started.
      </p>
      <a className="vads-c-action-link--green" href="#">Sign in to VA.gov</a>
    </>
  ),
  status: 'continue',
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
      <p className="vads-u-margin-top--0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </p>
    </>
  ),
  status: 'warning',
};

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  headline: <h2 slot="headline">Please sign in to review your information</h2>,
  children: (
    <>
      <p className="vads-u-margin-top--0">
        We’re sorry for the interruption, but we’ve found some more information
        that we need you to review before you can apply for VA health care.
        Please sign in to VA.gov to review. If you don’t have an account, you
        can create one now.
      </p>
      <a className="vads-c-action-link--green" href="#">Sign in to VA.gov</a>
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

export const DismissableBackgroundOnly = Template.bind(null);
DismissableBackgroundOnly.args = {
  ...defaultArgs,
  'background-only': true,
  'closeable': true,
  'onCloseEvent': () => console.log('Close event triggered'),
};

export const DismissableBackgroundOnlyIcon = Template.bind(null);
DismissableBackgroundOnlyIcon.args = {
  ...defaultArgs,
  'background-only': true,
  'show-icon': true,
  'closeable': true,
  'onCloseEvent': () => console.log('Close event triggered'),
};

export const BackgroundOnly = BackgroundOnlyTemplate.bind(null);
BackgroundOnly.args = {
  ...defaultArgs,
  'background-only': true,
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
