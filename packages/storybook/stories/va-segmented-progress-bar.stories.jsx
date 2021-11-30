import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const segmentedProgressBarDocs = getWebComponentDocs('va-segmented-progress-bar');

export default {
  title: 'Components/va-segmented-progress-bar',
};

const Template = ({ 'enable-analytics': enableAnalytics, current, total, 'aria-label': ariaLabel }) => (
  <va-segmented-progress-bar
    enable-analytics={enableAnalytics}
    current={current}
    total={total}
    aria-label={ariaLabel}
  ></va-segmented-progress-bar>
);

const defaultArgs = {
  'enable-analytics': false,
  'current': 2,
  'total': 6,
  'aria-label': 'Test out the label'
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(segmentedProgressBarDocs);