import React from 'react';
import {
  VaAlert,
} from '@department-of-veterans-affairs/web-components/react-bindings';

export default {
  title: 'Patterns/Prefill/Usage Examples/Signed In Prefill Alert',
  id: 'patterns/va-prefill-signed-in',
  parameters: {
    componentSubtitle: 'va prefill pattern signed in',
  },
};

const Template = ({
  slim,
  status,
  headline,
  children,
}) => {
  return (
    <>
    <div style={{ padding: '20px' }}>
      <div>
        <h1>Request a Board Appeal</h1>
        <div>
          VA Form 10182 (Notice of Disagreement)
        </div>
      </div>
      <div className="vads-u-padding-y--2">
        <VaAlert
          slim={slim}
          status={status}
        >
          {headline}
          {children}
        </VaAlert>
      </div>
      <va-link-action
        href="#start"
        label="This is an aria label for the Action Link"
        text="Start the Board Appeal request"
       />
      </div>
    </>
  );
};

const defaultArgs = {
  'slim': true,
  'status': 'info',
  'children': (
    <p className="vads-u-margin-y--0">
      <strong>Note:</strong> Since you’re signed in to your account, we can
      prefill part of your application based on your account details. You can
      also save your application in progress and come back later to finish
      filling it out.
    </p>
  ),
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
