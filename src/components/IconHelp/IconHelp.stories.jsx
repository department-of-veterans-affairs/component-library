import React from 'react';

import IconHelp from './IconHelp';

export default {
  title: 'Library/IconHelp',
  component: IconHelp,
  argTypes: {
    color: { control: 'color' },
  },
};

const Template = args => <IconHelp {...args} />;

const defaultArgs = {
  color: 'black',
  id: 'help-icon',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
