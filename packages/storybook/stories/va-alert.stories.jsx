/* eslint-disable react/prop-types */
import React from 'react';
import { generateEventsDescription } from './events';
import { VaAlert } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure } from './wc-helpers';

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
    closeEvent: {
      description:
        'If closeable is true, this event is triggered when an alert is closed.',
      table: {
        defaultValue: {
          detail: undefined,
        },
      },
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          `Use a heading element with an attribute named slot and a value of "headline" to control what is displayed for the alert's headline. 
        Any children passed into this component without a parent slot "headline" will render in the alert's body.` +
          generateEventsDescription(alertDocs),
      },
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
  'headline': <h3 slot="headline">Alert headline</h3>,
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
        <div>This is an alert</div>
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
      <div>This is an alert</div>
    </va-alert>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(alertDocs);

export const Continue = Template.bind({});
Continue.args = { ...defaultArgs, status: 'continue' };

export const Success = Template.bind({});
Success.args = { ...defaultArgs, status: 'success' };

export const Warning = Template.bind({});
Warning.args = { ...defaultArgs, status: 'warning' };

export const Error = Template.bind({});
Error.args = { ...defaultArgs, status: 'error' };

export const HeadingLevel = Template.bind({});
HeadingLevel.args = {
  ...defaultArgs,
  headline: <h4 slot="headline">I am an h4</h4>,
};

export const Closeable = Template.bind({});
Closeable.args = {
  ...defaultArgs,
  closeable: true,
  onCloseEvent: () => console.log('Close event triggered'),
};

export const Fullwidth = Template.bind({});
Fullwidth.args = {
  ...defaultArgs,
  'full-width': true,
  'status': 'warning',
};

export const BackgroundOnly = Template.bind({});
BackgroundOnly.args = {
  ...defaultArgs,
  'background-only': true,
};

export const BackgroundOnlyWithIcon = Template.bind({});
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
