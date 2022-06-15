import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const progressBarDocs = getWebComponentDocs('va-progress-bar');

export default {
  title: 'Components/Progress bar - Activity/va-progress-bar',
  id: 'Components/va-progress-bar',
  parameters: {
    componentSubtitle: `Progress bar web component`,
    docs: {
      page: () => <StoryDocs data={progressBarDocs} />,
    },
  },
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
  'label': undefined,
  'percent': 48.123456,
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(progressBarDocs);
