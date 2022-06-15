import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const bannerDocs = getWebComponentDocs('va-banner');

export default {
  title: 'Components/Banner/va-banner',
  id: 'Components/va-banner',
  parameters: {
    componentSubtitle: `Banner web component`,
    docs: {
      page: () => <StoryDocs data={bannerDocs} />,
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['error', 'info', 'success', 'continue', 'warning'],
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

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(bannerDocs);

export const Closeable = Template.bind(null);
Closeable.args = {
  ...defaultArgs,
  'show-close': true,
};
