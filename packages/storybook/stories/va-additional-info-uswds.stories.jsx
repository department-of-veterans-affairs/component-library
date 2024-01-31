import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const additionalInfoDocs = getWebComponentDocs('va-additional-info');

export default {
  title: 'USWDS/Additional info USWDS',
  id: 'uswds/va-additional-info',
  parameters: {
    componentSubtitle: `va-additional-info web component`,
    docs: {
      page: () => <StoryDocs data={additionalInfoDocs} />,
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

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(additionalInfoDocs);

export const NoBorder = Template.bind(null);
NoBorder.args = {
  ...defaultArgs,
  'disable-border': true,
};
