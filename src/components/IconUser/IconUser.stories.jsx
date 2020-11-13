import React from 'react';

import IconUser from './IconUser';

export default {
  title: 'Library/IconUser',
  component: IconUser,
  argTypes: {
    color: { control: 'color' },
  },
};

const Template = args => <IconUser {...args} />;

const defaultArgs = {};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
