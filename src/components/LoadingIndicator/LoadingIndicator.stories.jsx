import React from 'react';
import LoadingIndicator from './LoadingIndicator';

export default {
  title: 'Components/LoadingIndicator',
  component: LoadingIndicator,
};

const Template = args => <LoadingIndicator {...args} />;

const defaultArgs = {};

export const Default = Template.bind({});
Default.args = { ...defaultArgs, message: 'Loading your application...' };
