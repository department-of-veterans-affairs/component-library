import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const bannerDocs = getWebComponentDocs('va-banner');

export default {
  title: 'Components/va-banner',
  parameters: {
    componentSubtitle: `Banner web component`,
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

const DuringTemplate = ({
  'disable-analytics': disableAnalytics,
  'show-close': showClose,
  headline,
  type,
  visible,
  'window-session': windowSession,
}) => {
  const timeFormattingOptions = {
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'US/Eastern',
  };
  const formatter = new Intl.DateTimeFormat('en-US', timeFormattingOptions);
  const now = new Date();
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(
    now,
  );
  const start = formatter.format(now.setHours(now.getHours() - 1));
  const end = formatter.format(now.setHours(now.getHours() + 2));

  return (
    <va-banner
      disable-analytics={disableAnalytics}
      show-close={showClose}
      headline={headline}
      type={type}
      visible={visible}
      window-session={windowSession}
    >
      <p>
        We’re working on VA.gov right now. If you have trouble signing in or
        using tools, check back after we’re finished. Thank you for your
        patience.
      </p>
      <p>
        <strong>Date:</strong> {date}
      </p>
      <p>
        <strong>Start/End time:</strong> {start} to {end}
      </p>
    </va-banner>
  );
};

const During24HourTemplate = ({
  'disable-analytics': disableAnalytics,
  'show-close': showClose,
  headline,
  type,
  visible,
  'window-session': windowSession,
}) => {
  const timeFormattingOptions = {
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long',
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZone: 'US/Eastern',
    timeZoneName: 'short',
  };

  const formatter = new Intl.DateTimeFormat('en-US', timeFormattingOptions);
  const now = new Date();
  const start = formatter.format(now.setHours(now.getHours() - 12));
  const end = formatter.format(now.setHours(now.getHours() + 12));

  return (
    <va-banner
      disable-analytics={disableAnalytics}
      show-close={showClose}
      headline={headline}
      type={type}
      visible={visible}
      window-session={windowSession}
    >
      <p>
        We’re working on VA.gov right now. If you have trouble signing in or
        using tools, check back after we’re finished. Thank you for your
        patience.
      </p>
      <p>
        <strong>Start:</strong> {start}
      </p>
      <p>
        <strong>End:</strong> {end}
      </p>
    </va-banner>
  );
};

const AdvanceTemplate = ({
  'disable-analytics': disableAnalytics,
  'show-close': showClose,
  headline,
  type,
  visible,
  'window-session': windowSession,
}) => {
  const timeFormattingOptions = {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'US/Eastern',
    timeZoneName: 'short',
  };
  const formatter = new Intl.DateTimeFormat('en-US', timeFormattingOptions);
  const now = new Date();
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(
    now,
  );
  const start = formatter.format(now.setHours(now.getHours() + 1));
  const end = formatter.format(now.setHours(now.getHours() + 2));
  return (
    <va-banner
      disable-analytics={disableAnalytics}
      show-close={showClose}
      headline={headline}
      type={type}
      visible={visible}
      window-session={windowSession}
    >
      <p>
        We’ll be doing some work on VA.gov. The maintenance will last 2 hours.
        During that time, you won’t be able to sign in or use tools.
      </p>
      <p>
        <strong>Date:</strong> {date}
      </p>
      <p>
        <strong>Start/End time:</strong> {start} to {end}
      </p>
    </va-banner>
  );
};

const Advance24HourTemplate = ({
  'disable-analytics': disableAnalytics,
  'show-close': showClose,
  headline,
  type,
  visible,
  'window-session': windowSession,
}) => {
  const timeFormattingOptions = {
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long',
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    timeZone: 'US/Eastern',
    timeZoneName: 'short',
  };
  const formatter = new Intl.DateTimeFormat('en-US', timeFormattingOptions);
  const now = new Date();
  const start = formatter.format(now.setHours(now.getHours() + 12));
  const end = formatter.format(now.setHours(now.getHours() + 24));

  return (
    <va-banner
      disable-analytics={disableAnalytics}
      show-close={showClose}
      headline={headline}
      type={type}
      visible={visible}
      window-session={windowSession}
    >
      <p>
        We’ll be doing some work on VA.gov. The maintenance will last 24 hours.
        During that time, you won’t be able to sign in or use tools.
      </p>
      <p>
        <strong>Start:</strong> {start}
      </p>
      <p>
        <strong>End:</strong> {end}
      </p>
    </va-banner>
  );
};

const SiteAccessibleTemplate = ({
  'disable-analytics': disableAnalytics,
  'show-close': showClose,
  headline,
  type,
  visible,
  'window-session': windowSession,
}) => {
  return (
    <va-banner
      disable-analytics={disableAnalytics}
      show-close={showClose}
      headline={headline}
      type={type}
      visible={visible}
      window-session={windowSession}
    >
      <p>
        We’re working on VA.gov right now. You should still be able to use the
        applications and tools. But if you have any trouble, please check back
        soon.
      </p>
    </va-banner>
  );
};
const defaultArgs = {
  'headline': 'Upcoming site maintenance',
  'show-close': false,
  'disable-analytics': false,
  'type': 'warning',
  'visible': true,
  'window-session': false,
  'show-close': true,
};

export const Default = AdvanceTemplate.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(bannerDocs);

export const Advance24Hours = Advance24HourTemplate.bind(null);
Advance24Hours.args = {
  ...defaultArgs,
};

export const During = DuringTemplate.bind(null);
During.args = {
  ...defaultArgs,
  headline: 'Site maintenance',
  type: 'error',
};
export const During24Hours = During24HourTemplate.bind(null);
During24Hours.args = {
  ...defaultArgs,
  headline: 'Site maintenance',
  type: 'error',
};

export const SiteStillAccessible = SiteAccessibleTemplate.bind(null);
SiteStillAccessible.args = {
  ...defaultArgs,
  headline: 'We’re working on the site',
};
