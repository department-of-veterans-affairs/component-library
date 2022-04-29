import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const progressBarDocs = getWebComponentDocs('va-progress-bar');

export default {
  title: 'Components/va-progress-bar',
  parameters: {
    componentSubtitle: `Progress bar web component`,
    docs: {
      description: {
        component: `<a className="vads-c-action-link--blue" href="https://design.va.gov/components/progress-bar">View guidance for the Progress bar component in the Design System</a>`,
      },
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

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(progressBarDocs);
