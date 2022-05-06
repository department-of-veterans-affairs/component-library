import React from 'react';
import { generateEventsDescription } from './events';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const segmentedProgressBarDocs = getWebComponentDocs(
  'va-segmented-progress-bar',
);

export default {
  title: 'Components/va-segmented-progress-bar',
  parameters: {
    componentSubtitle: `Segmented progress bar web component`,
    docs: {
      description: {
        component:
          `<a className="vads-c-action-link--blue" href="https://design.va.gov/components/progress-bar">View guidance for the Segmented progress bar component in the Design System</a>` +
          `\n` +
          generateEventsDescription(segmentedProgressBarDocs),
      },
    },
  },
};

const Template = ({
  'enable-analytics': enableAnalytics,
  current,
  total,
  label,
}) => (
  // Wrapper for spacing when viewing in storybook
  // Component can be used without it
  <div style={{ margin: '3em' }}>
    <div
      class="schemaform-title"
      style={{ alignItems: 'baseline', display: 'flex', marginBottom: '3rem' }}
    >
      <h1
        data-testid="form-title"
        style={{ marginBottom: 0, paddingRight: '10px' }}
      >
        Apply for health care
      </h1>
      <div
        class="schemaform-subtitle"
        data-testid="form-subtitle"
        style={{ fontSize: '2rem' }}
      >
        Form 10-10EZ
      </div>
    </div>
    <va-segmented-progress-bar
      enable-analytics={enableAnalytics}
      current={current}
      total={total}
      label={label}
    ></va-segmented-progress-bar>
    <div class="schemaform-chapter-progress" style={{ paddingLeft: '2rem' }}>
      <div class="nav-header nav-header-schemaform">
        <h2 id="nav-form-header" class="vads-u-font-size--h4" tabindex="-1">
          Step 2 of 6: VA Benefits
        </h2>
      </div>
    </div>
  </div>
);

const defaultArgs = {
  'enable-analytics': false,
  'current': 2,
  'total': 6,
  'label': undefined,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

Default.argTypes = propStructure(segmentedProgressBarDocs);

export const AriaLabelOverride = Template.bind({});
AriaLabelOverride.args = {
  ...defaultArgs,
  label: 'Label is here',
};
