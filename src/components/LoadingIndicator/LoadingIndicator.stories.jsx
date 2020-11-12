import React from 'react';
import LoadingIndicator from './LoadingIndicator';

export default {
  title: 'Library/LoadingIndicator',
  component: LoadingIndicator,
};

const Template = (args) => <LoadingIndicator {...args} />;

const defaultArgs = {};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

export const WithMessage = Template.bind({});
WithMessage.args = { ...defaultArgs, message: 'Loading your application...' };
