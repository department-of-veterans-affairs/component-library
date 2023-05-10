/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const notificationDocs = getWebComponentDocs('va-notification');

export default {
  title: 'Components/Notification',
  id: 'components/va-notification',
  argTypes: { 
    headline: {
      table: {
        disable: true,
      },
    },     
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
  'href': 'https://www.va.gov/',
  'text': 'Manage your notifications',
  'close-btn-aria-label': 'Close notification',
  'closeable': true,
  'headline': (
    <h3 part="headline">Notification heading</h3>
  ),
  'children': (
     <p>Notification body</p>
  ),
};

const Template = ({
  visible,
  symbol,
  href,
  text,
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  headline,
  children,
}) => {
  return (
    <va-notification
      visible={visible}
      symbol={symbol}
      href={href}
      text={text}
      closeable={closeable}
      closeBtnAriaLabel={closeBtnAriaLabel}
    >
      {headline}
      {children}
      <va-link href={href} active text={text}/>
    </va-notification>
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
  headline: (
    <h3 part="headline">
      You have a new education debt.
    </h3>
  ),
  children: (
    <p class="vads-u-margin-top--0">
      <time datetime="2023-05-1 13:13:00">Wednesday, May 11 at 1:13pm</time>
    </p>
  ),
  symbol: 'action-required',
  text: 'Manage your VA debt'
};

export const Update = Template.bind(null);
Update.args = {
  ...defaultArgs,
  headline: (
    <h3 part="headline">
      Your claim status has been updated.
    </h3>
  ),
  children: (
    <p class="vads-u-margin-top--0">
      <time datetime="2023-05-09 16:00:00">Monday, May 9 at 4:00pm</time>
    </p>
  ),
  symbol: 'update',
  text: 'Manage your claims and appeals'
};

export const NotDismissable = Template.bind(null);
NotDismissable.args = {
  ...defaultArgs,
  closeable: false,
};