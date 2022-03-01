import React from 'react';
import { generateEventsDescription } from './events';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const bannerDocs = getWebComponentDocs('va-banner');

export default {
  title: 'Components/va-banner',
  parameters: {
    docs: {
      description: {
        component:
          `Reset the banners in storage by opening Developer Tools in the browser and then clicking on the Application Tab. ` +
          `Under Storage you will see both Local and Session Storage check each Storage to see if a DISMISSED_BANNERS Key exists. ` +
          `If it does right click and delete it and refresh your page to see the banners again.` +
          generateEventsDescription(bannerDocs),
      },
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['error', 'info'],
      },
    },
  },
};

const Template = ({
  'disable-analytics': disableAnalytics,
  'show-close': showClose,
  headline,
  type,
  visible,
  'window-session': windowSession,
}) => {
  return (
    <va-banner
      disable-analytics={disableAnalytics}
      show-close={showClose}
      headline={headline}
      type={type}
      visible={visible}
      window-session={windowSession}
    >
      Congress shall make no law respecting an establishment of religion, or
      prohibiting the free exercise thereof; or abridging the freedom of speech,
      or of the press; <a href="#">LINK TEST</a> or the right of the people
      peaceably to assemble, and to petition the Government for a redress of
      grievances.
    </va-banner>
  );
};

const defaultArgs = {
  'headline': 'This is a test',
  'show-close': false,
  'disable-analytics': false,
  'type': 'error',
  'visible': true,
  'window-session': false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(bannerDocs);

export const Closeable = Template.bind({});
Closeable.args = {
  ...defaultArgs,
  'show-close': true,
};
