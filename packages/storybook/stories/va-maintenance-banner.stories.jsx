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
      <span>We’ll be doing some work on VA.gov. The&nbsp;<a href="https://depo-platform-documentation.scrollhelp.site/developer-docs/Frontend-developer-documentation.687931428.html">maintenance</a>&nbsp;will last X hours. During that time, you won’t be able to sign in or use tools.</span>
    </div>
    <div slot="maintenance-content">
      We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience.
    </div>
  </va-maintenance-banner>
);

let expiresAt = new Date();
expiresAt.setHours(expiresAt.getHours() + 4);

let warnStartsAt = new Date();
warnStartsAt.setDate(warnStartsAt.getDate() - 1);

const defaultArgs = {
  'banner-id': 'maintenance-banner',
  'maintenance-title': 'Site maintenance',
  'warn-title': 'Upcoming site maintenance',
  'starts-at': `${new Date()}`,
  'expires-at': `${expiresAt}`,
  'warn-starts-at': `${warnStartsAt}`
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

let startsAt = new Date();
startsAt.setDate(startsAt.getDate() + 1);
expiresAt.setDate(expiresAt.getDate() + 2);

export const MaintenanceWarning = Template.bind(null);
MaintenanceWarning.args = {
  ...defaultArgs,
  'starts-at': `${startsAt}`,
  'expires-at': `${expiresAt}`,
  'warn-starts-at': `${new Date()}` 
};

Default.argTypes = propStructure(maintenanceBannerDocs);

