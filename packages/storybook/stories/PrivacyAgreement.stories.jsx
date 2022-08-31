import React, { useState } from 'react';
import PrivacyAgreement from '../../react-components/src/components/PrivacyAgreement/PrivacyAgreement';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Privacy agreement',
  component: PrivacyAgreement,
  id: 'components/privacyagreement',
  parameters: {
    componentSubtitle: 'Privacy agreement React component',
    docs: {
      page: () => <StoryDocs componentName="Privacy agreement" />,
    },
  },
};

const Template = args => {
  const [checked, setChecked] = useState(args.checked);
  const handler = () => setChecked(!checked);
  return (
    <div style={{ paddingLeft: '1em' }}>
      <PrivacyAgreement {...args} onChange={handler} checked={checked} />
    </div>
  );
};

const defaultArgs = {
  checked: false,
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };

export const WithError = Template.bind(null);
WithError.args = { ...defaultArgs, showError: true };
