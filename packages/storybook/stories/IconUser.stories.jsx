import React from 'react';

import IconUser from '../../react-components/src/components/IconUser/IconUser';

export default {
  title: 'Components/Icons/IconUser',
  component: IconUser,
  argTypes: {
    color: { control: 'color' },
  },
};

const Template = args => <IconUser {...args} />;

const defaultArgs = {};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  role: 'image',
  ariaLabel: 'User',
};
