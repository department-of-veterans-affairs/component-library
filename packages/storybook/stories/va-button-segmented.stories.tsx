import { VaButtonSegmented } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const segmentedButtonDocs = getWebComponentDocs('va-button-segmented');

export default {
  title: 'Components/Button Segmented',
  id: 'va-button-segmented',
  parameters: {
    componentSubtitle: 'va-button-segmented web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={segmentedButtonDocs} />,
    },
  },
};

const defaultArgs = {
  'label': 'Segmented Button Example.',
  'selected': 0,
  'buttons': [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
    { label: 'Table', value: 'table' },
    { label: 'Map', value: 'map' }
  ],
  'vaButtonClick': (e: MouseEvent) => {
    console.log('Button clicked:', e.detail);
  }
};

const Template = ({
  label,
  buttons, 
  selected,
  vaButtonClick
}) => {
  return (
    <VaButtonSegmented
      label={label}
      buttons={buttons}
      selected={selected}
      onVaButtonClick={vaButtonClick}
    />
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(segmentedButtonDocs);

export const SelectedItem = Template.bind(null);
SelectedItem.args = {
  ...defaultArgs,
  selected: 1,
};

export const ThreeButtons = Template.bind(null);
ThreeButtons.args = {
  ...defaultArgs,
  buttons: [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Archived', value: 'archived' }
  ],
};

export const TwoButtons = Template.bind(null);
TwoButtons.args = {
  ...defaultArgs,
  buttons: [
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Past', value: 'past' },
  ],
};
