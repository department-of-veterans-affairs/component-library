import { VaAlert } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const alertDocs = getWebComponentDocs('va-alert');
// Remove backgroundOnly prop, this code and prop should be removed with the v1 version

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
      Lorem ipsum dolor sit amet <va-link text="consectetur adipiscing" href="javascript:void(0);" /> elit sed do eiusmod.
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
}) => {
  return (
    <>
      <va-alert
        slim={slim}
        status="info"
        disable-analytics="false"
        visible={true}
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <p className="vads-u-margin-y--0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </p>
      </va-alert>
      <va-alert
        slim={slim}
        status="error"
        disable-analytics="false"
        visible={true}
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <>
          <p className="vads-u-margin-y--0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod.
          </p>
        </>
      </va-alert>
      <va-alert
        slim={slim}
        status="success"
        disable-analytics="false"
        visible={true}
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <p className="vads-u-margin-y--0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </p>
      </va-alert>
      <va-alert
        slim={slim}
        status="warning"
        disable-analytics="false"
        visible={true}
        close-btn-aria-label={closeBtnAriaLabel}
        closeable={closeable}
        full-width="false"
        class="vads-u-margin-bottom--1"
      >
        <>
          <p className="vads-u-margin-y--0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod.
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
        visible={true}
        closeable={false}
        full-width="false"
        class="vads-u-margin-bottom--1"
        role="alert"
      >
        <h2 id="track-your-status-on-mobile" slot="headline">
          Alert Role
        </h2>
        <p className="vads-u-margin-y--0">
          Important messages that demand the user's immediate attention, such as
          an error message.
        </p>
      </va-alert>

      <va-alert
        status="success"
        disable-analytics="false"
        visible={true}
        closeable={false}
        full-width="false"
        class="vads-u-margin-bottom--1"
        role="status"
      >
        <h2 id="track-your-status-on-mobile" slot="headline">
          Status Role
        </h2>
        <p className="vads-u-margin-y--0">
          Messages that provide advisory information but do not have the same
          urgency as alerts, such as a success message.
        </p>
      </va-alert>
    </>
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = {
  ...propStructure(alertDocs),
   'status': {
    description: 'Determines the icon and background color. `info`, `error`, `success`, or `warning`',
    table: { 
      category: 'Properties',
      defaultValue: { summary: 'info' },
    },
  },
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
    <p className="vads-u-margin-y--0">You can now access health tools on VA.gov.</p>
  ),
  status: 'success',
};

export const Warning = Template.bind(null);
Warning.args = {
  ...defaultArgs,
  headline: <h2 slot="headline">Warning status</h2>,
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
  headline: (
    <h2 slot="headline">Sorry, we couldn't find any eligible issues</h2>
  ),
  children: (
    <>
      <p className="vads-u-margin-y--0">
        If you’d like to add an issue for review, select "Add a new issue" to
        get started.
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

export const FullWidthSiteAlert = Template.bind(null);
FullWidthSiteAlert.args = {
  ...defaultArgs,
  'full-width': true,
};

export const WithActionLink = Template.bind(null);
WithActionLink.args = {
  ...defaultArgs,
  headline: (
    <h4 slot="headline">We closed your claim on October 18, 2024</h4>
  ),
  children: (
    <>
      <p>
        You can download your decision letter online now. You can also get other{' '}
        letters related to your claims.
      </p>
      <p>
        We'll also send you a copy of your decision letter by mail. It should arrive {' '}
        within 10 days after the date we closed your claim, but it may take longer.
      </p>
      <va-link-action href="#" text="Get your claim letters" type="secondary" />
    </>
  ),
};
