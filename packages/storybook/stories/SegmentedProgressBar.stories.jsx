import React from 'react';

import {SegmentedProgressBar} from '@department-of-veterans-affairs/component-library';

export default {
  title: 'Components/Progress bars/SegmentedProgressBar',
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
