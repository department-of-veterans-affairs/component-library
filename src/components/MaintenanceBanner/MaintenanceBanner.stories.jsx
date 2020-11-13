/* eslint-disable no-console */
import React from 'react';
import moment from 'moment';

import MaintenanceBanner from './MaintenanceBanner';

export default {
  title: 'Library/Banners/MaintenanceBanner',
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
  title: 'Current maintenance notice',
  warnTitle: 'Future maintenance notice',
  content: 'The site is currently under maintenance.',
  warnContent: 'The site will be undergoing maintenance shortly.',
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
