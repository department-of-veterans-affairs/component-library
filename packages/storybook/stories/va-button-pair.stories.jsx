import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

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
  'continue': undefined,
  'disable-analytics': undefined,
  'primaryLabel': undefined,
  'secondaryLabel': undefined,
  'submit': undefined,
};

const Template = ({
  'continue': _continue,
  // 'disable-analytics': disableAnalytics,
  'primary-label': primaryLabel,
  'secondary-label': secondaryLabel,
  submit,
}) => {
  return (
    <va-button-pair
      continue={_continue}
      // disable-analytics={disableAnalytics}
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
