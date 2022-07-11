import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const segmentedProgressBarDocs = getWebComponentDocs(
  'va-segmented-progress-bar',
);

export default {
  title: 'Components/Progress bar - segmented',
  parameters: {
    componentSubtitle: `va-segmented-progress-bar`,
    docs: {
      page: () => <StoryDocs data={segmentedProgressBarDocs} />,
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
      className="schemaform-title"
      style={{ alignItems: 'baseline', display: 'flex', marginBottom: '3rem' }}
    >
      <h1
        data-testid="form-title"
        style={{ marginBottom: 0, paddingRight: '10px' }}
      >
        Apply for health care
      </h1>
      <div
        className="schemaform-subtitle"
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
    <div
      className="schemaform-chapter-progress"
      style={{ paddingLeft: '2rem' }}
    >
      <div className="nav-header nav-header-schemaform">
        <h2 id="nav-form-header" className="vads-u-font-size--h4" tabIndex="-1">
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

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

Default.argTypes = propStructure(segmentedProgressBarDocs);

export const AriaLabelOverride = Template.bind(null);
AriaLabelOverride.args = {
  ...defaultArgs,
  label: 'Label is here',
};
