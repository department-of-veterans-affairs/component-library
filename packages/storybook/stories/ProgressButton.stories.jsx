import React from 'react';

import ProgressButton from '../../react-components/src/components/ProgressButton/ProgressButton ';

export default {
  title: 'Components/Buttons/ProgressButton',
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

export const AriaLabel = Template.bind({});
AriaLabel.args = { ...defaultArgs, ariaLabel: 'click to submit' };

export const AriaDescribedby = Template.bind({});
AriaDescribedby.args = { ...defaultArgs, ariaDescribedby: 'some-existing-id' };
