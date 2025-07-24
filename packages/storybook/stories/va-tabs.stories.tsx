import { Fragment } from 'react';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  propDefaults,
  componentStructure,
} from './wc-helpers';

const tabsDocs = getWebComponentDocs('va-tabs');
const tabItemDocs= getWebComponentDocs('va-tab-item');
const tabPanelDocs= getWebComponentDocs('va-tab-panel');

const tabItems = [
  {
    label: 'Status',
    targetId: 'panel-1',
    panelContent: 'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
  },
  {
    label: 'Issues',
    targetId: 'panel-2',
    panelContent: 'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
  },
  {
    label: 'Overview',
    targetId: 'panel-3',
    panelContent: 'No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.'
  }
];

export default {
  title: 'Components/Tabs',
  id: 'components/va-tabs',
  component: 'va-tabs',
  subcomponents: {
    'va-tab-item': componentStructure(tabItemDocs)[tabItemDocs.tag],
    'va-tab-panel': componentStructure(tabPanelDocs)[tabPanelDocs.tag],
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
    label: 'Status details',
    tabItems: tabItems,
    selected: 0,
    templateKey: 0, // Used to differentiate between multiple instances in the DOM to prevent duplicate IDs
  },
};

const Template = (args) => {
  return (
    <va-tabs label={args.label} selected={args.selected}>
      {
        args.tabItems.map((item, index) => {
          let formattedLabel = item.label;
          if (args.longTabLabelExample && index === 1) {
            formattedLabel = args.longTabLabelExample
          }

          return (
            <Fragment key={`fragment-${item.targetId}-${args.templateKey}`}>
              <va-tab-item
                key={`tab-item-${item.targetId}-${args.templateKey}`}
                button-text={formattedLabel}
                target-id={item.targetId}
                slot="tab"
              ></va-tab-item>
              <va-tab-panel
                key={item.targetId}
                panel-id={item.targetId}
                slot="panel"
                selected={index === args.selected}
              >
                <h2>{item.label}</h2>
                <p>{item.panelContent}</p>
              </va-tab-panel>
            </Fragment>
          );
        })
      }
    </va-tabs>
  );
}

export const Default = Template.bind(null);
Default.argTypes = propStructure(tabsDocs);

export const WithSecondTabSelected = Template.bind(null);
WithSecondTabSelected.args = {
  ...Default.args,
  selected: 1,
  templateKey: 1,
};
WithSecondTabSelected.argTypes = propStructure(tabsDocs);

export const WithALongLabel = Template.bind(null);
WithALongLabel.args = {
  ...Default.args,
  longTabLabelExample: 'Really long tab name here',
  templateKey: 2,
};
WithALongLabel.argTypes = propStructure(tabsDocs);
