import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { category, level } from './maturity-scale';

const progressBarDocs = getWebComponentDocs('va-progress-bar');

export default {
  title: 'Components/va-progress-bar',
  parameters: {
    componentSubtitle: `Progress bar web component`,
    docs: {
      page: () => (
        <StoryDocs
          data={{
            ...progressBarDocs,
            guidance: {
              componentHref: 'progress-bar',
              componentName: 'Progress bar',
            },
            maturity: {
              category: category.USE,
              level: level.DEPLOYED,
            },
          }}
        />
      ),
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
