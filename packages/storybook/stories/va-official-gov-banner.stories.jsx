import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const officialGovBannerDocs = getWebComponentDocs('va-official-gov-banner');

export default {
  title: 'Components/Banner - Official Gov',
  id: 'components/va-official-gov-banner',
  parameters: {
    componentSubtitle: `va-official-gov-banner web component`,
    docs: {
      page: () => <StoryDocs data={officialGovBannerDocs} />,
    },
  }
};

const defaultArgs = {
  'disable-analytics': false
};

const Template = ({
  'disable-analytics': disableAnalytics
}) => {
  return (
    <va-official-gov-banner 
        disable-analytics={disableAnalytics}>
    </va-official-gov-banner>
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(officialGovBannerDocs);