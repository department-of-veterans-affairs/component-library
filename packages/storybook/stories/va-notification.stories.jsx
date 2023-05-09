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
  'close-btn-aria-label': 'Close notification',
  'closeable': false,
  'headline': (
    <h2>Notification heading</h2>
  ),
  'children': (
     <p>Notification body</p>
  )
};

const Template = ({
  visible,
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  headline,
  children,
}) => {
  return (
    <va-notification
      visible={visible}
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

export const Dismissable = Template.bind(null);
Dismissable.args = {
  ...defaultArgs,
  closeable: true,
};
