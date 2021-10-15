import React from 'react';

import {ProgressBar} from '@department-of-veterans-affairs/component-library';

export default {
  title: 'Components/Progress bars/ProgressBar',
  component: ProgressBar,
};

const Template = args => <ProgressBar {...args} />;

const defaultArgs = {
  percent: 30,
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
