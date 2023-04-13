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
    <div>
      <p className="vads-u-margin-y--0">
        You can use our new mobile app to check the status of your claims or
        appeals on your mobile device. Download the{' '}
        <strong>VA: Health and Benefits</strong> mobile app to get started.
      </p>
    </div>
  ),
};

const Template = ({
  uswds,
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
  'show-icon': showIcon,
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
        show-icon={showIcon}
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <p className="vads-u-margin-y--0">
          You can use our new mobile app to check the status of your claims or
          appeals on your mobile device. Download the{' '}
          <strong>VA: Health and Benefits</strong> mobile app to get started.
        </p>
      </va-alert>
      <va-alert
        uswds={uswds}
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
        <div>
          <p className="vads-u-margin-top--0">
            We’re sorry for the interruption, but we’ve found some more
            information that we need you to review before you can apply for VA
            health care. Please sign in to VA.gov to review. If you don’t have
            an account, you can create one now.
          </p>
          <button className="usa-button-primary">Sign in to VA.gov</button>
        </div>
      </va-alert>
      <va-alert
        uswds={uswds}
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
          You can now access health tools on VA.gov.
        </p>
      </va-alert>
      <va-alert
        uswds={uswds}
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
        <div>
          <p className="vads-u-margin-y--0">
            We’re sorry. The health care application is currently down while we
            fix a few things. We’ll be back up as soon as we can.
          </p>
          <p className="vads-u-margin-bottom--0">
            In the meantime, you can call{' '}
            <a href="tel:+18772228387">877-222-8387</a>, Monday &#8211; Friday,
            8:00 a.m. &#8211; 8:00 p.m. (<abbr title="eastern time">ET</abbr>)
            and press 2 to complete this application over the phone.
          </p>
        </div>
      </va-alert>
      <va-alert
        uswds={uswds}
        status="continue"
        background-only={backgroundOnly}
        show-icon={showIcon}
        disable-analytics="false"
        visible="true"
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
      >
        <div>
          <p className="vads-u-margin-top--0">
            You can use our new mobile app to check the status of your claims or
            appeals on your mobile device. Download the{' '}
            <strong>VA: Health and Benefits</strong> mobile app to get started.
          </p>
          <button className="usa-button-primary">Sign in to VA.gov</button>
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
      <button className="va-button-primary">Sign in to VA.gov</button>
    </div>
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
  headline: <h2 slot="headline">Please sign in to review your information</h2>,
  children: (
    <div>
      <p className="vads-u-margin-top--0">
        We’re sorry for the interruption, but we’ve found some more information
        that we need you to review before you can apply for VA health care.
        Please sign in to VA.gov to review. If you don’t have an account, you
        can create one now.
      </p>
      <button className="usa-button-primary">Sign in to VA.gov</button>
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

export const BackgroundOnlyWithIcon = BackgroundOnlyTemplate.bind(null);
BackgroundOnlyWithIcon.args = {
  ...defaultArgs,
  'background-only': true,
  'show-icon': true,
};

export const NotVisible = Template.bind(null);
NotVisible.args = {
  ...defaultArgs,
  visible: false,
};
