import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';
import { generateEventsDescription } from './events';

const additionalInfoDocs = getWebComponentDocs('va-additional-info');

export default {
  title: 'Components/va-additional-info',
  parameters: {
    componentSubtitle: `Additional Info web component`,
    docs: {
      description: {
        component:
          `<a className="vads-c-action-link--blue" href="https://design.va.gov/components/additional-info">View guidance for the Additional Info component in the Design System</a>` +
          '\n' +
          generateEventsDescription(additionalInfoDocs),
      },
    },
    actions: {
      handles: ['component-library-analytics'],
    },
  },
};

const defaultArgs = {
  'trigger': 'Additional Information',
  'disable-border': false,
  'disable-analytics': false,
};

const Template = ({
  trigger,
  'disable-border': disableBorder,
  'disable-analytics': disableAnalytics,
}) => {
  return (
    <>
      <p>Surrounding content.</p>
      <va-additional-info
        trigger={trigger}
        disable-analytics={disableAnalytics}
        disable-border={disableBorder}
      >
        <div>Here are some popular pets to consider</div>
        <ul>
          <li>Dogs</li>
          <li>Cats</li>
          <li>Fish</li>
          <li>Birds</li>
        </ul>
      </va-additional-info>
      <p>Surrounding content.</p>
    </>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(additionalInfoDocs);

export const NoBorder = Template.bind({});
NoBorder.args = {
  ...defaultArgs,
  'disable-border': true,
};
