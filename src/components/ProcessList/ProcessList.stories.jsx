import React from 'react';

import ProcessList from './ProcessList';

export default {
  title: 'Components/ProcessList/ProcessList',
  component: ProcessList,
};

const Template = args => <ProcessList {...args} />;

const defaultArgs = {
  children: ['<p><b>Lorem ipsum</b></p>'],
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
