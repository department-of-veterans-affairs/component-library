/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const cardDocs = getWebComponentDocs('va-card');

export default {
  title: 'Components/Card',
  id: 'components/va-card',
  parameters: {
    componentSubtitle: `va-card web component`,
    docs: {
      page: () => <StoryDocs data={cardDocs} />,
    },
  },
};

const defaultArgs = {};

const Template = ({}) => (
  <>
  <p>Surrounding content</p>
  <va-card>
    <div slot="content">
      <h2 id="va-card_heading">Card heading</h2>
      <p>Card body</p>
    </div>
  </va-card>
  <p>Surrounding content</p>
  </>
);

export const Default = Template.bind(null);
Default.argTypes = propStructure(cardDocs);
