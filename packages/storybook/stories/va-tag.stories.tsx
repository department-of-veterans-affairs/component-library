import { Fragment } from 'react';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  propDefaults,
  componentStructure,
  removeFragmentsFromCodeSource,
  internalTestingAlert,
} from './wc-helpers';
import { VaTag } from '@department-of-veterans-affairs/web-components/react-bindings';

export default {
  title: 'Components/Tag',
  component: 'va-tag',
  argTypes: {
    // Define your argTypes here
    status: {
      table: { disable: true},
    },
    text: {
      control: {
        type: 'text',
        placeholder: 'New'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="vads-u-margin--2">
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => {
  return (
    <va-tag status={args.status} text={args.text}></va-tag>
  );
};

export const Default = Template.bind({});
Default.args = {
  status: 'default',
  text: 'Default Tag',
};

export const Informational = Template.bind({});
Informational.args = {
  status: 'informational',
  text: 'Informational Tag',
};

export const Warning = Template.bind({});
Warning.args = {
  status: 'warning',
  text: 'Warning Tag',
};

export const Success = Template.bind({});
Success.args = {
  status: 'success',
  text: 'Success Tag',
};

export const Error = Template.bind({});
Error.args = {
  status: 'error',
  text: 'Error Tag',
};

export const USWDSTag = {
  render: () => <span className="usa-label">New</span>,
};

