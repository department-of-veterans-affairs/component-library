import React, { useState } from 'react';
import { VaSearchInput } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaSearchInput.displayName = 'VaSearchInput';

const searchDocs = getWebComponentDocs('va-search-input');

export default {
  title: 'Components/Search input USWDS',
  id: 'uswds/va-search-input',
  parameters: {
    componentSubtitle: 'va-search-input web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={searchDocs} />,
    },
  },
};

const Template = ({'button-text': buttonText, value, label, suggestions, small, big }) => (
  <div style={{ height: '100px'}}>
    <VaSearchInput
      buttonText={buttonText}
      value={value}
      label={label}
      onInput={e => console.log(e)}
      onSubmit={e => console.log(e)}
      suggestions={suggestions}
      small={small}
      big={big}
    />
  </div>
);

const defaultArgs = {
  'button-text': 'Search',
  'value': 'benefits',
  'label': 'Search VA.gov',
  'suggestions': undefined,
  'small': false,
  'big': false,
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(searchDocs);

export const WithButtonText = Template.bind(null);
WithButtonText.args = {
  ...defaultArgs,
  'button-text': 'Search',
};

export const Big = Template.bind(null);
Big.args = {
  ...defaultArgs,
  big: true,
};

export const Small = Template.bind(null);
Small.args = {
  ...defaultArgs,
  small: true,
};

const TypeaheadTemplate = ({ value, suggestions }) => {
  const [latestSuggestions, setLatestSuggestions] = useState(suggestions);

  /**
   * Mock suggestions
   * Provides suggestions for the following values: for, form, forms
   * All other values will return an empty array
   */
  const mockSuggestions = [
    'foreign study',
    'forever gi bill',
    'form',
    'form finder',
    'form search',
    'forms',
  ];

  const handleInput = e => {
    console.log('onInput: ', e.target.value);
    if (e.target.value.length < 3) return;
    setTimeout(
      () =>
        setLatestSuggestions(
          mockSuggestions.filter(suggestion =>
            suggestion.includes(e.target.value),
          ),
        ),
      1000,
    );
  };

  const handleSubmit = e => {
    console.log('onSubmit: ', e.target.value);
  };

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
        onInput={handleInput}
        onSubmit={handleSubmit}
        suggestions={latestSuggestions}
      />

    </div>
  );
};
export const WithTypeahead = TypeaheadTemplate.bind(null);
WithTypeahead.args = {
  ...defaultArgs,
  value: '',
  suggestions: [],
};
