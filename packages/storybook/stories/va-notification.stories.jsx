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
  'symbol': 'info',
  'close-btn-aria-label': 'Close notification',
  'closeable': true,
  'headline': (
    <h3 class="va-notification-headline">Notification heading</h3>
  ),
  'children': (
     <p>Notification body</p>
  )
};

const Template = ({
  visible,
  symbol,
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  headline,
  children,
}) => {
  return (
    <va-notification
      visible={visible}
      symbol={symbol}
      closeable={closeable}
      closeBtnAriaLabel={closeBtnAriaLabel}
    >
      {headline}
      {children}
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
    <h3 class="va-notification-headline">
      You have a new education debt.
    </h3>
  ),
  children: (
    <p className="vads-u-margin-y--0">
      Date here
    </p>
  ),
  symbol: 'action-required',
};

export const Update = Template.bind(null);
Update.args = {
  ...defaultArgs,
  headline: (
    <h3>
      Your claim status has been updated.
    </h3>
  ),
  children: (
    <p className="vads-u-margin-y--0">
      Date here
    </p>
  ),
  symbol: 'update',
};

export const NotDismissable = Template.bind(null);
NotDismissable.args = {
  ...defaultArgs,
  closeable: false,
};