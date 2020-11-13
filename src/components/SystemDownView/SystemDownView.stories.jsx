import React from 'react';

import SystemDownView from './SystemDownView';

export default {
  title: 'Library/SystemDownView',
  component: SystemDownView,
};

const Template = args => <SystemDownView {...args} />;

const defaultArgs = {
  messageLine1: 'The system is down.',
  messageLine2: 'The explanation goes here.',
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
