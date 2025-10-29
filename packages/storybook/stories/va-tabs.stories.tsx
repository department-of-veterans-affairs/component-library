import { Fragment } from 'react';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  propDefaults,
  componentStructure,
  removeFragmentsFromCodeSource,
  internalTestingAlert,
} from './wc-helpers';
import { Default as CardDefault } from './va-card.stories';
import { Default as FileInputDefault } from './va-file-input-uswds.stories';
import { Default as TableDefault } from './va-table-uswds.stories';
import { ManyAccordions as ManyAccordions } from './va-accordion-uswds.stories';
import './styles/va-tabs.scss';

const tabsDocs = getWebComponentDocs('va-tabs');
const tabItemDocs= getWebComponentDocs('va-tab-item');
const tabPanelDocs= getWebComponentDocs('va-tab-panel');

const tabItems = [
  {
    label: 'Overview',
    panelHeading: 'Overview',
    targetId: 'panel-1',
    panelContent: 'This tab provides a general overview of the component functionality. Here you can find basic information and introductory content that helps users understand the purpose and main features of this section.',
  },
  {
    label: 'Features',
    panelHeading: 'Features',
    targetId: 'panel-2',
    panelContent: 'This section highlights the key features and capabilities available. It demonstrates various functionality options and shows how different aspects of the component work together to provide a comprehensive solution.',
  },
  {
    label: 'Documentation',
    panelHeading: 'Documentation',
    targetId: 'panel-3',
    panelContent: 'Find detailed documentation and implementation guidelines in this section. This includes technical specifications, usage examples, and best practices for implementing and customizing the component.'
  }
];

const altPanelHeadings = [
  'Overview details',
  'Features details',
  'Documentation guide',
  'Additional information'
]

export default {
  title: 'Components/Tabs',
  id: 'components/va-tabs',
  component: 'va-tabs',
  decorators: [
    (Story) => (
      <div className="columns">
        <Story />
      </div>
    ),
  ],
  subcomponents: {
    'va-tab-item': componentStructure(tabItemDocs)[tabItemDocs.tag],
    'va-tab-panel': componentStructure(tabPanelDocs)[tabPanelDocs.tag],
  },
  parameters: {
    componentSubtitle: 'va-tabs web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={tabsDocs} />,
      source: {
        transform: (source: string) => removeFragmentsFromCodeSource(source),
      }
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
  },
  args: {
    ...propDefaults(tabsDocs),
    label: 'Component details',
    tabItems: tabItems,
    initiallySelected: 0,
    templateKey: 0, // Used to differentiate between multiple instances in the DOM to prevent duplicate IDs
    omitPanelHeading: false, // Used to omit the panel heading in the template.
  },
};

const Template = (args) => {
  return (
    <va-tabs label={args.label} initially-selected={args.initiallySelected}>
      {
        args.tabItems.map((item, index) => {
          // Format the label for the tab item, using a long label if specified
          // in args or the panel heading if specified.
          let formattedLabel = item.label;
          if (args.longTabLabelExample && index === 1) {
            formattedLabel = args.longTabLabelExample;
          }

          // Construct child content to be passed to the panel.
          let panelChildren = !args.omitPanelHeading ?(
            <Fragment>
              <h2>{item.panelHeading}</h2>
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
              <va-tab-panel key={item.targetId} panel-id={item.targetId}>
                {panelChildren}
              </va-tab-panel>
            </Fragment>
          );
        })
      }
    </va-tabs>
  );
}

const TemplateWithMeaningfulContent = (args) => {
  return (
    <va-tabs label={args.label} initially-selected={args.initiallySelected}>
      <va-tab-item button-text="Dashboard" target-id="meaningful-panel-1"></va-tab-item>
      <va-tab-panel panel-id="meaningful-panel-1">
        <div>
          <h2 className="vads-u-margin-y--0">
            Dashboard Overview
          </h2>
          <p>
            Here's the latest information and key metrics for your dashboard.
          </p>
          <CardDefault {...CardDefault.args} />
          <h3>Upload files</h3>
          <FileInputDefault {...FileInputDefault.args} />
        </div>
      </va-tab-panel>

      <va-tab-item button-text="Data" target-id="meaningful-panel-2"></va-tab-item>
      <va-tab-panel panel-id="meaningful-panel-2">
        <div>
          <h2 className="vads-u-margin-y--0">Data Tables</h2>
          <p className="vads-u-margin-top--1 va-introtext">
            View and manage your data in the table below. You can sort, filter,
            and export the information as needed.
          </p>

          <TableDefault {...TableDefault.args} />
        </div>
      </va-tab-panel>

      <va-tab-item button-text="Settings" target-id="meaningful-panel-3"></va-tab-item>
      <va-tab-panel panel-id="meaningful-panel-3">
        <div>
          <div className="claim-overview-header-container">
            <h2 className="vads-u-margin-y--0">
              Configuration Settings
            </h2>
            <p className="vads-u-margin-top--1 vads-u-margin-bottom--2 va-introtext">
              Manage your application settings and preferences using the
              configuration options below.
            </p>
          </div>
          <ManyAccordions {...ManyAccordions.args} />
        </div>
      </va-tab-panel>
    </va-tabs>
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
WithALongLabel.decorators = [(Story) => (
  <>
    {internalTestingAlert('how an extended tab label behaves within the component', true)}
    <Story />
  </>
)];

export const WithoutPanelHeading = Template.bind(null);
WithoutPanelHeading.args = {
  ...Default.args,
  omitPanelHeading: true,
  templateKey: 3,
};
WithoutPanelHeading.argTypes = propStructure(tabsDocs);
WithoutPanelHeading.decorators = [(Story) => (
  <>
    {internalTestingAlert(
      'how the component behaves and if there are any accessibility concerns when the panel heading is omitted',
      true
    )}
    <Story />
  </>
)];


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
WithHeadingNotMatchingTab.decorators = [(Story) => (
  <>
    {internalTestingAlert()}
    <Story />
  </>
)];
WithHeadingNotMatchingTab.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithAdditionalTabItem = Template.bind(null);
WithAdditionalTabItem.args = {
  ...Default.args,
  tabItems: [
    ...tabItems,
    {
      label: 'Support',
      panelHeading: 'Support',
      targetId: 'panel-4',
      panelContent: 'This section provides support information and resources. Find help documentation, contact information, and troubleshooting guides to assist with implementation and usage of the component.'
    }
  ],
};
WithAdditionalTabItem.argTypes = propStructure(tabsDocs);
WithAdditionalTabItem.decorators = [(Story) => (
  <>
    {internalTestingAlert(
      'how the component behaves when an additional tab item is added. At this point, only three tabs are recommended',
      true
    )}
    <Story />
  </>
)];


export const WithMeaningfulContent = TemplateWithMeaningfulContent.bind(null);
WithMeaningfulContent.args = {
  ...Default.args,
  label: 'Application details',
  initiallySelected: 0,
  templateKey: 6,
};
WithMeaningfulContent.argTypes = propStructure(tabsDocs);
WithMeaningfulContent.decorators = [(Story) => (
  <>
    {internalTestingAlert()}
    <Story />
  </>
)];
