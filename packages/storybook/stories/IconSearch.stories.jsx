import React from 'react';
import IconSearch from '../../react-components/src/components/IconSearch/IconSearch';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Icons/Icon - search',
  component: IconSearch,
  argTypes: {
    color: { control: 'color' },
  },
  parameters: {
    componentSubtitle: 'Search icon',
    docs: {
      page: () => <StoryDocs componentName="Icon - search" />,
    },
  },
};

const Template = args => <IconSearch {...args} />;

const defaultArgs = {
  color: 'black',
  id: 'search-icon',
  title: 'Search',
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
  role: 'image',
  ariaLabel: 'Search',
};
