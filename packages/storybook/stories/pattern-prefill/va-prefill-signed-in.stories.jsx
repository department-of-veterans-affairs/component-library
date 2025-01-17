import React from 'react';
import { SignedInPrefillAlert } from './va-prefill-alert.stories';


export default {
  title: 'Patterns/Prefill/Usage Examples/Signed In Prefill Alert',
  id: 'patterns/va-prefill-signed-in',
  parameters: {
    componentSubtitle: 'va prefill pattern signed in',
  },
};

const Template = ({
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
      <SignedInPrefillAlert {...SignedInPrefillAlert.args} />
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

export const Default = Template.bind(null);
