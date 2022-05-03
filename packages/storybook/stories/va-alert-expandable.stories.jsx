
import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';
import { generateEventsDescription } from './events';

const alertExpandableDocs = getWebComponentDocs('va-alert-expandable');

export default {
  title: 'Components/va-alert-expandable',
  parameters: {
    componentSubtitle: `Alert Expandable web component`,
    docs: {
      description: {
        component:
          `<a className="vads-c-action-link--blue" href="https://design.va.gov/components/alert-expandable">View guidance for the Alert Expandable component in the Design System</a>` +
          '\n' +
          generateEventsDescription(alertExpandableDocs),
      },
    },
    actions: {
      handles: ['component-library-analytics'],
    },
  },
};

const defaultArgs = {
  'trigger': 'Alert Headline',
  'status': 'info',
  'disable-analytics': false,
  'show-icon': true,
  'visible': true
};

const Template = ({
  trigger,
  status,
  visible,
  'disable-analytics': disableAnalytics,
  'show-icon': showIcon,
}) => {
  return (
    <>
      <h2>Content title</h2>
      <va-alert-expandable
        trigger={trigger}
        status={status}
        show-icon={showIcon}
        disable-analytics={disableAnalytics}
        visible={visible}
      >
        <div>
          This is the alert content. To take action on this alert, please call <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <p>Surrounding content.</p>
    </>
  );
};

const NoIconTemplate = ({
  trigger,
  'show-icon': showIcon,
}) => {
  return (
    <>
      <va-alert-expandable
        trigger={trigger}
        status="info"
        show-icon={showIcon}
        disable-analytics="false"
        visible="true"
      >
        <div>
          This is the alert content. To take action on this alert, please call <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <va-alert-expandable
        trigger={trigger}
        status="error"
        show-icon={showIcon}
        disable-analytics="false"
        visible="true"
      >
        <div>
          This is the alert content. To take action on this alert, please call <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <va-alert-expandable
        trigger={trigger}
        status="warning"
        show-icon={showIcon}
        disable-analytics="false"
        visible="true"
      >
        <div>
          This is the alert content. To take action on this alert, please call <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <va-alert-expandable
        trigger={trigger}
        status="success"
        show-icon={showIcon}
        disable-analytics="false"
        visible="true"
      >
        <div>
          This is the alert content. To take action on this alert, please call <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <va-alert-expandable
        trigger={trigger}
        status="continue"
        show-icon={showIcon}
        disable-analytics="false"
        visible="true"
      >
        <div>
          This is the alert content. To take action on this alert, please call <a href="tel:8775551234">877-555-1234.</a>
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
  status: 'error' 
};

export const Warning = Template.bind({});
Warning.args = { 
  ...defaultArgs, 
  status: 'warning' 
};

export const Success = Template.bind({});
Success.args = { 
  ...defaultArgs, 
  status: 'success' 
};

export const Continue = Template.bind({});
Continue.args = { 
  ...defaultArgs, 
  status: 'continue' 
};

export const noIcon = NoIconTemplate.bind({});
noIcon.args = {
  ...defaultArgs,
  'show-icon': false,
};

export const NotVisible = Template.bind({});
NotVisible.args = {
  ...defaultArgs,
  visible: false,
};
