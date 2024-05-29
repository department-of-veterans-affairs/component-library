import React from 'react';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Divider',
  id: 'components/Divider',
  parameters: {
    componentSubtitle: 'Divider component class',
    docs: {
      page: () => <StoryDocs storyDefault={Default} componentName="Divider" />,
    },
  },
};


const Template = ({
}) => (
  <div className="va-h-ruled--stars"></div>
);

export const Default = Template.bind(null);
