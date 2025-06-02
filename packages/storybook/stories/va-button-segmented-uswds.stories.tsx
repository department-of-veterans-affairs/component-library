import { VaButtonSegmented } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const segmentedButtonDocs = getWebComponentDocs('va-button-segmented');

export default {
  title: 'Components/Button Segmented',
  id: 'uswds/va-button-segmented',
  parameters: {
    componentSubtitle: 'va-button-segmented web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={segmentedButtonDocs} />,
    },
  },
};

const defaultArgs = {
  'selected': 0,
  'buttons': [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
    { label: 'Table', value: 'table' },
    { label: 'Map', value: 'map' }
  ],
  'vaChange': (e: MouseEvent) => {
    console.log('Button clicked:', e.detail);
  }
};

const Template = ({ 
  buttons, 
  selected,
  vaChange
}) => {
  return (
    <VaButtonSegmented
      buttons={buttons}
      selected={selected}
      onVaChange={vaChange}
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

export const LongLabels = Template.bind(null);
LongLabels.args = {
  ...defaultArgs,
  'buttons': [
    { label: 'Two words', value: 'twoWords' },
    { label: 'Three words here', value: 'threeWords' },
    { label: 'Super long label that might go here', value: 'longLabel' },
    { label: 'label', value: 'label' }
  ],
};