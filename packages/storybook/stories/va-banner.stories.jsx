import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const bannerDocs = getWebComponentDocs('va-banner');

export default {
  title: 'Components/Banner',
  id: 'components/va-banner',
  parameters: {
    componentSubtitle: `va-banner web component`,
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
  'data-label': dataLabel,
}) => {
  return (
    <va-banner
      disable-analytics={disableAnalytics}
      show-close={showClose}
      headline={headline}
      type={type}
      visible={visible}
      window-session={windowSession}
      data-label={dataLabel}
    >
      <p>
        We have temporarily closed our Acute Psychiatry at our Lyons Campus. All
        mental health admissions are being routed to our sister VA facilities in
        New York, Bronx and Manhattan or to the community as appropriate.
      </p>
      <a href="#">Get updates on affected services and facilities</a>
    </va-banner>
  );
};

const defaultArgs = {
  'headline': 'Temporary closure of acute psychiatry at Lyons',
  'show-close': false,
  'disable-analytics': false,
  'type': 'info',
  'visible': true,
  'window-session': false,
  'data-label': "Info banner"
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(bannerDocs);

export const Dismissible = Template.bind(null);
Dismissible.args = {
  ...defaultArgs,
  'show-close': true,
};
