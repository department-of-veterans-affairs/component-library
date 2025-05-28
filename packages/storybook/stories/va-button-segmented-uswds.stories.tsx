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
    { label: 'two words', value: 'segment1' },
    { label: 'Three words here', value: 'segment2' },
    { label: 'Super long label that might go here', value: 'segment3' }
  ],
};

const Template = ({ 
  buttons, 
  selected,
}) => {
  return (
    <VaButtonSegmented
      buttons={buttons}
      selected={selected}
      onButtonClick={(e: Event) => console.log(e)}
    />
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(segmentedButtonDocs);

export const Selected = Template.bind(null);
Selected.args = {
  ...defaultArgs,
  selected: 1,
};
