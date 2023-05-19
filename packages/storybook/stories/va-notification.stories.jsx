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
  'close-btn-aria-label': 'Close notification',
  'closeable': true,
  'has-border': true,
  'has-close-text': false,
  'headline': (
    <h3 part="headline">Notification heading</h3>
  ),
  'children': (
     <p>Notification body</p>
  ),
  'href': 'https://www.va.gov/',
  'text': 'Manage your notifications',
};

const Template = ({
  visible,
  symbol,
  href,
  text,
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  'has-border': hasBorder,
  'has-close-text': hasCloseText,
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
      has-border={hasBorder}
      has-close-text={hasCloseText}
      closeBtnAriaLabel={closeBtnAriaLabel}
    >
      {headline}
      {children}
    </va-notification>
  )
};

const MultipleTemplate = ({
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  'has-border': hasBorder,
}) => {
  return (
    <>
      <va-notification
        visible="true"
        symbol="action-required"
        href="https://www.va.gov/"
        text="Manage your VA debt"
        closeable={closeable}
        has-border={hasBorder}
        closeBtnAriaLabel={closeBtnAriaLabel}
        class="vads-u-margin-bottom--1p5"
      >
        <h3 part="headline">
          You have a new education debt.
        </h3>
        <p className="vads-u-margin-top--0">
          <time dateTime="2023-05-1 13:13:00">Wednesday, May 11 at 1:13pm</time>
        </p>
      </va-notification>
      <va-notification
        visible="true"
        symbol="update"
        href="https://www.va.gov/"
        text="Manage your claims and appeals"
        closeable={closeable}
        has-border={hasBorder}
        closeBtnAriaLabel={closeBtnAriaLabel}
      >
        <h3 part="headline">
          Your claim status has been updated.
        </h3>
        <p className="vads-u-margin-top--0">
          <time dateTime="2023-05-09 16:00:00">Monday, May 9 at 4:00pm</time>
        </p>
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
  headline: (
    <h3 part="headline">
      You have a new education debt.
    </h3>
  ),
  children: (
    <p className="vads-u-margin-top--0">
      <time dateTime="2023-05-1 13:13:00">Wednesday, May 11 at 1:13pm</time>
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
    <p className="vads-u-margin-top--0">
      <time dateTime="2023-05-09 16:00:00">Monday, May 9 at 4:00pm</time>
    </p>
  ),
  symbol: 'update',
  text: 'Manage your claims and appeals'
};

export const WithCloseText = Template.bind(null);
WithCloseText.args = {
  ...defaultArgs,
  headline: (
    <h3 part="headline">
      You have a new education debt.
    </h3>
  ),
  children: (
    <p className="vads-u-margin-top--0">
      <time dateTime="2023-05-1 13:13:00">Wednesday, May 11 at 1:13pm</time>
    </p>
  ),
  symbol: 'action-required',
  text: 'Manage your VA debt',
  'has-close-text': true,
};

export const NotDismissable = Template.bind(null);
NotDismissable.args = {
  ...defaultArgs,
  closeable: false,
};

export const NoBorder = Template.bind(null);
NoBorder.args = {
  ...defaultArgs,
  headline: (
    <h3 part="headline">
      You have a new education debt.
    </h3>
  ),
  children: (
    <p className="vads-u-margin-top--0">
      <time dateTime="2023-05-1 13:13:00">Wednesday, May 11 at 1:13pm</time>
    </p>
  ),
  symbol: 'action-required',
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