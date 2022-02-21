import React from 'react';
import { generateEventsDescription } from './events';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const promoBannerDocs = getWebComponentDocs('va-promo-banner');

export default {
  title: 'Components/va-promo-banner',
  parameters: {
    docs: {
      description: {
        component: generateEventsDescription(promoBannerDocs),
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
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </va-promo-banner>
        <p>See the bottom of the page from the Promo Banner</p>
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
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(promoBannerDocs);
