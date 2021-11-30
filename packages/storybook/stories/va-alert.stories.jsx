/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const alertDocs = getWebComponentDocs('va-alert');

export default {
  title: 'Components/va-alert',
};

const defaultArgs = {
  headline: <h3 slot="headline">Alert headline</h3>,
  status: 'info',
  backgroundOnly: false,
  closeable: false,
  fullWidth: false,
  onClose: () => {},
  'show-icon-in-background-only': false
};

const Template = ({
  headline,
  fullWidth,
  status,
  backgroundOnly,
  closeable,
  onClose,
  'show-icon-in-background-only': showIconInBackgroundOnly
}) => {
  return (
    <va-alert
      status={status}
      background-only={backgroundOnly}
      closeable={closeable}
      full-width={fullWidth}
      onClose={onClose}
      show-icon-in-background-only={showIconInBackgroundOnly}
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
  onClose: () => console.log('Close event triggered'),
};

export const Fullwidth = Template.bind({});
Fullwidth.args = {
  ...defaultArgs,
  fullWidth: true,
  closeable: true,
  onClose: () => console.log('Close event triggered'),
  status: 'warning',
};

export const BackgroundOnly = Template.bind({});
BackgroundOnly.args = {
  ...defaultArgs,
  backgroundOnly: true,
};

export const BackgroundOnlyWithIcon = Template.bind({});
BackgroundOnlyWithIcon.args = {
  ...defaultArgs,
  backgroundOnly: true,
  'show-icon-in-background-only': true
};
