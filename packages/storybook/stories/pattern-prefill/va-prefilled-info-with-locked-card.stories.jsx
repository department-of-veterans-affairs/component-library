import React from 'react';
import {
  VaAlert,
  VaButtonPair,
} from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from '../wc-helpers';
import { Locked } from './va-card.stories';

const textInputDocs = getWebComponentDocs('va-text-input');

export default {
  title: 'Patterns/Prefill/Usage Examples/Prefilled info with locked card',
  id: 'patterns/va-prefilled-info-with-locked-card',
  parameters: {
    componentSubtitle: 'va prefilled info with locked card',
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
      <div className="vads-u-padding-top--3 vads-u-padding-bottom--0">
        <va-segmented-progress-bar
          current={1}
          heading-text="Veteran Information"
          total={5}
        />
      </div>
      <div class="nav-header">
        <div data-testid="navFormDiv" class="vads-u-font-size--h4">
          <span class="vads-u-display--block vads-u-font-family--sans vads-u-font-weight--normal vads-u-font-size--base vads-u-padding-top--0">
            We’ll save your application on every change.{' '}
          </span>
        </div>
      </div>
      <div className="vads-u-padding-y--2">
        <p>Confirm your information before you continue.</p>
      </div>
      <Locked {...{ background: true, isLocked: true }} />
      <p>
        <strong>Note:</strong> To protect your personal information, we don’t
        allow online changes to your name, date of birth, or Social Security
        number. If you need to change this information for your health benefits,
        call your VA health facility.{' '}
        <va-link href="#" text="Find your VA health facility" />
      </p>
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
