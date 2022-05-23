import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { category, level } from './maturity-scale';

const promoBannerDocs = getWebComponentDocs('va-promo-banner');

export default {
  title: 'Components/va-promo-banner',
  parameters: {
    componentSubtitle: 'Promo banner web component',
    docs: {
      page: () => (
        <StoryDocs
          data={{
            ...promoBannerDocs,
            guidance: {
              componentHref: 'promo-banners',
              componentName: 'Promo banner',
            },
            maturity: {
              category: category.USE,
              level: level.DEPLOYED,
            },
            description:
              `Reset the banner in storage by opening Developer Tools in the browser and then clicking on the Application Tab. ` +
              `Under Storage you will see Local Storage and check the Storage to see if a DISMISSED_PROMO_BANNERS Key exists. ` +
              `If it does right click and delete it and refresh your page to see the banner again. ` +
              `Alternatively you can change the id on the component since the new id would not match the id in storage.`,
          }}
        />
      ),
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

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(promoBannerDocs);
