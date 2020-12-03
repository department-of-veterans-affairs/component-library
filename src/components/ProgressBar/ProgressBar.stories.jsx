import React from 'react';

import ProgressBar from './ProgressBar';

export default {
  title: 'Library/Progress bars/ProgressBar',
  component: ProgressBar,
};

const Template = args => <ProgressBar {...args} />;

const defaultArgs = {
  percent: 30,
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
