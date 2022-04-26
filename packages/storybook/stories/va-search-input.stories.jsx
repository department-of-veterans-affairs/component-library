import React, { useEffect, useState } from 'react';
import { VaSearchInput } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure } from './wc-helpers';
import { generateEventsDescription } from './events';

VaSearchInput.displayName = 'VaSearchInput';

const searchDocs = getWebComponentDocs('va-search-input');

export default {
  title: 'Components/va-search-input',
  parameters: {
    componentSubtitle: 'Search Input web component',
    docs: {
      description: {
        component: generateEventsDescription(searchDocs),
      },
    },
  },
};

const Template = ({ 'button-text': buttonText, value, label, suggestions }) => (
  <VaSearchInput
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
  'label': 'Search',
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

const TypeaheadTemplate = ({ value, suggestions }) => {
  const [text, setText] = useState(value);
  const [latestSuggestions, setLatestSuggestions] = useState(suggestions);

  const handleInput = e => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const handleSubmit = e => {
    console.log(e.target.value);
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
    <div style={{ height: '400px' }}>
      <p>
        Start by typing '<strong>for</strong>'.
      </p>
      <p>
        Suggestions will show up in this example for the following values: for,
        form, forms
      </p>
      <VaSearchInput
        value={value}
        onInput={handleInput}
        onSubmit={handleSubmit}
        suggestions={latestSuggestions}
      />
    </div>
  );
};
export const WithTypeahead = TypeaheadTemplate.bind({});
WithTypeahead.args = {
  ...defaultArgs,
  value: '',
  suggestions: [],
};
