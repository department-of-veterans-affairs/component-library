/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const loadingIndicatorDocs = getWebComponentDocs('va-loading-indicator');

export default {
  title: 'Components/va-loading-indicator',
  parameters: {
    actions: {
      handles: ['component-library-analytics'],
    },
  },
};

const defaultArgs = {
  message: 'Loading your application...',
  label: 'Loading',
  setFocus: false,
  enableAnalytics: false,
};

const Template = ({ message, setFocus, enableAnalytics }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      {enableAnalytics && (
        <button
          className="vads-u-display--flex vads-u-margin-x--auto"
          onClick={() => setIsLoading(false)}
        >
          Finish loading
        </button>
      )}
      {isLoading && (
        <va-loading-indicator
          message={message}
          set-focus={setFocus}
          enable-analytics={enableAnalytics}
        ></va-loading-indicator>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(loadingIndicatorDocs);

export const SetFocus = Template.bind({});
SetFocus.args = { ...defaultArgs, setFocus: true };

export const EnableAnalytics = Template.bind({});
EnableAnalytics.args = { ...defaultArgs, enableAnalytics: true };
