import React, { useState } from 'react';

import PrivacyAgreement from './PrivacyAgreement';

export default {
  title: 'Library/PrivacyAgreement',
  component: PrivacyAgreement,
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

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

export const WithError = Template.bind({});
WithError.args = { ...defaultArgs, showError: true };
