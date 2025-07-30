import { Fragment } from 'react';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  propDefaults,
  componentStructure,
} from './wc-helpers';
import { Default as CardDefault } from './va-card.stories';
import { Default as FileInputDefault } from './va-file-input-uswds.stories';
import { Default as TableDefault } from './va-table-uswds.stories';
import { ManyAccordions as ManyAccordions } from './va-accordion-uswds.stories';

const tabsDocs = getWebComponentDocs('va-tabs');
const tabItemDocs= getWebComponentDocs('va-tab-item');
const tabPanelDocs= getWebComponentDocs('va-tab-panel');

const tabItems = [
  {
    label: 'Status',
    panelHeading: 'Status',
    targetId: 'panel-1',
    panelContent: 'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
  },
  {
    label: 'Files',
    panelHeading: 'Files',
    targetId: 'panel-2',
    panelContent: 'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
  },
  {
    label: 'Overview',
    panelHeading: 'Overview',
    targetId: 'panel-3',
    panelContent: 'No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.'
  },
  {
    label: 'Details',
    panelHeading: 'Details',
    targetId: 'panel-4',
    panelContent: 'The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause.'
  }
];

const altPanelHeadings = [
  'Status details',
  'Files details',
  'Overview of the claim process',
  'Details of the claim'
]

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
    initiallySelected: {
      table: {
        disable: true,
      },
    },
    templateKey: {
      table: {
        disable: true,
      }
    },
    renderAdditionalTabItem: {
      table: {
        disable: true,
      }
    },
  },
  args: {
    ...propDefaults(tabsDocs),
    label: 'Status details',
    tabItems: tabItems,
    initiallySelected: 0,
    templateKey: 0, // Used to differentiate between multiple instances in the DOM to prevent duplicate IDs
    omitPanelHeading: false, // Used to omit the panel heading in the template.
    renderAdditionalTabItem: false, // Used to conditionally render an additional (fourth) tab item.
  },
};

const Template = (args) => {
  return (
    <div className="columns">
      <va-tabs label={args.label} initially-selected={args.initiallySelected}>
        {
          args.tabItems.map((item, index) => {
            // Skip rendering for additional tab items if its not indicated in args
            if (!args.renderAdditionalTabItem && index > 2) {
              return null;
            }
            // Format the label for the tab item, using a long label if specified
            // in args or the panel heading if specified.
            let formattedLabel = item.label;
            if (args.longTabLabelExample && index === 1) {
              formattedLabel = args.longTabLabelExample;
            }

            // Construct child content to be passed to the panel.
            let panelChildren = !args.omitPanelHeading ?(
              <Fragment>
                <h2 className="vads-u-margin-y--0">{item.panelHeading}</h2>
                <p>{item.panelContent}</p>
              </Fragment>
            ) : <p className="vads-u-margin-y--0">{item.panelContent}</p>;

            return (
              <Fragment key={`fragment-${item.targetId}-${args.templateKey}`}>
                <va-tab-item
                  key={`tab-item-${item.targetId}-${args.templateKey}`}
                  button-text={formattedLabel}
                  target-id={item.targetId}
                ></va-tab-item>
                <va-tab-panel key={item.targetId} panel-id={item.targetId}>
                  {panelChildren}
                </va-tab-panel>
              </Fragment>
            );
          })
        }
      </va-tabs>
    </div>
  );
}

const TemplateWithMeaningfulContent = (args) => {
  return (
    <div className="columns">
      <va-tabs label={args.label} initially-selected={args.initiallySelected}>
        <va-tab-item button-text="Status" target-id="meaningful-panel-1"></va-tab-item>
        <va-tab-panel panel-id="meaningful-panel-1">
          <div>
            <h2 className="tab-header vads-u-margin-y--0">
              Claim status
            </h2>
            <p>
              Here's the latest information on your claim.
            </p>
            <CardDefault {...CardDefault.args} />
            <h3>Additional evidence</h3>
            <FileInputDefault {...FileInputDefault.args} />
          </div>
        </va-tab-panel>

        <va-tab-item button-text="Issues" target-id="meaningful-panel-2"></va-tab-item>
        <va-tab-panel panel-id="meaningful-panel-2">
          <div>
            <h2 className="tab-header vads-u-margin-y--0">Claim files</h2>
            <p className="vads-u-margin-top--1 va-introtext">
              If you need to add evidence, you can do that here. You can also review
              the files associated with this claim.
            </p>

            <TableDefault {...TableDefault.args} />
          </div>
        </va-tab-panel>

        <va-tab-item button-text="Overview" target-id="meaningful-panel-3"></va-tab-item>
        <va-tab-panel panel-id="meaningful-panel-3">
          <div>
            <div className="claim-overview-header-container">
              <h2 className="tab-header vads-u-margin-y--0">
                Overview of the claim process
              </h2>
              <p className="vads-u-margin-top--1 vads-u-margin-bottom--2 va-introtext">
                There are 8 steps in the claim process. It's common for claims to
                repeat steps 3 to 6 if we need more information.
              </p>
            </div>
            <ManyAccordions {...ManyAccordions.args} />
          </div>
        </va-tab-panel>
      </va-tabs>
    </div>
  )
}

export const Default = Template.bind(null);
Default.argTypes = propStructure(tabsDocs);

export const WithSecondTabSelected = Template.bind(null);
WithSecondTabSelected.args = {
  ...Default.args,
  initiallySelected: 1,
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
WithALongLabel.tags = ['dst-testing'];

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
  tabItems: tabItems.map((item, index) => ({
    ...item,
    panelHeading: altPanelHeadings[index],
  })),
  templateKey: 4,
};
WithHeadingNotMatchingTab.argTypes = propStructure(tabsDocs);


export const WithAdditionalTabItem = Template.bind(null);
WithAdditionalTabItem.args = {
  ...Default.args,
  renderAdditionalTabItem: true,
};
WithAdditionalTabItem.argTypes = propStructure(tabsDocs);
WithAdditionalTabItem.tags = ['dst-testing'];


export const WithMeaningfulContent = TemplateWithMeaningfulContent.bind(null);
WithMeaningfulContent.args = {
  ...Default.args,
  label: 'Claim details',
  initiallySelected: 0,
  templateKey: 6,
};
WithMeaningfulContent.argTypes = propStructure(tabsDocs);