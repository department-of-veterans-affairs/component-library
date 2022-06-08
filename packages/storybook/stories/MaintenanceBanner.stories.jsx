/* eslint-disable no-console */
import React from 'react';
import { formatDate } from '../../react-components/src/helpers/format-date';
import MaintenanceBanner from '../../react-components/src/components/MaintenanceBanner/MaintenanceBanner';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Banners/MaintenanceBanner',
  component: MaintenanceBanner,
  argTypes: {
    startsAt: { control: { type: 'date' } },
    expiresAt: { control: { type: 'date' } },
    warnStartsAt: { control: { type: 'date' } },
  },
  parameters: {
    componentSubtitle: 'Maintenance banner React component',
    docs: {
      page: () => <StoryDocs componentName="MaintenanceBanner" />,
    },
  },
};

const Template = args => {
  const startTime = args.startsAt;
  const endTime = args.expiresAt;
  const warnStart = args.warnStartsAt;
  console.group('Times passed to Template');
  console.log('startTime:', formatDate(startTime, 'timeShort'));
  console.log('endTime', formatDate(endTime, 'timeShort'));
  console.log('warnStart', formatDate(warnStart, 'timeShort'));
  console.groupEnd();
  return <MaintenanceBanner {...args} />;
};

const defaultArgs = {
  id: 'maintenence-banner-id',
  title: 'Site maintenance',
  warnTitle: 'Upcoming site maintenance',
  content:
    'We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience.',
  warnContent:
    'We’ll be doing some work on VA.gov. The maintenance will last X hours. During that time, you won’t be able to sign in or use tools.',
  startsAt: new Date(),
  expiresAt: new Date(new Date().setHours(new Date().getHours() + 2)),
  warnStartsAt: new Date(new Date().setHours(new Date().getHours() - 1)),
};

export const DuringMaintenance = Template.bind(null);
DuringMaintenance.args = { ...defaultArgs };

export const BeforeMaintenance = Template.bind(null);
BeforeMaintenance.args = {
  ...defaultArgs,
  startsAt: new Date(new Date().setHours(new Date().getHours() + 1)),
  expiresAt: new Date(new Date().setHours(new Date().getHours() + 2)),
  warnStartsAt: new Date(),
};
