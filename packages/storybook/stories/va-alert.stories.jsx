import React from 'react';
import { VaAlert } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { category, level } from './maturity-scale';

const alertDocs = getWebComponentDocs('va-alert');

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Components/va-alert',
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
    componentSubtitle: `Alert web component`,
    docs: {
      page: () => (
        <StoryDocs
          data={{
            ...alertDocs,
            guidance: {
              componentHref: 'alert',
              componentName: 'Alert',
            },
            maturity: {
              category: category.USE,
              level: level.BEST_PRACTICE,
            },
            description: `Use a heading element with an attribute named slot and a value of "headline" to control what is displayed for the alert's headline. 
            Any children passed into this component without a parent slot "headline" will render in the alert's body.`,
          }}
        />
      ),
    },
  },
};

// Fix for displaying component name when using bindings in 'Show code'
VaAlert.displayName = 'VaAlert';

const defaultArgs = {
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
}) => {
  return (
    <>
      <va-alert
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

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(alertDocs);

export const SignInOrToolPrompt = Template.bind({});
SignInOrToolPrompt.args = {
  ...defaultArgs,
  children: (
    <div>
      <p className="vads-u-margin-top--0">
        You can use our new mobile app to check the status of your claims or
        appeals on your mobile device. Download the{' '}
        <strong>VA: Health and Benefits</strong> mobile app to get started.
      </p>
      <button className="usa-button-primary">Sign in to VA.gov</button>
    </div>
  ),
  status: 'continue',
};

export const Success = Template.bind({});
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

export const Warning = Template.bind({});
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

export const Error = Template.bind({});
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

export const HeadingLevel = Template.bind({});
HeadingLevel.args = {
  ...defaultArgs,
  headline: (
    <h4 slot="headline">Track your claim or appeal on your mobile device</h4>
  ),
};

export const Dismissable = Template.bind({});
Dismissable.args = {
  ...defaultArgs,
  closeable: true,
  onCloseEvent: () => console.log('Close event triggered'),
};

export const DismissableBackgroundOnly = Template.bind({});
DismissableBackgroundOnly.args = {
  ...defaultArgs,
  'background-only': true,
  'closeable': true,
  'onCloseEvent': () => console.log('Close event triggered'),
};

export const DismissableBackgroundOnlyIcon = Template.bind({});
DismissableBackgroundOnlyIcon.args = {
  ...defaultArgs,
  'background-only': true,
  'show-icon': true,
  'closeable': true,
  'onCloseEvent': () => console.log('Close event triggered'),
};

export const Fullwidth = Template.bind({});
Fullwidth.args = {
  ...defaultArgs,
  ...Warning.args,
  'full-width': true,
};

export const BackgroundOnly = BackgroundOnlyTemplate.bind({});
BackgroundOnly.args = {
  ...defaultArgs,
  'background-only': true,
};

export const BackgroundOnlyWithIcon = BackgroundOnlyTemplate.bind({});
BackgroundOnlyWithIcon.args = {
  ...defaultArgs,
  'background-only': true,
  'show-icon': true,
};

export const NotVisible = Template.bind({});
NotVisible.args = {
  ...defaultArgs,
  visible: false,
};
