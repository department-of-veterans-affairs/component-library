/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const cardDocs = getWebComponentDocs('va-card');

export default {
  title: 'Components/Card',
  id: 'components/va-card',
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
    componentSubtitle: `va-card web component`,
    docs: {
      page: () => <StoryDocs data={cardDocs} />,
    },
  },
};

const defaultArgs = {
  'visible': true,
  'close-btn-aria-label': 'Close notification',
  'closeable': false,
  'headline': (
    <h2 slot="headline">Card heading</h2>
  ),
  'children': (
    <div slot="content">
    <p>Card body</p>
  </div>
  )
};

const Template = ({
  visible,
  'close-btn-aria-label': closeBtnAriaLabel,
  closeable,
  headline,
  children,
}) => (
  <va-card
    visible={visible}
    close-btn-aria-label={closeBtnAriaLabel}
    closeable={closeable}
  >
    {headline}
    {children}
  </va-card>
);

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(cardDocs);

export const Dismissable = Template.bind(null);
Dismissable.args = {
  ...defaultArgs,
  closeable: true,
};
