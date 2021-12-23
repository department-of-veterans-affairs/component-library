import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const progressBarIonicDocs = getWebComponentDocs('va-progress-bar-ionic');

export default {
  title: 'Components/va-progress-bar-ionic',
};

const Template = ({ 'enable-analytics': enableAnalytics, label, percent }) => (
  <va-progress-bar-ionic
    enable-analytics={enableAnalytics}
    label={label}
    percent={percent}
  ></va-progress-bar-ionic>
);

const defaultArgs = {
  'enable-analytics': false,
  'label': 'Add a label here',
  'percent': 0.35,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(progressBarIonicDocs);