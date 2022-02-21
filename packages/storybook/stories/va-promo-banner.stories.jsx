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
          `Alternatively you can change the banner-id since the new banner-id would not match the banner-id in storage.` +
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
  target,
  href,
  'render-custom': renderCustom,
  'banner-id': bannerId,
}) => {
  if (renderCustom) {
    return (
      <>
        <va-promo-banner
          disable-analytics={disableAnalytics}
          type={type}
          target={target}
          href={href}
          render-custom={renderCustom}
          banner-id={bannerId}
        >
          <h4>This is a custom rendered version</h4>
          <a href="#">Custom anchor inside of the custom render</a>
          <ul>
            <li>Apply for disability benefits</li>
            <li>Find a VA location</li>
            <li>Compare your GI Bill benefits by school</li>
          </ul>
        </va-promo-banner>
        <p>See the bottom of the page from the Promo Banner</p>
        <p>Don't see it? Read the instructions above about resetting the banner from storage</p>
      </>
    );
  } else {
    return (
      <>
        <va-promo-banner
          disable-analytics={disableAnalytics}
          type={type}
          target={target}
          href={href}
          render-custom={renderCustom}
          banner-id={bannerId}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </va-promo-banner>
        <p>See the bottom of the page from the Promo Banner</p>
        <p>Don't see it? Read the instructions above about resetting the banner from storage</p>
      </>
    );
  }
};

const defaultArgs = {
  'disable-analytics': false,
  'type': 'announcement',
  'target': '_self',
  'href': '#',
  'render-custom': false,
  'banner-id': 'ABC_BANNER',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(promoBannerDocs);
