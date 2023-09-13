import React from 'react';
//import { VaMinimalHeader } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

//VaMinimalHeader.displayName = 'VaMinimalHeader';
const minimalHeaderDocs = getWebComponentDocs('va-minimal-header');

export default {
  title: 'Components/MinimalHeader',
  id: 'components/va-minimal-header',
  parameters: {
    componentSubtitle: `va-minimal-header web component`,
    docs: {
      page: () => <StoryDocs data={minimalHeaderDocs} />,
    },
  },
};

const defaultArgs = {
};
const Template = ({

}) => {
  return (
    <va-minimal-header 
      header="Authorization To Disclose Personal Information To A Third Party"
      subheader="(VA Form 21-0845)"
    />
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(minimalHeaderDocs);
