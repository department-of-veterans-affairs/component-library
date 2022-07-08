import React from 'react';
import SystemDownView from '../../react-components/src/components/SystemDownView/SystemDownView';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/System down view',
  component: SystemDownView,
  parameters: {
    componentSubtitle: 'System down view React component',
    docs: {
      page: () => <StoryDocs componentName="System down view" />,
    },
  },
};

const Template = args => <SystemDownView {...args} />;

const defaultArgs = {
  messageLine1: 'The system is down.',
  messageLine2: 'The explanation goes here.',
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
