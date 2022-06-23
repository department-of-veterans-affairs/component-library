import React from 'react';
import IconUser from '../../react-components/src/components/IconUser/IconUser';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Icons/React Component/Icon User',
  id: 'Components/Icons/IconUser',
  component: IconUser,
  argTypes: {
    color: { control: 'color' },
  },
  parameters: {
    docs: {
      page: () => <StoryDocs componentName="Icons" />,
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
