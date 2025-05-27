import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const segmentedButtonDocs = getWebComponentDocs('va-buttton-segmented');

export default {
  title: 'Components/Button Segmented',
  id: 'uswds/va-button-segmented',
  parameters: {
    componentSubtitle: 'va-buttton-segmented web component',
    docs: {
      page: () => <StoryDocs storyDefault={Primary} data={segmentedButtonDocs} />,
    },
  },
};

const defaultArgs = {
  'text': 'Segment',
  'selected': false,
  'disabled': false,
  'onClick': e => console.log(e),
};

const Template = ({ text, selected, disabled, onClick }) => {
  return (
    <va-buttton-segmented
      text={text}
      selected={selected}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

export const Primary = Template.bind(null);
Primary.args = {
  ...defaultArgs,
};
Primary.argTypes = propStructure(segmentedButtonDocs);

export const Selected = Template.bind(null);
Selected.args = {
  ...defaultArgs,
  selected: true,
  text: 'Selected Segment',
};

export const Disabled = Template.bind(null);
Disabled.args = {
  ...defaultArgs,
  disabled: true,
  text: 'Disabled Segment',
};
