import React from 'react';
import Breadcrumbs from '../../react-components/src/components/Breadcrumbs/Breadcrumbs';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    componentSubtitle: 'Breadcrumbs React component',
    docs: {
      page: () => (
        <StoryDocs
          data={{
            componentName: 'Breadcrumbs',
          }}
        />
      ),
    },
  },
};

const Template = args => (
  <Breadcrumbs {...args}>
    <a href="#" key="1">
      Home
    </a>
    <a href="#" key="2">
      Level One
    </a>
    <a href="#" key="3">
      Level Two
    </a>
  </Breadcrumbs>
);

const defaultArgs = {};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

export const MobileFirst = Template.bind({});
MobileFirst.args = { ...defaultArgs, mobileFirstProp: true };
