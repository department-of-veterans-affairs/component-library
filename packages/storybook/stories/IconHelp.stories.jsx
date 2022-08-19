import React from 'react';
import IconHelp from '../../react-components/src/components/IconHelp/IconHelp';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Icons/Icon - help',
  component: IconHelp,
  id: 'components/icons/iconhelp',
  argTypes: {
    color: { control: 'color' },
  },
  parameters: {
    componentSubtitle: 'Help icon',
    docs: {
      page: () => <StoryDocs componentName="Icon - help" />,
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
