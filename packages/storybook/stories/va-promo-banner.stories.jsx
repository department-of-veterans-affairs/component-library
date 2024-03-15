import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const promoBannerDocs = getWebComponentDocs('va-promo-banner');

export default {
  title: 'V1 Components/Banner - Promo',
  id: 'components/va-promo-banner',
  parameters: {
    componentSubtitle: 'va-promo-banner web component',
    docs: {
      page: () => <StoryDocs data={promoBannerDocs} />,
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['announcement', 'news', 'email-signup'],
      },
    },
  },
};

const Template = ({ 'disable-analytics': disableAnalytics, type, href }) => {
  return (
    <>
      <va-promo-banner
        disable-analytics={disableAnalytics}
        type={type}
        href={href}
        id="ABC_BANNER"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </va-promo-banner>
      <p>See the bottom of the page from the Promo Banner</p>
      <p>
        Don't see it? Read the instructions above about resetting the banner
        from storage
      </p>
    </>
  );
};

const defaultArgs = {
  'disable-analytics': false,
  'type': 'announcement',
  'href': '#',
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(promoBannerDocs);
