import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const alertExpandableDocs = getWebComponentDocs('va-alert-expandable');

export default {
  title: 'Components/Alert - expandable',
  id: 'components/va-alert-expandable',
  parameters: {
    componentSubtitle: 'va-alert-expandable web component',
    docs: {
      page: () => (
        <StoryDocs storyDefault={Default} data={alertExpandableDocs} />
      ),
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
        <p>
          This is the alert content. To take action on this alert, please call{' '}
          <va-telephone contact="8775551234"></va-telephone>.
        </p>
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
        <p>
          This is the alert content. To take action on this alert, please call{' '}
          <va-telephone contact="8775551234"></va-telephone>.
        </p>
      </va-alert-expandable>
      <br />
      <va-alert-expandable
        status="error"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <p>
          This is the alert content. To take action on this alert, please call{' '}
          <va-telephone contact="8775551234"></va-telephone>.
        </p>
      </va-alert-expandable>
      <br />
      <va-alert-expandable
        status="warning"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <p>
          This is the alert content. To take action on this alert, please call{' '}
          <va-telephone contact="8775551234"></va-telephone>.
        </p>
      </va-alert-expandable>
      <br />
      <va-alert-expandable
        status="success"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <p>
          This is the alert content. To take action on this alert, please call{' '}
          <va-telephone contact="8775551234"></va-telephone>.
        </p>
      </va-alert-expandable>
      <br />
      <va-alert-expandable
        status="continue"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <p>
          This is the alert content. To take action on this alert, please call{' '}
          <va-telephone contact="8775551234"></va-telephone>.
        </p>
      </va-alert-expandable>
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(alertExpandableDocs);

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  status: 'error',
};

export const Warning = Template.bind(null);
Warning.args = {
  ...defaultArgs,
  status: 'warning',
};

export const Success = Template.bind(null);
Success.args = {
  ...defaultArgs,
  status: 'success',
};

export const Continue = Template.bind(null);
Continue.args = {
  ...defaultArgs,
  status: 'continue',
};

export const NoIcon = IconlessTemplate.bind(null);
NoIcon.args = {
  ...defaultArgs,
  iconless: true,
};
