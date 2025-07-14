import { VaTabs } from '@department-of-veterans-affairs/web-components/react-bindings';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  propDefaults,
  getDefaultPropValue,
} from './wc-helpers';

const tabsDocs = getWebComponentDocs('va-tabs');

const tabItems = [
  { label: 'First', url: '#tab1' },
  { label: 'Second', url: '#tab2' },
  { label: 'Third', url: '#tab3' },
];

const panelContent = [
  'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
  'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
  'No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.',
]

export default {
  title: 'Components/Tabs',
  id: 'components/Tabs',
  parameters: {
    componentSubtitle: 'va-tabs web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={tabsDocs} />,
    },
  },
  argTypes: {
    ...propStructure(tabsDocs),
    label: {
      name: 'Label',
      description: 'Label for the tabs component',
      control: { type: 'text' },
    },
    tabItems: {
      name: 'Tab Items',
      description: 'Array of objects representing the tabs, each with a label and URL',
      control: { type: 'object' },
    },
  },
  args: {
    ...propDefaults(tabsDocs),
    label: 'Filtered content options',
    tabItems: tabItems,
  },
};

const vaTabs = (args: any) => {
  return (
    <div>
      <VaTabs
        label={args.label}
        tabItems={args.tabItems}
      />
      {
        args.tabItems.map((item, index) => (
          <div id={`tab${index + 1}`} key={item.label} hidden>
            <h2>{item.label}</h2>
            <p>{panelContent[index]}</p>
          </div>
        ))
      }
    </div>
  );
}

const Template = (args: any) => vaTabs(args);

export const Default = Template.bind(null);
Default.argTypes = propStructure(tabsDocs);
