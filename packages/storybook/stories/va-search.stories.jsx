import React from 'react';
import { VaSearch } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure } from './wc-helpers';
import { generateEventsDescription } from './events';

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
  'input-aria-activedescendant': inputAriaActiveDescendant,
  'input-aria-controls': inputAriaControls,
  'input-aria-expanded': inputAriaExpanded,
  label,
}) => (
  <VaSearch
    input-aria-activedescendant={inputAriaActiveDescendant}
    input-aria-controls={inputAriaControls}
    input-aria-expanded={inputAriaExpanded}
    label={label}
    onInputBlurEvent={e => console.log(e, 'INPUT BLUR FIRED')}
    onInputChangeEvent={e => console.log(e, 'INPUT CHANGE FIRED')}
    onInputClickEvent={e => console.log(e, 'INPUT CLICK FIRED')}
    onInputKeyDownEvent={e => console.log(e, 'INPUT KEYDOWN FIRED')}
    onButtonClickEvent={e => console.log(e, 'BUTTON CLICK FIRED')}
    onButtonFocusEvent={e => console.log(e, 'BUTTON FOCUS FIRED')}
    onButtonKeyDownEvent={e => console.log(e, 'BUTTON KEYDOWN FIRED')}
  />
);

const defaultArgs = {
  label: 'Search',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  'input-aria-activedescendant': undefined,
  'input-aria-controls': undefined,
  'input-aria-expanded': undefined,
};
Default.argTypes = propStructure(searchDocs);
