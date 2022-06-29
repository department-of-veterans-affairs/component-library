import React from 'react';
import { VaButtonPair } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

// Fix for displaying component name when using bindings in 'Show code'
VaButtonPair.displayName = 'VaButtonPair';

const buttonPairDocs = getWebComponentDocs('va-button-pair');

export default {
  title: 'Components/va-button-pair',
  parameters: {
    componentSubtitle: `Button pair web component`,
    docs: {
      page: () => <StoryDocs data={buttonPairDocs} />,
    },
  },
};

const defaultArgs = {
  'confirm': undefined,
  'disable-analytics': undefined,
  'primary-label': undefined,
  'secondary-label': undefined,
  'submit': undefined,
};

const Template = ({
  confirm,
  'disable-analytics': disableAnalytics,
  'primary-label': primaryLabel,
  'secondary-label': secondaryLabel,
  submit,
}) => {
  return (
    <VaButtonPair
      confirm={confirm}
      disable-analytics={disableAnalytics}
      primaryLabel={primaryLabel}
      secondaryLabel={secondaryLabel}
      submit={submit}
      onPrimaryClick={e => console.log(e)}
      onSecondaryClick={e => console.log(e)}
    />
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(buttonPairDocs);

export const Confirm = Template.bind(null);
Confirm.args = {
  ...defaultArgs,
  confirm: true,
};
