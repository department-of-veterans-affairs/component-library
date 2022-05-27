import React from 'react';
import { generateEventsDescription } from './events';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const maintenanceBannerDocs = getWebComponentDocs('va-maintenance-banner');

export default {
  title: 'Components/va-maintenance-banner',
  parameters: {
    componentSubtitle: `Maintenance banner web component`,
    docs: {
      description: {
        component:
          `<a className="vads-c-action-link--blue" href="https://design.va.gov/components/banner">View guidance for the Banner component in the Design System</a>` +
          `\n` +
          `Reset the banners in storage by opening Developer Tools in the browser and then clicking on the Application Tab. ` +
          `Under Storage you will see both Local and Session Storage check each Storage to see if a DISMISSED_BANNERS Key exists. ` +
          `If it does right click and delete it and refresh your page to see the banners again.` +
          generateEventsDescription(maintenanceBannerDocs),
      },
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
  'down-content': downContent,
  type,
  visible,
  'window-session': windowSession,
}) => {
  return (
    <va-maintenance-banner
      headline="Upcoming site maintenance"
      down-content="We'll be doing some work on VA.gov. The maintenance will last X hours. During that time you won't be able to sign in or use tools."
    >
    </va-maintenance-banner>
  );
};

const defaultArgs = {
  'headline': 'This is a test',
};

export const DuringMaintenance = Template.bind({});
DuringMaintenance.args = {
  ...defaultArgs,
};
DuringMaintenance.argTypes = propStructure(maintenanceBannerDocs);

export const BeforeMaintenance = Template.bind({});
BeforeMaintenance.args = {
  ...defaultArgs,
};
