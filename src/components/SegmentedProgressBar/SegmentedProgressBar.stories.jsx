import React from 'react';

import SegmentedProgressBar from './SegmentedProgressBar';

export default {
  title: 'Library/SegmentedProgressBar',
  component: SegmentedProgressBar,
  decorators: [
    Story => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],

  parameters: {
    docs: {
      description: {
        component: 'Create a segmented progress bar for multi-page forms',
      },
    },
  },
};

const Template = args => <SegmentedProgressBar {...args} />;

const defaultArgs = {
  current: 2,
  total: 10,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
