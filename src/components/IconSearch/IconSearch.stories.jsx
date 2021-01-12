import React from 'react';

import IconSearch from './IconSearch';

export default {
  title: 'Components/Icons/IconSearch',
  component: IconSearch,
  argTypes: {
    color: { control: 'color' },
  },
};

const Template = args => <IconSearch {...args} />;

const defaultArgs = {
  color: 'black',
  id: 'search-icon',
  title: 'Search',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
