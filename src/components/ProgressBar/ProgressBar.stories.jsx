import React from 'react';

import ProgressBar from './ProgressBar';

export default {
  title: 'Components/Progress bars/ProgressBar',
  component: ProgressBar,
};

const Template = args => <ProgressBar {...args} />;

const defaultArgs = {
  percent: 30,
  label: 'Thirty percent finished',
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
