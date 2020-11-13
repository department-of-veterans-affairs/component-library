import React from 'react';

import ProgressButton from './ProgressButton';

export default {
  title: 'Library/ProgressButton',
  component: ProgressButton,
};

const Template = args => <ProgressButton {...args} />;

const defaultArgs = {
  buttonText: 'Click me!',
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

export const Back = Template.bind({});
Back.args = { ...defaultArgs, buttonText: 'Back', beforeText: '«' };

export const Continue = Template.bind({});
Continue.args = { ...defaultArgs, buttonText: 'Continue', afterText: '»' };

export const Disabled = Template.bind({});
Disabled.args = { ...defaultArgs, disabled: true };

export const SubmitButton = Template.bind({});
SubmitButton.args = { ...defaultArgs, submitButton: true };
