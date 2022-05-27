import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
const alertExpandableDocs = getWebComponentDocs('va-alert-expandable');

export default {
  title: 'Components/va-alert-expandable',
  parameters: {
    componentSubtitle: `Alert expandable web component`,
    docs: {
      page: () => <StoryDocs data={alertExpandableDocs} />,
    },
    actions: {
      handles: ['component-library-analytics'],
    },
  },
};

const defaultArgs = {
  'status': 'info',
  'trigger': 'Alert Headline',
  'iconless': false,
  'disable-analytics': false,
};

const Template = ({
  status,
  trigger,
  iconless,
  'disable-analytics': disableAnalytics,
}) => {
  return (
    <>
      <h2>Content title</h2>
      <va-alert-expandable
        status={status}
        trigger={trigger}
        iconless={iconless}
        disable-analytics={disableAnalytics}
      >
        <div>
          This is the alert content. To take action on this alert, please call{' '}
          <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <p>Surrounding content.</p>
    </>
  );
};

const IconlessTemplate = ({ trigger, iconless }) => {
  return (
    <>
      <va-alert-expandable
        status="info"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <div>
          This is the alert content. To take action on this alert, please call{' '}
          <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <va-alert-expandable
        status="error"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <div>
          This is the alert content. To take action on this alert, please call{' '}
          <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <va-alert-expandable
        status="warning"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <div>
          This is the alert content. To take action on this alert, please call{' '}
          <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <va-alert-expandable
        status="success"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <div>
          This is the alert content. To take action on this alert, please call{' '}
          <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <va-alert-expandable
        status="continue"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <div>
          This is the alert content. To take action on this alert, please call{' '}
          <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
    </>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(alertExpandableDocs);

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  status: 'error',
};

export const Warning = Template.bind({});
Warning.args = {
  ...defaultArgs,
  status: 'warning',
};

export const Success = Template.bind({});
Success.args = {
  ...defaultArgs,
  status: 'success',
};

export const Continue = Template.bind({});
Continue.args = {
  ...defaultArgs,
  status: 'continue',
};

export const NoIcon = IconlessTemplate.bind({});
NoIcon.args = {
  ...defaultArgs,
  iconless: true,
};
