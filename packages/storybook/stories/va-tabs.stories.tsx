import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  propDefaults,
} from './wc-helpers';

const tabsDocs = getWebComponentDocs('va-tabs');

const tabItems = [
  { label: 'Status', url: '#tab1' },
  { label: 'Issues', url: '#tab2' },
  { label: 'Overview', url: '#tab3' },
  { label: 'Test', url: '#tab4' },
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
    selected: 0,
  },
};

const vaTabs = (args: any) => {
  return (
    <div>
      <va-tabs label={args.label} selected={args.selected}>
        {
          args.tabItems.map((item, index: number) => {
            let label = item.label;

            if (args.useLongTabLabel && index === 1) {
              label = 'Really long tab name here';
            }

            return (
              <va-tab-item href={item.url} key={item.label}>
                {label}
              </va-tab-item>
            );
          })
        }
      </va-tabs>
      {
        args.tabItems.map((item, index: number) => (
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

export const WithSecondTabSelected = Template.bind(null);
WithSecondTabSelected.args = {
  ...Default.args,
  selected: 1,
};
WithSecondTabSelected.argTypes = propStructure(tabsDocs);

export const WithALongLabel = Template.bind(null);
WithALongLabel.args = {
  ...Default.args,
  useLongTabLabel: true,
};
WithALongLabel.argTypes = propStructure(tabsDocs);
