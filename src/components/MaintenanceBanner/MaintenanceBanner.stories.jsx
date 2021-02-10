/* eslint-disable no-console */
import React from 'react';
import moment from 'moment';

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

const Template = args => {
  const startTime = moment.utc(moment(args.startsAt));
  const endTime = moment.utc(moment(args.expiresAt));
  const warnStart = moment.utc(moment(args.warnStartsAt));
  console.group('Times passed to Template');
  console.log('startTime:', startTime.format('MM/DD/YY HH:mm'));
  console.log('endTime', endTime.format('MM/DD/YY HH:mm'));
  console.log('warnStart', warnStart.format('MM/DD/YY HH:mm'));
  console.groupEnd();
  return (
    <MaintenanceBanner
      {...args}
      startsAt={startTime}
      expiresAt={endTime}
      warnStartsAt={warnStart}
    />
  );
};

const defaultArgs = {
  id: 'maintenence-banner-id',
  title: 'Site maintenance',
  warnTitle: 'Upcoming site maintenance',
  content:
    'We’re working on VA.gov right now. If you have trouble signing in or using tools, check back after we’re finished. Thank you for your patience.',
  warnContent:
    'We’ll be doing some work on VA.gov. The maintenance will last 1 hour. During that time, you won’t be able to sign in or use tools.',
  startsAt: moment().valueOf(),
  expiresAt: moment().add(1, 'hour').valueOf(),
  warnStartsAt: moment().subtract(30, 'minutes').valueOf(),
};

export const DuringMaintenance = Template.bind({});
DuringMaintenance.args = { ...defaultArgs };

export const BeforeMaintenance = Template.bind({});
BeforeMaintenance.args = {
  ...defaultArgs,
  startsAt: moment().add(1, 'hour').valueOf(),
  expiresAt: moment().add(2, 'hours').valueOf(),
  warnStartsAt: moment().valueOf(),
};
