import React from 'react';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  componentStructure,
} from './wc-helpers';

const minimalHeaderDocs = getWebComponentDocs('va-header-minimal');

export default {
  title: 'Components/Header - Minimal',
  id: 'components/va-header-minimal',
  parameters: {
    componentSubtitle: 'va-header-minimal web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={minimalHeaderDocs} />,
    },
  },
};

const defaultArgs = {
  header: 'Authorization To Disclose Personal Information To A Third Party',
  subheader: '',
  'disable-headings': false
};
const Template = ({ header, subheader, 'disable-headings': disableHeadings }) => {
  return <va-header-minimal header={header} subheader={subheader} disable-headings={disableHeadings} />;
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(minimalHeaderDocs);

export const withSubheader = Template.bind(null);
withSubheader.args = {
  ...defaultArgs,
  subheader: '(VA Form 21-0845)',
};
