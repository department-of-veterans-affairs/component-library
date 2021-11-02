import React from 'react';
import { LoadingIndicator } from '@department-of-veterans-affairs/component-library';

export default {
  title: 'Components/LoadingIndicator (deprecated)',
  component: LoadingIndicator,
};

const Template = args => <LoadingIndicator {...args} />;

const defaultArgs = {};

export const Default = Template.bind({});
Default.args = { ...defaultArgs, message: 'Loading your application...' };
