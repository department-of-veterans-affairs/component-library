import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const progressBarDocs = getWebComponentDocs('va-progress-bar');
const componentName = 'Progress bar - activity';

export default {
  title: `Components/${componentName}`,
  parameters: {
    componentSubtitle: `va-progress-bar`,
    docs: {
      page: () => <StoryDocs componentName={componentName} data={progressBarDocs} />,
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
