import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const progressBarDocs = getWebComponentDocs('va-progress-bar');

export default {
  title: 'Components/va-progress-bar',
};

const Template = ({ 'enable-analytics': enableAnalytics, label, percent }) => (
  <va-progress-bar
    enable-analytics={enableAnalytics}
    label={label}
    percent={percent}
  ></va-progress-bar>
);

const defaultArgs = {
  'enable-analytics': false,
  'label': 'Add a label here',
  'percent': 35,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(progressBarDocs);
