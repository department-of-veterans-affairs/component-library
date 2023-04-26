import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const segmentedProgressBarDocs = getWebComponentDocs(
  'va-segmented-progress-bar',
);

export default {
  title: 'USWDS/Progress bar - segmented',
  id: 'uswds/va-segmented-progress-bar',
  parameters: {
    componentSubtitle: `va-segmented-progress-bar web component`,
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
  'heading-text': headingText,
  labels,
  centeredLabels,
  counters
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
      heading-text={headingText}
      uswds
      labels={labels}
      centered-labels={centeredLabels}
      counters={counters}
    ></va-segmented-progress-bar>
  </div>
);

const defaultArgs = {
  'enable-analytics': false,
  'current': 2,
  'total': 5,
  'label': undefined,
  'heading-text': 'VA Benefits',
  'labels': undefined,
  'centered-labels': undefined,
  'counters': undefined
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

Default.argTypes = propStructure(segmentedProgressBarDocs);

export const StepLabels = Template.bind(null);
StepLabels.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels: ['Personal Information', 'Household Status', 'Supporting Documents', 'Signature', 'Review and Submit']
};

export const CenteredStepLabels = Template.bind(null);
CenteredStepLabels.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels: ['Personal Information', 'Household Status', 'Supporting Documents', 'Signature', 'Review and Submit'],
  centeredLabels: true
};

export const Counters = Template.bind(null);
Counters.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels: ['Personal Information', 'Household Status', 'Supporting Documents', 'Signature', 'Review and Submit'],
  counters: 'default'
};


export const SmallCounters = Template.bind(null);
SmallCounters.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels: ['Personal Information', 'Household Status', 'Supporting Documents', 'Signature', 'Review and Submit'],
  counters: 'small'
};

export const CenteredCounters = Template.bind(null);
CenteredCounters.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels: ['Personal Information', 'Household Status', 'Supporting Documents', 'Signature', 'Review and Submit'],
  counters: 'default',
  centeredLabels: true
};


export const CenteredSmallCounters = Template.bind(null);
CenteredSmallCounters.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels: ['Personal Information', 'Household Status', 'Supporting Documents', 'Signature', 'Review and Submit'],
  counters: 'small',
  centeredLabels: true
};