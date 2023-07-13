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

let maintenanceEndDateTime = new Date();
maintenanceEndDateTime.setHours(maintenanceEndDateTime.getHours() + 4);
maintenanceEndDateTime.setMinutes(maintenanceEndDateTime.getMinutes() + 30);

let upcomingWarnStartDateTime = new Date();
upcomingWarnStartDateTime.setDate(upcomingWarnStartDateTime.getDate() - 1);

const defaultArgs = {
  'banner-id': 'maintenance-banner',
  'upcoming-warn-title': 'Upcoming site maintenance',
  'upcoming-warn-start-date-time': `${upcomingWarnStartDateTime}`,
  'maintenance-title': 'Site maintenance',
  'maintenance-start-date-time': `${new Date()}`,
  'maintenance-end-date-time': `${maintenanceEndDateTime}`
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

let maintenanceStartDateTime = new Date();
maintenanceEndDateTime = new Date();
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

Default.argTypes = propStructure(maintenanceBannerDocs);

