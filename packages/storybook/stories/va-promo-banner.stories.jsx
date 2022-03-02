import React from 'react';
import { generateEventsDescription } from './events';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const promoBannerDocs = getWebComponentDocs('va-promo-banner');

export default {
  title: 'Components/va-promo-banner',
  parameters: {
    docs: {
      description: {
        component:
          `Reset the banner in storage by opening Developer Tools in the browser and then clicking on the Application Tab. ` +
          `Under Storage you will see Local Storage and check the Storage to see if a DISMISSED_PROMO_BANNERS Key exists. ` +
          `If it does right click and delete it and refresh your page to see the banner again. ` +
          `Alternatively you can change the id on the component since the new id would not match the id in storage.` +
          generateEventsDescription(promoBannerDocs),
      },
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['announcement', 'news', 'email-signup'],
      },
    },
    target: {
      control: {
        type: 'select',
        options: ['_self', '_blank'],
      },
    },
  },
};

const Template = ({
  'disable-analytics': disableAnalytics,
  type,
  href,
}) => {
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
