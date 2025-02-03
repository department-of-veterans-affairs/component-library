import React from 'react';
import { Uneditable } from './va-card.stories';

export default {
  title: 'Patterns/Prefill/Usage Examples/Prefilled info with uneditable card',
  id: 'patterns/va-prefilled-info-with-uneditable-card',
  parameters: {
    componentSubtitle: 'va prefilled info with uneditable card',
  },
};

const Template = ({
}) => {
  return (
    <>
    <div style={{ padding: '20px' }}>
      <div>
        <h1>
          Update your VA health benefits information
        </h1>
        <div>
          Health Benefits Update Form (VA Form 10-10EZR)
        </div>
      </div>
      <div className="vads-u-padding-top--3 vads-u-padding-bottom--0">
        <va-segmented-progress-bar
          current={1}
          heading-text="Veteran Information"
          total={5}
        />
      </div>
      <div class="nav-header">
        <div class="vads-u-font-size--h4">
          <span class="vads-u-display--block vads-u-font-family--sans vads-u-font-weight--normal vads-u-font-size--base vads-u-padding-top--0">
            We’ll save your application on every change.{' '}
          </span>
        </div>
      </div>
      <div className="vads-u-padding-y--2">
        <h3>Confirm the personal information we have on file for you</h3>
      </div>
      <Uneditable {...Uneditable.args}/>
      <p>
        <strong>Note:</strong> To protect your personal information, we don’t
        allow online changes to your name, date of birth, or Social Security
        number. If you need to change this information,
        call us at <va-telephone contact="8008271000"></va-telephone> (
          <va-telephone contact="711" tty />
          ). We're here [days and hours].<br/>
        <va-link href="#" text="Find more detailed instructions for how to change your legal name (opens in new tab)" />
      </p>
      </div>
    </>
  );
};


export const Default = Template.bind(null);
