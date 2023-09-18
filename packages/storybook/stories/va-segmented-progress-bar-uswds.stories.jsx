import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const segmentedProgressBarDocs = getWebComponentDocs(
  'va-segmented-progress-bar',
);

export default {
  title: 'USWDS/Progress bar - segmented USWDS',
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
  counters,
  headerLevel,
  progressTerm,
  'use-div': useDiv,
  'describedby-ids': describedbyIds,
}) => (
  // Wrapper for spacing when viewing in storybook
  // Component can be used without it
  <div style={{ margin: '3em' }}>
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
      header-level={headerLevel}
      progress-term={progressTerm}
      use-div={useDiv}
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
  'counters': undefined,
  'use-div': false,
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
  labels: "Personal Information;Household Status;Supporting Documents;Signature;Review and Submit"
};

export const CenteredStepLabels = Template.bind(null);
CenteredStepLabels.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels: "Personal Information;Household Status;Supporting Documents;Signature;Review and Submit",
  centeredLabels: true
};

export const Counters = Template.bind(null);
Counters.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels: "Personal Information;Household Status;Supporting Documents;Signature;Review and Submit",
  counters: 'default'
};


export const SmallCounters = Template.bind(null);
SmallCounters.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels: "Personal Information;Household Status;Supporting Documents;Signature;Review and Submit",
  counters: 'small'
};

export const CenteredCounters = Template.bind(null);
CenteredCounters.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels: "Personal Information;Household Status;Supporting Documents;Signature;Review and Submit",
  counters: 'default',
  centeredLabels: true
};


export const CenteredSmallCounters = Template.bind(null);
CenteredSmallCounters.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels: "Personal Information;Household Status;Supporting Documents;Signature;Review and Submit",
  counters: 'small',
  centeredLabels: true
};

export const CustomHeaderLevel = Template.bind(null);
CustomHeaderLevel.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels: "Personal Information;Household Status;Supporting Documents;Signature;Review and Submit",
  counters: 'small',
  centeredLabels: true,
  headerLevel: 2
};

export const CustomProgressTerm = Template.bind(null);
CustomProgressTerm.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels: "Personal Information;Household Status;Supporting Documents;Signature;Review and Submit",
  counters: 'small',
  centeredLabels: true,
  headerLevel: 2,
  progressTerm: 'Chapter'
};
