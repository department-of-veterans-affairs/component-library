/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const cardDocs = getWebComponentDocs('va-card');

export default {
  title: 'Components/Card',
  id: 'components/va-card',
  parameters: {
    componentSubtitle: 'va-card web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={cardDocs} />,
    },
  },
};

const defaultArgs = {
  'show-shadow': false,
  background: false,
};

const Template = ({
  'show-shadow': showShadow,
  background: background,
}) => (
  <va-card
    show-shadow={showShadow}
    background={background}
  >
    <p>Example card content</p>
  </va-card>
);

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(cardDocs);

export const withBackground = Template.bind(null);
withBackground.args = {
  ...defaultArgs,
  background: true,
};

export const withDropShadow = Template.bind(null);
withDropShadow.args = {
  ...defaultArgs,
  'show-shadow': true,
};
