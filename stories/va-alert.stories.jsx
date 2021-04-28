/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, StoryDocs } from './wc-helpers';

const onThisPageDocs = getWebComponentDocs('va-alert');

export default {
  title: 'Components/va-alert',
  parameters: {
    docs: {
      /* eslint-disable-next-line react/display-name */
      page: () => <StoryDocs docs={onThisPageDocs.docs} />,
    },
  },
};

const defaultArgs = {
  headline: <h3 slot="headline">Alert headline</h3>,
  status: 'info',
  backgroundOnly: false,
  closeable: false,
  onClose: () => {},
};

const Template = ({ headline, status, backgroundOnly, closeable, onClose }) => {
  return (
    <va-alert
      status={status}
      background-only={backgroundOnly}
      closeable={closeable}
      onClose={onClose}
    >
      {headline}
      <div>This is an alert</div>
    </va-alert>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

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

export const BackgroundOnly = Template.bind({});
BackgroundOnly.args = {
  ...defaultArgs,
  backgroundOnly: true,
};
