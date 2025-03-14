import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const criticalInformationDocs = getWebComponentDocs('va-critical-information');

export default {
  title: 'Components/Critical information',
  id: 'components/va-critical-information',
  parameters: {
    componentSubtitle: 'va-critical-information web component',
    docs: {
      page: () => (
        <StoryDocs storyDefault={Default} data={criticalInformationDocs} />
      ),
    },
  },
};

const Template = args => {
  const { link, text } = args;

  return <va-critical-information link={link} text={text} />;
};

export const Default = Template.bind({});
Default.args = {
  link: 'https://www.va.gov/disability',
  text: 'Add evidence by July 23, 2025',
};

Default.argTypes = {
  ...propStructure(criticalInformationDocs),
};
