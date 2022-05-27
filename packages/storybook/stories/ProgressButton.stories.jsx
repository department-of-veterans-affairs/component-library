import React, { Fragment } from 'react';
import ProgressButton from '../../react-components/src/components/ProgressButton/ProgressButton';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Buttons/ProgressButton',
  component: ProgressButton,
  parameters: {
    componentSubtitle: 'Progress button component',
    docs: {
      page: () => <StoryDocs componentName="ProgressButton" />,
    },
  },
};

const Template = args => <ProgressButton {...args} />;

const defaultArgs = {
  buttonText: 'Continue',
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs, buttonText: 'Continue', afterText: '»' };

const ButtonPairTemplate = args => (
  <Fragment>
    <ProgressButton {...args.backButton} />
    <ProgressButton {...args.continueButton} />
  </Fragment>
);

export const ButtonPairs = ButtonPairTemplate.bind({});
ButtonPairs.args = {
  backButton: {
    buttonClass: 'usa-button-secondary',
    buttonText: 'Back',
    beforeText: '«',
  },
  continueButton: {
    buttonText: 'Continue',
    afterText: '»',
  },
};

export const Back = Template.bind({});
Back.args = { ...defaultArgs, buttonText: 'Back', beforeText: '«' };

export const SubmitButton = Template.bind({});
SubmitButton.args = {
  ...defaultArgs,
  buttonText: 'Submit',
  submitButton: true,
};

export const Disabled = Template.bind({});
Disabled.args = { ...defaultArgs, disabled: true };
