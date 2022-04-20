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
  'value': value,
  label,
  suggestions,
}) => (
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

const SuggestionsTemplate = ({
  'button-text': buttonText,
  'value': value,
  label,
  suggestions,
}) => (
  <div style={{ height: '200px' }}>
    <VaSearch
      buttonText={buttonText}
      value={value}
      label={label}
      onInput={e => console.log(e)}
      onSubmit={e => console.log(e)}
      suggestions={suggestions}
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
