import React from 'react';

import {IconHelp} from '@department-of-veterans-affairs/component-library';

export default {
  title: 'Components/Icons/IconHelp',
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
  role: 'image',
  ariaLabel: 'Help',
};
