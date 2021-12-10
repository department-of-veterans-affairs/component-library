import React from 'react';

import {SystemDownView} from '@department-of-veterans-affairs/component-library';

export default {
  title: 'Components/SystemDownView',
  component: SystemDownView,
};

const Template = args => <SystemDownView {...args} />;

const defaultArgs = {
  messageLine1: 'The system is down.',
  messageLine2: 'The explanation goes here.',
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
