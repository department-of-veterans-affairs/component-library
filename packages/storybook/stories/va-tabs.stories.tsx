import { Fragment } from 'react';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  propDefaults,
  componentStructure,
} from './wc-helpers';
import { VaTabs, VaTabItem, VaTabPanel } from '@department-of-veterans-affairs/web-components/react-bindings';

const tabsDocs = getWebComponentDocs('va-tabs');
const tabItemDocs= getWebComponentDocs('va-tab-item');
const tabPanelDocs= getWebComponentDocs('va-tab-panel');

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
    label: 'Filtered content options',
    tabItems: tabItems,
    panelContent: panelContent,
    selected: 0,
    templateKey: 0, // Used to differentiate between multiple instances in the DOM to prevent duplicate IDs
  },
};

const Template = (args) => (
  <VaTabs label={args.label} selected={args.selected}>
    <VaTabItem buttonText="Status" targetId="panel-1" slot="tab"></VaTabItem>
    <VaTabItem buttonText="Issues" targetId="panel-2" slot="tab"></VaTabItem>
    <VaTabPanel panelId="panel-1" slot="panel" selected={true}>
      <h2>Panel 1</h2>
      <p>This is the content for Panel 1.</p>
    </VaTabPanel>
    <VaTabPanel panelId="panel-2" slot="panel" selected={false}>
      <h2>Panel 2</h2>
      <p>This is the content for Panel 2.</p>
    </VaTabPanel>
  </VaTabs>
);

// const Template = (args: any) => (
//   <VaTabs label={args.label} selected={args.selected}>
//     {args.tabItems.map((item, index) => (
//       <Fragment key={`fragment-${index}-tabs`}>
//         <VaTabItem
//           buttonText={item.label}
//           targetId={item.targetId}
//           key={item.label}
//           isSelectedTab={index === args.selected}
//           slot="tab"
//         />
//         <VaTabPanel
//           panelId={item.targetId}
//           selected={index === args.selected}
//           key={`${item.label}-panel`}
//           slot="panel"
//         >
//           <h2>{item.label}</h2>
//           <p>{args.panelContent[index]}</p>
//         </VaTabPanel>
//       </Fragment>
//     ))}
//   </VaTabs>
// );

// const Template = (args: any) => (
//   <va-tabs label={args.label} selected={args.selected}>
//     {args.tabItems.map((item, index) => (
//       <va-tab-item
//         button-text={item.label}
//         target-id={item.targetId}
//         key={item.label}
//         is-selected-tab={index === args.selected ? true : false}
//         slot="tab"
//       ></va-tab-item>
//     ))}
//     {args.tabItems.map((item, index) => (
//       <va-tab-panel
//         panel-id={item.targetId}
//         slot="panel"
//         selected={index === args.selected ? true : false}
//         key={`${item.label}-panel`}
//       >
//         <h2>{item.label}</h2>
//         <p>{args.panelContent[index]}</p>
//       </va-tab-panel>
//     ))}
//   </va-tabs>
// );

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
  useLongTabLabel: true,
  templateKey: 2,
};
WithALongLabel.argTypes = propStructure(tabsDocs);
