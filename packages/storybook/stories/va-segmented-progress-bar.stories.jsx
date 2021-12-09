import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const segmentedProgressBarDocs = getWebComponentDocs('va-segmented-progress-bar');

export default {
  title: 'Components/va-segmented-progress-bar',
};

const Template = ({ 'enable-analytics': enableAnalytics, current, total, label }) => (
  // Wrapper for spacing when viewing in storybook
  // Component can be used without it
  <div style={{ margin: '3em' }}>
    <va-segmented-progress-bar
      enable-analytics={enableAnalytics}
      current={current}
      total={total}
      label={label}
    ></va-segmented-progress-bar>
  </div>
);

const defaultArgs = {
  'enable-analytics': false,
  'current': 2,
  'total': 6,
  'label': undefined,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = propStructure(segmentedProgressBarDocs);

export const AriaLabelOverride = Template.bind({});
AriaLabelOverride.args = {
  ...defaultArgs,
  label: 'Label is here',
};