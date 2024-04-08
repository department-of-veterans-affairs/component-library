/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const loadingIndicatorDocs = getWebComponentDocs('va-loading-indicator');

export default {
  title: 'Components/Loading indicator',
  id: 'components/va-loading-indicator',
  parameters: {
    componentSubtitle: `va-loading-indicator web component`,
    docs: {
      page: () => <StoryDocs data={loadingIndicatorDocs} />,
    },
    actions: {
      handles: ['component-library-analytics'],
    },
  },
};

const defaultArgs = {
  'message': 'Loading your application...',
  'label': 'Loading',
  'set-focus': false,
  'enable-analytics': false,
};

const Template = ({
  'enable-analytics': enableAnalytics,
  label,
  message,
  'set-focus': setFocus,
}) => {
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
          label={label}
          message={message}
          set-focus={setFocus}
          enable-analytics={enableAnalytics}
        ></va-loading-indicator>
      )}
    </div>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs};
Default.argTypes = propStructure(loadingIndicatorDocs);

export const SetFocus = Template.bind(null);
SetFocus.args = { ...defaultArgs, 'set-focus': true };

export const EnableAnalytics = Template.bind(null);
EnableAnalytics.args = { ...defaultArgs, 'enable-analytics': true };
