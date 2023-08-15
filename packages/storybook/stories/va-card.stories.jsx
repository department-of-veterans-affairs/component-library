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

const defaultArgs = {
  'show-shadow': false,
};

const Template = ({
  'show-shadow': showShadow,
}) => (
  <va-card
    show-shadow={showShadow}
  >
    <p>Example card content</p>
  </va-card>
);

const CardExtendedTemplate = ({
  'show-shadow': showShadow,
}) => (
  <va-card-extended
    show-shadow={showShadow}
  >
    <p>Example card content</p>
  </va-card-extended>
);

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(cardDocs);

export const withDropShadow = Template.bind(null);
withDropShadow.args = {
  ...defaultArgs,
  'show-shadow': true,
};

export const CardExtended = CardExtendedTemplate.bind(null);
CardExtended.args = {
  ...defaultArgs,
  'show-shadow': true,
};