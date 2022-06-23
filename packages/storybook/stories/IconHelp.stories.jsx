import React from 'react';
import IconHelp from '../../react-components/src/components/IconHelp/IconHelp';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Icons/React Component/Icon Help',
  id: 'Components/Icons/IconHelp',
  component: IconHelp,
  argTypes: {
    color: { control: 'color' },
  },
  parameters: {
    docs: {
      page: () => <StoryDocs componentName="Icons" />,
    },
  },
};

const Template = args => <IconHelp {...args} />;

const defaultArgs = {
  color: 'black',
  id: 'help-icon',
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
  role: 'image',
  ariaLabel: 'Help',
};
