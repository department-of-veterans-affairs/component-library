import React from 'react';
import { VaSearch } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure } from './wc-helpers';
import { generateEventsDescription } from './events';

VaSearch.displayName = 'VaSearch';

const searchDocs = getWebComponentDocs('va-search');

export default {
  title: 'Components/va-search',
  parameters: {
    docs: {
      description: {
        component: generateEventsDescription(searchDocs),
      },
    },
  },
};

const Template = ({
  'button-text': buttonText,
  'hide-button': hideButton,
  'input-value': inputValue,
  label,
}) => (
  <VaSearch
    buttonText={buttonText}
    hideButton={hideButton}
    inputValue={inputValue}
    label={label}
    onInputBlurEvent={e => console.log(e, 'INPUT BLUR FIRED')}
    onInputChangeEvent={e => console.log(e, 'INPUT CHANGE FIRED')}
    onInputKeyDownEvent={e => console.log(e, 'INPUT KEYDOWN FIRED')}
    onButtonClickEvent={e => console.log(e, 'BUTTON CLICK FIRED')}
    onButtonFocusEvent={e => console.log(e, 'BUTTON FOCUS FIRED')}
    onButtonKeyDownEvent={e => console.log(e, 'BUTTON KEYDOWN FIRED')}
  />
);

const defaultArgs = {
  'button-text': undefined,
  'hide-button': false,
  'input-value': undefined,
  'label': 'Search',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(searchDocs);

export const WithButtonText = Template.bind({});
WithButtonText.args = {
  ...defaultArgs,
  'button-text': 'Search',
};
