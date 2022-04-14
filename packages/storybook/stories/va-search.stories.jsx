import React, { useState } from 'react';
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
  'show-suggestions': showSuggestions,
  suggestions,
}) => (
  <VaSearch
    buttonText={buttonText}
    inputValue={inputValue}
    label={label}
    onInputBlurEvent={e => console.log(e, 'INPUT BLUR FIRED')}
    onInputChangeEvent={e => console.log(e, 'INPUT CHANGE FIRED')}
    onInputFocusEvent={e => console.log(e, 'INPUT FOCUS FIRED')}
    onInputKeyDownEvent={e => console.log(e, 'INPUT KEYDOWN FIRED')}
    onButtonClickEvent={e => console.log(e, 'BUTTON CLICK FIRED')}
    onButtonFocusEvent={e => console.log(e, 'BUTTON FOCUS FIRED')}
    onButtonKeyDownEvent={e => console.log(e, 'BUTTON KEYDOWN FIRED')}
    onSuggestionKeyDownEvent={e => console.log(e, 'SUGGESTION KEYDOWN FIRED')}
    onBlur={() => setShowSuggestionsState(false)}
    onFocus={() => setShowSuggestionsState(true)}
    suggestions={suggestions}
    showSuggestions={showSuggestions}
  />
);

const defaultArgs = {
  'button-text': undefined,
  'input-value': 'benefits',
  'label': undefined,
  'suggestions': undefined,
  'show-suggestions': false,
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
}) => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  return (
    <div style={{ height: '200px' }}>
      <VaSearch
        buttonText={buttonText}
        inputValue={inputValue}
        label={label}
        onInputBlurEvent={e => console.log(e, 'INPUT BLUR FIRED')}
        onInputChangeEvent={e => console.log(e, 'INPUT CHANGE FIRED')}
        onInputFocusEvent={e => console.log(e, 'INPUT FOCUS FIRED')}
        onInputKeyDownEvent={e => console.log(e, 'INPUT KEYDOWN FIRED')}
        onButtonClickEvent={e => console.log(e, 'BUTTON CLICK FIRED')}
        onButtonFocusEvent={e => console.log(e, 'BUTTON FOCUS FIRED')}
        onButtonKeyDownEvent={e => console.log(e, 'BUTTON KEYDOWN FIRED')}
        onSuggestionKeyDownEvent={e =>
          console.log(e, 'SUGGESTION KEYDOWN FIRED')
        }
        showSuggestions={showSuggestions}
        suggestions={suggestions}
        onBlur={() => setShowSuggestions(false)}
        onFocus={() => setShowSuggestions(true)}
      />
    </div>
  );
};

export const WithSuggestions = SuggestionsTemplate.bind({});
WithSuggestions.args = {
  ...defaultArgs,
  suggestions: [
    'benefits for spouses',
    'benefits for assisted living',
    'benefits for family',
  ],
};
