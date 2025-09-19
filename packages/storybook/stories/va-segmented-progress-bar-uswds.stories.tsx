import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { applyFocus } from './wc-helpers';

const segmentedProgressBarDocs = getWebComponentDocs(
  'va-segmented-progress-bar',
);

export default {
  title: 'Components/Progress bar - segmented USWDS',
  id: 'uswds/va-segmented-progress-bar',
  decorators: [
    (Story) => (
      <div className="vads-u-margin--3">
        <Story />
      </div>
    ),
  ],
  parameters: {
    componentSubtitle: 'va-segmented-progress-bar web component',
    docs: {
      page: () => (
        <StoryDocs storyDefault={Default} data={segmentedProgressBarDocs} />
      ),
    },
  },
  argTypes: {
    ...propStructure(segmentedProgressBarDocs),
    showToggleFocusButton: {
      name: 'Show toggle focus button',
      control: { type: 'boolean' },
      description: 'Toggles the visibility of the focus button. Used to test the screen reader announcement.',
      table: {category: 'Storybook-only'}
    }
  }
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
  showToggleFocusButton,
}) => {

    // Moves focus to the component wrapper to test the screen reader announcement.
    const handleClick = () => {
      const customElement = document.getElementById('focus-demo');
      applyFocus(customElement);
    };

    return (
      <>
        <va-segmented-progress-bar
          enable-analytics={enableAnalytics}
          current={current}
          total={total}
          label={label}
          heading-text={headingText}
          labels={labels}
          centered-labels={centeredLabels}
          counters={counters}
          header-level={headerLevel}
          progress-term={progressTerm}
          use-div={useDiv}
          id={showToggleFocusButton ? 'focus-demo' : undefined}
        ></va-segmented-progress-bar>
        {showToggleFocusButton && (
          <va-button
            text="Move focus to component wrapper"
            onClick={handleClick}
          />
        )}
      </>
    );
};

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
  'showToggleFocusButton': false,
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

export const StepLabels = Template.bind(null);
StepLabels.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels:
    'Personal Information;Household Status;Supporting Documents;Signature;Review and Submit',
};

export const CenteredStepLabels = Template.bind(null);
CenteredStepLabels.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels:
    'Personal Information;Household Status;Supporting Documents;Signature;Review and Submit',
  centeredLabels: true,
};

export const Counters = Template.bind(null);
Counters.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels:
    'Personal Information;Household Status;Supporting Documents;Signature;Review and Submit',
  counters: 'default',
};

export const SmallCounters = Template.bind(null);
SmallCounters.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels:
    'Personal Information;Household Status;Supporting Documents;Signature;Review and Submit',
  counters: 'small',
};

export const CenteredCounters = Template.bind(null);
CenteredCounters.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels:
    'Personal Information;Household Status;Supporting Documents;Signature;Review and Submit',
  counters: 'default',
  centeredLabels: true,
};

export const CenteredSmallCounters = Template.bind(null);
CenteredSmallCounters.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels:
    'Personal Information;Household Status;Supporting Documents;Signature;Review and Submit',
  counters: 'small',
  centeredLabels: true,
};

export const CustomHeaderLevel = Template.bind(null);
CustomHeaderLevel.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels:
    'Personal Information;Household Status;Supporting Documents;Signature;Review and Submit',
  counters: 'small',
  centeredLabels: true,
  headerLevel: 2,
};

export const CustomProgressTerm = Template.bind(null);
CustomProgressTerm.args = {
  ...defaultArgs,
  label: 'Label is here',
  labels:
    'Personal Information;Household Status;Supporting Documents;Signature;Review and Submit',
  counters: 'small',
  centeredLabels: true,
  headerLevel: 2,
  progressTerm: 'Chapter',
};
CustomProgressTerm.parameters = {
  chromatic: { disableSnapshot: true },
};

export const LongHeaderCausingWrap = Template.bind(null);
LongHeaderCausingWrap.args = {
  ...defaultArgs,
  'heading-text': 'This is a very long header that will cause the text to wrap onto multiple lines, which is useful for testing how the component handles long text in the header.',
};
