import React, { useEffect, useState } from 'react';
import { VaSearch } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure } from './wc-helpers';
import { generateEventsDescription } from './events';

VaSearch.displayName = 'VaSearch';

const searchDocs = getWebComponentDocs('va-search');

export default {
  title: 'Components/va-search',
  parameters: {
    componentSubtitle: 'Search web component',
    docs: {
      description: {
        component: generateEventsDescription(searchDocs),
      },
    },
  },
};

const Template = ({ 'button-text': buttonText, value, label, suggestions }) => (
  <VaSearch
    buttonText={buttonText}
    value={value}
    label={label}
    onInput={e => console.log(e)}
    onSubmit={e => console.log(e)}
    suggestions={suggestions}
  />
);

const defaultArgs = {
  'button-text': undefined,
  'value': 'benefits',
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

const SuggestionsTemplate = ({ value, suggestions }) => {
  const [text, setText] = useState(value);
  const [latestSuggestions, setLatestSuggestions] = useState(suggestions);

  const handleInput = e => {
    console.log(e);
    // event.composedPath()[0].value outside of React
    setText(e.nativeEvent.composedPath()[0].value);
  };

  const handleSubmit = e => {
    // e.detail.value outside of React
    console.log(e.nativeEvent.detail.value);
  };

  /**
   * Mock suggestions
   * Provides suggestions for the following values: for, form, forms
   * All other values will return an empty array
   */
  useEffect(() => {
    switch (text) {
      case 'for':
        setTimeout(() => {
          setLatestSuggestions([
            'form',
            'form finder',
            'form search',
            'foreign study',
            'forever gi bill',
          ]);
        }, 1000);
        break;
      case 'form':
        setTimeout(() => {
          setLatestSuggestions(['form', 'forms', 'form finder', 'form search']);
        }, 1000);
        break;
      case 'forms':
        setTimeout(() => {
          setLatestSuggestions(['forms']);
        }, 1000);
        break;
      default:
        setTimeout(() => {
          setLatestSuggestions([]);
        }, 1000);
        break;
    }
  }, [text]);

  return (
    <div className="vads-u-padding--2" style={{ height: '400px' }}>
      <p>
        Start by typing '<strong>for</strong>'.
      </p>
      <p>
        Suggestions will show up in this example for the following values: for,
        form, forms
      </p>
      <VaSearch
        value={value}
        onInput={handleInput}
        onSubmit={handleSubmit}
        suggestions={latestSuggestions}
      />
    </div>
  );
};
export const WithSuggestions = SuggestionsTemplate.bind({});
WithSuggestions.args = {
  ...defaultArgs,
  value: '',
  suggestions: [],
};
