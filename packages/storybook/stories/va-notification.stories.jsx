/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const notificationDocs = getWebComponentDocs('va-notification');

export default {
  title: 'Components/Notification',
  id: 'components/va-notification',
  argTypes: {   
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    componentSubtitle: `va-notification web component`,
    docs: {
      page: () => <StoryDocs data={notificationDocs} />,
    },
  },
};

const defaultArgs = {
  'visible': true,
  'symbol': 'none',
  'close-btn-aria-label': 'Close notification',
  'closeable': true,
  'has-border': true,
  'has-close-text': false,
  'headline': 'Notification heading',
  'headline-level': '3',
  'date-time': 'Wednesday, May 11 at 1:13pm',
  'children': (
     <p>Notification body</p>
  ),
  'href': 'https://www.va.gov/',
  'text': 'Manage your notifications',
};

const Template = ({
  visible,
  symbol,
  headline,
  'headline-level': headlineLevel,
  href,
  text,
  'date-time': dateTime,
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  'has-border': hasBorder,
  'has-close-text': hasCloseText,
  children,
}) => {
  return (
    <va-notification
      visible={visible}
      symbol={symbol}
      headline={headline}
      headline-level={headlineLevel}
      date-time={dateTime}
      href={href}
      text={text}
      closeable={closeable}
      has-border={hasBorder}
      has-close-text={hasCloseText}
      closeBtnAriaLabel={closeBtnAriaLabel}
    >
      {children}
    </va-notification>
  )
};

const MultipleTemplate = ({
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  'has-border': hasBorder,
  'date-time': dateTime,
}) => {
  return (
    <>
      <va-notification
        visible="true"
        symbol="action-required"
        headline="You have a new education debt."
        href="https://www.va.gov/"
        date-time={dateTime}
        text="Manage your VA debt"
        closeable={closeable}
        has-border={hasBorder}
        closeBtnAriaLabel={closeBtnAriaLabel}
        class="vads-u-margin-bottom--1p5"
      >
        <time slot="date" dateTime={dateTime}>{dateTime}</time>
      </va-notification>
      <va-notification
        visible="true"
        symbol="update"
        headline="Your claim status has been updated."
        href="https://www.va.gov/"
        date-time={dateTime}
        text="Manage your claims and appeals"
        closeable={closeable}
        has-border={hasBorder}
        closeBtnAriaLabel={closeBtnAriaLabel}
      >
        <time slot="date" dateTime="2023-05-1 13:13:00">Wednesday, May 11 at 1:13pm</time>
      </va-notification>
    </>
  )
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(notificationDocs);

export const ActionRequired = Template.bind(null);
ActionRequired.args = {
  ...defaultArgs,
  // children: (
  //   <time slot="date" dateTime="2023-05-1 13:13:00">Wednesday, May 11 at 1:13pm</time>
  // ),
  symbol: 'action-required',
  headline: 'You have a new education debt.',
  text: 'Manage your VA debt',
  dateTime: 'Wednesday, May 11 at 1:13pm',
};

export const Update = Template.bind(null);
Update.args = {
  ...defaultArgs,
  children: (
    <time slot="date" dateTime="2023-05-1 13:13:00">Wednesday, May 11 at 1:13pm</time>
  ),
  symbol: 'update',
  headline: 'Your claim status has been updated.',
  text: 'Manage your claims and appeals'
};

export const WithCloseText = Template.bind(null);
WithCloseText.args = {
  ...defaultArgs,
  children: (
    <time slot="date" dateTime="2023-05-1 13:13:00">Wednesday, May 11 at 1:13pm</time>
  ),
  symbol: 'action-required',
  headline: 'You have a new education debt.',
  text: 'Manage your VA debt',
  'has-close-text': true,
};

export const HeaderLevelChange = Template.bind(null);
HeaderLevelChange.args = {
  ...defaultArgs,
  children: (
    <>
      <p>Font size remains the same regardless of header level.</p>
      <p>If there is a non-numberic string passed in, header will default to an h3.</p>
    </>
  ),
  headline: 'The heading level of this notification is now an h5.',
  'headline-level': '5',
  text: '',
};

export const NotDismissable = Template.bind(null);
NotDismissable.args = {
  ...defaultArgs,
  closeable: false,
};

export const NoBorder = Template.bind(null);
NoBorder.args = {
  ...defaultArgs,
  children: (
    <time slot="date" dateTime="2023-05-1 13:13:00">Wednesday, May 11 at 1:13pm</time>
  ),
  symbol: 'action-required',
  headline: 'You have a new education debt.',
  text: 'Manage your VA debt',
  closeable: false,
  'has-border': false,
};

export const MultipleWithBorder = MultipleTemplate.bind(null);
MultipleWithBorder.args = {
  ...defaultArgs,
  'has-border': true,
};

export const MultipleWithNoBorder = MultipleTemplate.bind(null);
MultipleWithNoBorder.args = {
  ...defaultArgs,
  'has-border': false,
  closeable: false,
};

export const NotVisible = Template.bind(null);
NotVisible.args = {
  ...defaultArgs,
  visible: false,
};