/* eslint-disable no-console */
import React from 'react';
import { addHours, subMinutes, format } from 'date-fns';

import MaintenanceBanner from './MaintenanceBanner';

export default {
  title: 'Components/Banners/MaintenanceBanner',
  component: MaintenanceBanner,
  argTypes: {
    startsAt: { control: { type: 'date' } },
    expiresAt: { control: { type: 'date' } },
    warnStartsAt: { control: { type: 'date' } },
  },
};

const Template = (args) => {
  const startTime = args.startsAt;
  const endTime = args.expiresAt;
  const warnStart = args.warnStartsAt;
  console.group('Times passed to Template');
  console.log('startTime:', format(startTime, 'MM/dd/yy p'));
  console.log('endTime', format(endTime, 'MM/dd/yy p'));
  console.log('warnStart', format(warnStart, 'MM/dd/yy p'));
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
    'We’ll be doing some work on VA.gov. The maintenance will last 1 hour. During that time, you won’t be able to sign in or use tools.',
  startsAt: new Date(Date.now()),
  expiresAt: addHours(Date.now(), 1),
  warnStartsAt: subMinutes(Date.now(), 30),
};

export const DuringMaintenance = Template.bind({});
DuringMaintenance.args = { ...defaultArgs };

export const BeforeMaintenance = Template.bind({});
BeforeMaintenance.args = {
  ...defaultArgs,
  startsAt: addHours(Date.now(), 1),
  expiresAt: addHours(Date.now(), 2),
  warnStartsAt: new Date(Date.now()),
};
