/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const loadingIndicatorDocs = getWebComponentDocs('va-loading-indicator');

export default {
  title: 'Components/va-loading-indicator',
};

const defaultArgs = {
  message: 'Loading your application...',
  setFocus: false,
};

const Template = ({ message, setFocus }) => {
  return (
    <va-loading-indicator
      message={message}
      set-focus={setFocus}
    ></va-loading-indicator>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(loadingIndicatorDocs);

export const SetFocus = Template.bind({});
SetFocus.args = { ...defaultArgs, setFocus: true };
