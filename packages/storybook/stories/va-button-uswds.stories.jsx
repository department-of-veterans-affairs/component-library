import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const buttonDocs = getWebComponentDocs('va-button');

export default {
  title: 'Components/Button USWDS',
  id: 'uswds/va-button',
  parameters: {
    componentSubtitle: 'va-button web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={buttonDocs} />,
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
  'primaryAlternate': undefined,
  'submit': undefined,
  'text': 'Default',
  'message-aria-describedby': 'Optional description text for screen readers',
};

const Template = ({
  back,
  big,
  'continue': _continue,
  'disable-analytics': disableAnalytics,
  disabled,
  label,
  secondary,
  primaryAlternate,
  submit,
  text,
  'message-aria-describedby': messageAriaDescribedby,
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
      primary-alternate={primaryAlternate}
      submit={submit}
      text={text}
      onClick={e => console.log(e)}
      message-aria-describedby={messageAriaDescribedby}
    />
  );
};

export const Primary = Template.bind(null);
Primary.args = {
  ...defaultArgs,
};
Primary.argTypes = propStructure(buttonDocs);

export const PrimaryAlternate = Template.bind(null);
PrimaryAlternate.args = {
  ...defaultArgs,
  primaryAlternate: true,
  text: "Primary Alternate"
};

export const Secondary = Template.bind(null);
Secondary.args = {
  ...defaultArgs,
  secondary: true,
  text: "Secondary"
};

export const Big = Template.bind(null);
Big.args = {
  ...defaultArgs,
  big: true,
  text: "Big button",
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
  text: "Disabled",
};
