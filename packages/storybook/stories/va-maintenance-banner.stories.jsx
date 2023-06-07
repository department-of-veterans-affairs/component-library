import React, { Fragment } from 'react';
import { VaMaintenanceBanner } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const maintenanceBannerDocs = getWebComponentDocs('va-maintenance-banner');

export default {
  title: 'Components/Maintenance Banner',
  id: 'components/va-maintenance-banner',
  parameters: {
    componentSubtitle: `va-maintenance-banner web component`,
    docs: {
      page: () => <StoryDocs data={maintenanceBannerDocs} />,
    },
  },
};

let expiresAt = new Date();
expiresAt.setHours(expiresAt.getHours() + 4);

const defaultArgs = {
  'banner-id': 'maintenance-banner',
  'maintenance-title': 'Site maintenance',
  'warn-title': 'Upcoming site maintenance',
  'maintenance-content': 'We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience.',
  'warn-content': 'We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools.',
  startsAt: new Date(),
  expiresAt: expiresAt,
  warnStartsAt: { control: { type: 'date' } }
};

const Template = args => (
  <Fragment>
    <VaMaintenanceBanner {...args}
      
    />
  </Fragment>
);

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
  startsAt: startsAt,
  expiresAt: expiresAt,
  warnStartsAt: new Date() 
};

Default.argTypes = propStructure(maintenanceBannerDocs);

