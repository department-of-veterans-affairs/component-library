import React, { useState } from 'react';
import { VaPrivacyAgreement } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaPrivacyAgreement.displayName = 'VaPrivacyAgreement';

const privacyAgreementDocs = getWebComponentDocs('va-privacy-agreement');

export default {
  title: 'USWDS/Privacy agreement USWDS',
  id: 'uswds/va-privacy-agreement',
  parameters: {
    componentSubtitle: 'va-privacy-agreement web component',
    docs: {
      page: () => <StoryDocs data={privacyAgreementDocs} />,
    },
  },
};

const defaultArgs = {
  'checked': false,
  'show-error': false,
  'enable-analytics': false,
  'uswds': true,
};

const Template = ({
  checked,
  'show-error': showError,
  'enable-analytics': enableAnalytics,
  'uswds': uswds,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const handler = event => setIsChecked(event?.detail?.checked);

  if (isChecked) {
    showError = false;
  }
  return (
    <VaPrivacyAgreement
      checked={isChecked}
      uswds={uswds}
      showError={showError}
      enable-analytics={enableAnalytics}
      onVaChange={handler}
    />
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };

Default.argTypes = propStructure(privacyAgreementDocs);

export const WithError = Template.bind(null);
WithError.args = { ...defaultArgs, 'show-error': true };

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };
