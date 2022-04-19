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
  'input-value': inputValue,
  label,
  suggestions,
}) => (
  <VaSearch
    buttonText={buttonText}
    inputValue={inputValue}
    label={label}
    onInputBlurEvent={e => console.log(e, 'INPUT BLUR FIRED')}
    onInputFocusEvent={e => console.log(e, 'INPUT FOCUS FIRED')}
    onInputKeyDownEvent={e => console.log(e, 'INPUT KEYDOWN FIRED')}
    onButtonClickEvent={e => console.log(e, 'BUTTON CLICK FIRED')}
    onButtonFocusEvent={e => console.log(e, 'BUTTON FOCUS FIRED')}
    onButtonKeyDownEvent={e => console.log(e, 'BUTTON KEYDOWN FIRED')}
    onSuggestionKeyDownEvent={e => console.log(e, 'SUGGESTION KEYDOWN FIRED')}
    suggestions={suggestions}
    onInput={e => console.log(e, 'INPUT EVENT FIRED')}
    onSubmit={e => console.log(e, 'SUBMIT EVENT FIRED')}
  />
);

const defaultArgs = {
  'button-text': undefined,
  'input-value': 'benefits',
  'label': undefined,
  'suggestions': undefined,
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

const SuggestionsTemplate = ({
  'button-text': buttonText,
  'input-value': inputValue,
  label,
  suggestions,
}) => (
  <div style={{ height: '200px' }}>
    <VaSearch
      buttonText={buttonText}
      inputValue={inputValue}
      label={label}
      onInputBlurEvent={e => console.log(e, 'INPUT BLUR FIRED')}
      onInputFocusEvent={e => console.log(e, 'INPUT FOCUS FIRED')}
      onInputKeyDownEvent={e => console.log(e, 'INPUT KEYDOWN FIRED')}
      onButtonClickEvent={e => console.log(e, 'BUTTON CLICK FIRED')}
      onButtonFocusEvent={e => console.log(e, 'BUTTON FOCUS FIRED')}
      onButtonKeyDownEvent={e => console.log(e, 'BUTTON KEYDOWN FIRED')}
      onSuggestionKeyDownEvent={e => console.log(e, 'SUGGESTION KEYDOWN FIRED')}
      suggestions={suggestions}
      onInput={e => console.log(e, 'INPUT EVENT FIRED')}
      onSubmit={e => console.log(e, 'SUBMIT EVENT FIRED')}
    />
  </div>
);

export const WithSuggestions = SuggestionsTemplate.bind({});
WithSuggestions.args = {
  ...defaultArgs,
  label: undefined,
  suggestions: [
    'benefits for spouses',
    'benefits for assisted living',
    'benefits for family',
  ],
};
