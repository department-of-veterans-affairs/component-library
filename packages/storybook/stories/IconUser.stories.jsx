import React from 'react';
import IconUser from '../../react-components/src/components/IconUser/IconUser';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Icons/Icon - user',
  component: IconUser,
  argTypes: {
    color: { control: 'color' },
  },
  parameters: {
    componentSubtitle: 'User icon',
    docs: {
      page: () => <StoryDocs componentName="Icon - user" />,
    },
  },
};

const Template = args => <IconUser {...args} />;

const defaultArgs = {};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
  role: 'image',
  ariaLabel: 'User',
};
