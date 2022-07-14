import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const buttonDocs = getWebComponentDocs('va-button');
const componentName = 'Button';

export default {
  title: `Components/${componentName}`,
  parameters: {
    componentSubtitle: `va-button web component`,
    docs: {
      page: () => <StoryDocs componentName={componentName} data={buttonDocs} />,
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
      onClick={e => console.log(e)}
    />
  );
};

export const Primary = Template.bind(null);
Primary.args = {
  ...defaultArgs,
};
Primary.argTypes = propStructure(buttonDocs);

export const Secondary = Template.bind(null);
Secondary.args = {
  ...defaultArgs,
  secondary: true,
};

export const Big = Template.bind(null);
Big.args = {
  ...defaultArgs,
  big: true,
};

export const Continue = Template.bind(null);
Continue.args = {
  ...defaultArgs,
  continue: true,
  text: undefined,
};

export const Back = Template.bind(null);
Back.args = {
  ...defaultArgs,
  back: true,
  text: undefined,
};

export const Disabled = Template.bind(null);
Disabled.args = {
  ...defaultArgs,
  disabled: true,
};
