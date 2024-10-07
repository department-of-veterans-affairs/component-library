import React from 'react';
import {
  VaAlert,
  VaButtonPair,
} from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from '../wc-helpers';

const textInputDocs = getWebComponentDocs('va-text-input');

export default {
  title: 'Patterns/Prefill/Usage Examples/Prefill alert with unlocked card',
  id: 'patterns/va-prefill-alert-with-editable-unlocked-card',
  parameters: {
    componentSubtitle: 'va prefill alert with unlocked card',
  },
};

const Template = ({
  slim,
  status,
  'disable-analytics': disableAnalytics,
  visible,
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  'full-width': fullWidth,
  headline,
  onCloseEvent,
  children,
}) => {
  return (
    <>
      <div class="schemaform-title">
        <h1 data-testid="form-title">
          Update your VA health benefits information
        </h1>
        <div class="schemaform-subtitle" data-testid="form-subtitle">
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
        <div data-testid="navFormDiv" class="vads-u-font-size--h4">
          <span class="vads-u-display--block vads-u-font-family--sans vads-u-font-weight--normal vads-u-font-size--base">
            We’ll save your application on every change.{' '}
          </span>
        </div>
      </div>
      <div className="vads-u-padding-y--2">
        <VaAlert
          slim={slim}
          status={status}
          disableAnalytics={disableAnalytics}
          visible={visible}
          closeBtnAriaLabel={closeBtnAriaLabel}
          closeable={closeable}
          fullWidth={fullWidth}
          onCloseEvent={onCloseEvent}
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
          <a
            class="vads-u-font-weight--bold"
            aria-label="Edit mailing address"
            href="/mock-form-ae-design-patterns/1/task-yellow/veteran-information/edit-mailing-address"
          >
            Edit{' '}
            <span class="vads-u-visibility--screen-reader">
              your mailing address
            </span>
            <va-icon
              icon="chevron_right"
              size="2"
              class="hydrated"
              style={{ position: 'relative', top: '-5px', left: '-1px' }}
            ></va-icon>{' '}
          </a>
        </div>
      </va-card>
    </>
  );
};

const defaultArgs = {
  'slim': true,
  'status': 'info',
  'disable-analytics': false,
  'visible': true,
  'close-btn-aria-label': 'Close notification',
  'closeable': false,
  'full-width': false,
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
