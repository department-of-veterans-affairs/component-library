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
  'disable-analytics': undefined,
  'disabled': undefined,
  'label': undefined,
  'next': undefined,
  'previous': undefined,
  'secondary': undefined,
  'submit': undefined,
  'text': 'Text',
};

const Template = ({
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

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(buttonDocs);
