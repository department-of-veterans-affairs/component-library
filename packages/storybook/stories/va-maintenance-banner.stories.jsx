import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const maintenanceBannerDocs = getWebComponentDocs('va-maintenance-banner');

export default {
  title: 'Components/Banner - Maintenance',
  id: 'components/va-maintenance-banner',
  parameters: {
    componentSubtitle: `va-maintenance-banner web component`,
    docs: {
      page: () => <StoryDocs data={maintenanceBannerDocs} />,
    },
  },
};

const Template = args => (
  <va-maintenance-banner {...args}
    
  >
    <div slot="warn-content">
      <span>We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools.</span>
    </div>
    <div slot="maintenance-content">
      We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience.
    </div>
  </va-maintenance-banner>
);

const maintenanceTime = new Date(2025, 5, 21);

let maintenanceEndDateTime = new Date(maintenanceTime);
maintenanceEndDateTime.setHours(maintenanceEndDateTime.getHours() + 4);
maintenanceEndDateTime.setMinutes(maintenanceEndDateTime.getMinutes() + 30);

let upcomingWarnStartDateTime = new Date();
upcomingWarnStartDateTime.setDate(upcomingWarnStartDateTime.getDate() - 1);

const defaultArgs = {
  'banner-id': 'maintenance-banner',
  'upcoming-warn-title': 'Upcoming site maintenance',
  'upcoming-warn-start-date-time': `${upcomingWarnStartDateTime}`,
  'maintenance-title': 'Site maintenance',
  'maintenance-start-date-time': `${new Date(maintenanceTime)}`,
  'maintenance-end-date-time': `${maintenanceEndDateTime}`
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
  isError: true,
};

let maintenanceStartDateTime = new Date(maintenanceTime);
maintenanceEndDateTime = new Date(maintenanceTime);
maintenanceStartDateTime.setDate(maintenanceStartDateTime.getDate() + 1);
maintenanceEndDateTime.setDate(maintenanceStartDateTime.getDate());
maintenanceEndDateTime.setHours(maintenanceStartDateTime.getHours() + 2);
export const MaintenanceWarning = Template.bind(null);
MaintenanceWarning.args = {
  ...defaultArgs,
  'maintenance-start-date-time': `${maintenanceStartDateTime}`,
  'maintenance-end-date-time': `${maintenanceEndDateTime}`,
  'upcoming-warn-start-date-time': `${new Date()}` 
};
Default.parameters = { chromatic: { diffThreshold: 0.8 } }

Default.argTypes = propStructure(maintenanceBannerDocs);
Default.parameters = { chromatic: { diffThreshold: 0.5 } }

