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
  'big': undefined,
  'disable-analytics': undefined,
  'disabled': undefined,
  'label': undefined,
  'next': undefined,
  'previous': undefined,
  'secondary': undefined,
  'submit': undefined,
  'text': 'Edit',
};

const Template = ({
  big,
  'disable-analytics': disableAnalytics,
  disabled,
  label,
  next,
  previous,
  secondary,
  submit,
  text,
}) => {
  return (
    <va-button
      big={big}
      disable-analytics={disableAnalytics}
      disabled={disabled}
      label={label}
      next={next}
      previous={previous}
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

export const Next = Template.bind({});
Next.args = {
  ...defaultArgs,
  next: true,
  text: 'Continue',
};

export const Previous = Template.bind({});
Previous.args = {
  ...defaultArgs,
  previous: true,
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
      <va-button previous text="Back" />
      <va-button next text="Continue" />
    </>
  );
};

export const ButtonPair = ButtonPairTemplate.bind({});
ButtonPair.args = {};
