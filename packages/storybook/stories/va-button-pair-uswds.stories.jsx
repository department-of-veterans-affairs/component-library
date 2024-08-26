import React from 'react';
import { VaButtonPair } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

// Fix for displaying component name when using bindings in 'Show code'
VaButtonPair.displayName = 'VaButtonPair';

const buttonPairDocs = getWebComponentDocs('va-button-pair');

export default {
  title: 'Components/Button pair USWDS',
  id: 'uswds/va-button-pair',
  parameters: {
    componentSubtitle: 'va-button-pair web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={buttonPairDocs} />,
    },
  },
};

const defaultArgs = {
  'continue': undefined,
  'disable-analytics': undefined,
  'primary-label': undefined,
  'secondary-label': undefined,
  'submit': undefined,
  'update': undefined,
  'left-button-text': undefined,
  'right-button-text': undefined
};

const Template = ({
  'continue': _continue,
  'disable-analytics': disableAnalytics,
  'primary-label': primaryLabel,
  'secondary-label': secondaryLabel,
  submit,
  update,
  'left-button-text': lbText,
  'right-button-text': rbText
}) => {
  return (
    <div style={{ paddingLeft: '8px' }}>
      <VaButtonPair
        continue={_continue}
        disable-analytics={disableAnalytics}
        primaryLabel={primaryLabel}
        secondaryLabel={secondaryLabel}
        submit={submit}
        onPrimaryClick={e => console.log(e)}
        onSecondaryClick={e => console.log(e)}
        update={update}
        leftButtonText={lbText}
        rightButtonText={rbText}
      />
    </div>
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(buttonPairDocs);

export const Update = Template.bind(null);
Update.args = {
  ...defaultArgs,
  update: true,
};

export const Continue = Template.bind(null);
Continue.args = {
  ...defaultArgs,
  continue: true,
};

export const CustomButtonText = Template.bind(null);
CustomButtonText.args = {
  ...defaultArgs,
  'left-button-text': 'Agree to these terms',
  'right-button-text': 'File later'
}