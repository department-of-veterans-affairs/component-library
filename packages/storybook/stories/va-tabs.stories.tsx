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
    alternateHeading: 'Status Report',
    targetId: 'panel-1',
    panelContent: 'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
  },
  {
    label: 'Issues',
    alternateHeading: 'Pressing Issues',
    targetId: 'panel-2',
    panelContent: 'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
  },
  {
    label: 'Overview',
    alternateHeading: 'General Overview',
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
    omitPanelHeading: false, // Used to omit the panel heading in the template.
    useAlternateHeading: false, // Used to show a different heading than the tab label.
  },
};

const Template = (args) => {
  return (
    <va-tabs label={args.label} selected={args.selected}>
      {
        args.tabItems.map((item, index) => {
          // Format the label for the tab item, using a long label if specified
          // in args or the alternate heading if specified.
          let formattedLabel = item.label;
          let panelContentHeading = item.label;
          if (args.longTabLabelExample && index === 1) {
            formattedLabel = args.longTabLabelExample;
            panelContentHeading = args.longTabLabelExample;
          }
          else if (args.useAlternateHeading) {
            panelContentHeading = item.alternateHeading;
          }

          // Construct child content to be passed to the panel.
          let panelChildren = !args.omitPanelHeading ?(
            <Fragment>
              <h2>{panelContentHeading}</h2>
              <p>{item.panelContent}</p>
            </Fragment>
          ) : <p>{item.panelContent}</p>;

          return (
            <Fragment key={`fragment-${item.targetId}-${args.templateKey}`}>
              <va-tab-item
                key={`tab-item-${item.targetId}-${args.templateKey}`}
                button-text={formattedLabel}
                target-id={item.targetId}
              ></va-tab-item>
              <va-tab-panel
                key={item.targetId}
                panel-id={item.targetId}
                selected={index === args.selected}
              >
                {panelChildren}
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

export const WithoutPanelHeading = Template.bind(null);
WithoutPanelHeading.args = {
  ...Default.args,
  omitPanelHeading: true,
  templateKey: 3,
};
WithoutPanelHeading.argTypes = propStructure(tabsDocs);

export const WithHeadingNotMatchingTab = Template.bind(null);
WithHeadingNotMatchingTab.args = {
  ...Default.args,
  useAlternateHeading: true,
  templateKey: 4,
};
WithHeadingNotMatchingTab.argTypes = propStructure(tabsDocs);