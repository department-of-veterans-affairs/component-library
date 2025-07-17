import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  propDefaults,
  componentStructure,
} from './wc-helpers';

const tabsDocs = getWebComponentDocs('va-tabs');
const tabItemDocs= getWebComponentDocs('va-tab-item');

const tabItems = [
  { label: 'Status', targetId: 'panel-1' },
  { label: 'Issues', targetId: 'panel-2' },
  { label: 'Overview', targetId: 'panel-3' },
  { label: 'Test', targetId: 'panel-4' },
];

const panelContent = [
  'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
  'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
  'No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.',
]

export default {
  title: 'Components/Tabs',
  id: 'components/va-tabs',
  component: 'va-tabs',
  subcomponents: {
    'va-tab-item': componentStructure(tabItemDocs)[tabItemDocs.tag],
  },
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
  },
  args: {
    ...propDefaults(tabsDocs),
    label: 'Filtered content options',
    tabItems: tabItems,
    panelContent: panelContent,
    selected: 0,
    key: 0, // Used to differentiate between multiple instances in the DOM to prevent duplicate IDs
  },
};

const vaTabs = (args: any) => {
  return (
    <div>
      <va-tabs label={args.label} selected={args.selected}>
        {
          args.tabItems.map((item, index: number) => {
            let targetId = `${item.targetId}-${args.key}`;
            let label = item.label;
            if (args.useLongTabLabel && index === 1) {
              label = 'Really long tab name here';
            }

            return (
              <va-tab-item target-id={targetId} key={item.label}>
                {label}
              </va-tab-item>
            );
          })
        }
      </va-tabs>
      {
        args.tabItems.map((item, index: number) => {
          let targetId = `${item.targetId}-${args.key}`;
          return (
            <div id={targetId} key={item.label} hidden>
              <h2>{item.label}</h2>
              <p>{panelContent[index]}</p>
            </div>
        );
      })}
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
  key: 1,
};
WithSecondTabSelected.argTypes = propStructure(tabsDocs);

export const WithALongLabel = Template.bind(null);
WithALongLabel.args = {
  ...Default.args,
  useLongTabLabel: true,
  key: 2,
};
WithALongLabel.argTypes = propStructure(tabsDocs);
