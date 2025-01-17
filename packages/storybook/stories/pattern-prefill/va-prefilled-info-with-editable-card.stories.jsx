import React from 'react';
import { Editable } from './va-card.stories';


export default {
  title: 'Patterns/Prefill/Usage Examples/Prefilled info with editable card',
  id: 'patterns/Editable-card',
  parameters: {
    componentSubtitle: 'va prefilled info with editable card',
  },
};

const Template = ({
}) => {
  return (
    <>
    <div style={{ padding: '20px' }}>
      <div>
        <h1 data-testid="form-title">
          Update your VA health benefits information
        </h1>
        <div>
          Health Benefits Update Form (VA Form 10-10EZR)
        </div>
      </div>
      <div className="vads-u-padding-top--3">
        <va-segmented-progress-bar
          current={1}
          heading-text="Veteran Information"
          total={5}
        />
      </div>
      <div class="nav-header">
        <div class="vads-u-font-size--h4">
          <span class="vads-u-display--block vads-u-font-family--sans vads-u-font-weight--normal vads-u-font-size--base">
            We’ll save your application on every change.{' '}
          </span>
        </div>
      </div>
      <h3>Confirm the contact information we have on file for you</h3>
       <Editable {...Editable.args} />
      </div>
    </>
  );
};

const defaultArgs = {
  'slim': true,
  'status': 'info',
  'children': (
    <p className="vads-u-margin-y--0">
      <strong>Note:</strong> We've prefilled some of your information from your
      account. If you need to correct anything, you can select edit below. All
      updates will be made only to this form.
    </p>
  ),
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
