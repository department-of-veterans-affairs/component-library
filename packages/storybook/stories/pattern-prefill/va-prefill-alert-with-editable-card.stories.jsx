import React from 'react';
import {
  VaAlert,
} from '@department-of-veterans-affairs/web-components/react-bindings';

export default {
  title: 'Patterns/Prefill/Usage Examples/Prefill alert with editable card',
  id: 'patterns/va-prefill-alert-with-editable-card',
  parameters: {
    componentSubtitle: 'va prefill alert with editable card',
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
      <div className="vads-u-padding-y--2">
        <VaAlert
          slim={slim}
          status={status}
        >
          {headline}
          {children}
        </VaAlert>
      </div>
      <h3>Mailing address</h3>
      <p>
        We’ll send any important information about your application to this
        address.
      </p>
      <va-card background="false" class="vads-u-padding-left--3 hydrated">
        <p class="vads-u-font-weight--bold vads-u-font-family--serif vads-u-margin-y--1">
          Current mailing address
        </p>
        <div
          class="dd-privacy-hidden vads-u-padding-bottom--1"
          data-dd-action-name="street"
        >
          123 Mailing Address St.
        </div>
        <div
          class="dd-privacy-hidden"
          data-dd-action-name="city, state and zip code"
        >
          Fulton, NY 97063
        </div>
        <div class="vads-u-margin-y--1">
          <va-link
          active
          label="Edit mailing address"
          href="/mock-form-ae-design-patterns/1/task-yellow/veteran-information/edit-mailing-address"
          text="Edit"
          />
        </div>
      </va-card>
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
