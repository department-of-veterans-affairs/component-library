import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const buttonDocs = getWebComponentDocs('va-button');

export default {
  title: 'Components/va-button',
  parameters: {
    componentSubtitle: `Button web component`,
    docs: {
      page: () => <StoryDocs data={buttonDocs} />,
    },
  },
};

const defaultArgs = {
  'back': undefined,
  'big': undefined,
  'continue': undefined,
  'disable-analytics': undefined,
  'disabled': undefined,
  'label': undefined,
  'secondary': undefined,
  'submit': undefined,
  'text': 'Edit',
};

const Template = ({
  back,
  big,
  'continue': _continue,
  'disable-analytics': disableAnalytics,
  disabled,
  label,
  secondary,
  submit,
  text,
}) => {
  return (
    <va-button
      back={back}
      big={big}
      continue={_continue}
      disable-analytics={disableAnalytics}
      disabled={disabled}
      label={label}
      secondary={secondary}
      submit={submit}
      text={text}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  ...defaultArgs,
};
Primary.argTypes = propStructure(buttonDocs);

export const Secondary = Template.bind({});
Secondary.args = {
  ...defaultArgs,
  secondary: true,
};

export const Continue = Template.bind({});
Continue.args = {
  ...defaultArgs,
  continue: true,
  text: 'Continue',
};

export const Back = Template.bind({});
Back.args = {
  ...defaultArgs,
  back: true,
  text: 'Back',
};

export const Big = Template.bind({});
Big.args = {
  ...defaultArgs,
  big: true,
};

const ButtonPairTemplate = ({}) => {
  return (
    <>
      <va-button back text="Back" />
      <va-button continue text="Continue" />
    </>
  );
};

export const ButtonPair = ButtonPairTemplate.bind({});
ButtonPair.args = {};
