import { Fragment } from 'react';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  propDefaults,
  componentStructure,
} from './wc-helpers';
import { VaFileInput } from '@department-of-veterans-affairs/web-components/react-bindings';

const tabsDocs = getWebComponentDocs('va-tabs');
const tabItemDocs= getWebComponentDocs('va-tab-item');
const tabPanelDocs= getWebComponentDocs('va-tab-panel');

const tabItems = [
  {
    label: 'Status',
    alternateHeading: 'Claim Status',
    targetId: 'panel-1',
    panelContent: 'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
  },
  {
    label: 'Files',
    alternateHeading: 'Claim Files',
    targetId: 'panel-2',
    panelContent: 'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
  },
  {
    label: 'Overview',
    alternateHeading: 'Overview of the claim process',
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

const TemplateWithMeaningfulContent = (args) => {
  return (
    <va-tabs label={args.label} selected={args.selected}>
      <va-tab-item button-text="Status" target-id="meaningful-panel-1"></va-tab-item>
      <va-tab-panel panel-id="meaningful-panel-1" selected={args.selected === 0}>
        <div className="vads-u-padding--2 vads-u-padding-top--3">
          <div className="claim-status-header-container">
            <h2 className="tab-header vads-u-margin-y--0">Claim status</h2>
            <p className="vads-u-margin-top--1 vads-u-margin-bottom--3 va-introtext">
              Here's the latest information on your claim.
            </p>
            <div className="vads-u-margin-bottom--4">
              <span className="usa-label">In Progress</span>
              <p className="vads-u-margin-top--1 vads-u-margin-bottom--0">
                Last updated: April 24, 2025
              </p>
            </div>
          </div>
          <h3 className="vads-u-margin-top--0 vads-u-margin-bottom--3">What you need to do</h3>
          <div className="no-documents">
            <p>There's nothing we need from you right now. We'll let you know when there's an update.</p>
          </div>
          <h3 className="vads-u-margin-bottom--3">What we're doing</h3>
          <va-card>
            <h4 className="vads-u-margin-top--0 vads-u-margin-bottom--1">
              Step 2 of 8: Initial review
            </h4>
            <p
              data-cy="description"
              className=" vads-u-margin-top--0p5 vads-u-margin-bottom--0p5"
            >
              We're checking your claim for basic information, like your name and Social Security number. If information is missing, we'll contact you.
            </p>
          </va-card>
        </div>
      </va-tab-panel>

      <va-tab-item button-text="Issues" target-id="meaningful-panel-2"></va-tab-item>
      <va-tab-panel panel-id="meaningful-panel-2" selected={args.selected === 1}>
        <div className="vads-u-padding--2 vads-u-padding-top--3">
          <div className="claim-file-header-container">
            <h2 className="tab-header vads-u-margin-y--0">Claim files</h2>
            <p className="vads-u-margin-top--1 va-introtext">
              If you need to add evidence, you can do that here. You can also review the files associated with this claim.
            </p>

            <div className="vads-u-margin-bottom--4">
              <h3 id="add-files" className="vads-u-margin-bottom--3">Additional evidence</h3>
              <VaFileInput
                label="Select a file to upload"
                name="my-file-input"
                required={false}
                error=""
                hint="You can upload a .pdf, .gif, .jpg, .bmp, or .txt file."
                encrypted={false}
                maxFileSize={Infinity}
                minFileSize={0}
              ></VaFileInput>
            </div>

            <div className="documents-filed-container">
              <h3 className="vads-u-margin-top--0 vads-u-margin-bottom--3">
                Documents filed
              </h3>
              <ol className="va-list-horizontal">
                <li className="vads-u-margin-bottom--2 vads-u-padding-bottom--1">
                  <div>
                    <h4
                      className="filename-title vads-u-margin-y--0"
                      data-dd-privacy="mask"
                      data-dd-action-name="document filename"
                    >
                      sample.pdf
                    </h4>
                    <p className="vads-u-margin-top--0p5 vads-u-margin-bottom--0">
                      Additional evidence
                    </p>
                    <p className="vads-u-margin-top--0p5 vads-u-margin-bottom--0">
                      Document type: Civilian Police Reports
                    </p>
                    <p className="vads-u-margin-top--0p5 vads-u-margin-bottom--1">
                      Received on May 14, 2025
                    </p>
                  </div>
                </li>
                <li className="vads-u-margin-bottom--2 vads-u-padding-bottom--1">
                  <div>
                    <h4
                      className="filename-title vads-u-margin-y--0"
                      data-dd-privacy="mask"
                      data-dd-action-name="document filename"
                    >
                      Jaime_Brooks_600705788_526EZ.pdf
                    </h4>
                    <p className="vads-u-margin-top--0p5 vads-u-margin-bottom--0">
                      Additional evidence
                    </p>
                    <p className="vads-u-margin-top--0p5 vads-u-margin-bottom--0">
                      Document type: VA 21-526 Veterans Application for
                      Compensation or Pension
                    </p>
                    <p className="vads-u-margin-top--0p5 vads-u-margin-bottom--1">
                      Received on April 24, 2025
                    </p>
                  </div>
                </li>
                <li className="vads-u-margin-bottom--2 vads-u-padding-bottom--1">
                  <div>
                    <h4
                      className="filename-title vads-u-margin-y--0"
                      data-dd-privacy="mask"
                      data-dd-action-name="document filename"
                    >
                      f8e8b1724a8030c621129bd37c02863b.pdf
                    </h4>
                    <p className="vads-u-margin-top--0p5 vads-u-margin-bottom--0">
                      Additional evidence
                    </p>
                    <p className="vads-u-margin-top--0p5 vads-u-margin-bottom--0">
                      Document type: VA Form 21-0781a, Statement in Support of
                      Claim for Service Connection for Posttraumatic Stress
                      Disorder Secondary to Personal Assault
                    </p>
                    <p className="vads-u-margin-top--0p5 vads-u-margin-bottom--1">
                      Received on April 24, 2025
                    </p>
                  </div>
                </li>
                <li className="vads-u-margin-bottom--2 vads-u-padding-bottom--1">
                  <div>
                    <h4
                      className="filename-title vads-u-margin-y--0"
                      data-dd-privacy="mask"
                      data-dd-action-name="document filename"
                    >
                      Buddy:lay stmt.pdf
                    </h4>
                    <p className="vads-u-margin-top--0p5 vads-u-margin-bottom--0">
                      Additional evidence
                    </p>
                    <p className="vads-u-margin-top--0p5 vads-u-margin-bottom--0">
                      Document type: Buddy / Lay Statement
                    </p>
                    <p className="vads-u-margin-top--0p5 vads-u-margin-bottom--1">
                      Received on April 24, 2025
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </va-tab-panel>

      <va-tab-item button-text="Overview" target-id="meaningful-panel-3"></va-tab-item>
      <va-tab-panel panel-id="meaningful-panel-3" selected={args.selected === 2}>
        <div className="vads-u-padding--2 vads-u-padding-top--3">
          <div className="claim-overview-header-container">
            <h2 className="tab-header vads-u-margin-y--0">
              Overview of the claim process
            </h2>
            <p className="vads-u-margin-top--1 vads-u-margin-bottom--6 va-introtext">
              There are 8 steps in the claim process. It's common for claims to
              repeat steps 3 to 6 if we need more information.
            </p>
          </div>

          <div className="claim-phase-stepper">
            <va-accordion>
              <va-accordion-item header="Step 1: Claim received" id="phase1" open={false}>
                <va-icon
                  icon="check_circle"
                  className="phase-completed"
                  srtext="Completed" slot="icon">
                </va-icon>
                <span className="vads-u-margin-y--0">
                  <p className="vads-u-margin-y--0">
                    We started working on your claim on April 24, 2025
                  </p>
                </span>
              </va-accordion-item>
              <va-accordion-item header="Step 2: Initial review" id="phase2" open={false}>
                <va-icon
                  icon="flag"
                  className="phase-current"
                  srtext="Current"
                  slot="icon"
                ></va-icon>
                <strong className="current-phase">
                  Your claim is in this step as of April 24, 2025.
                </strong>
                <span className="vads-u-margin-y--0">
                  <p className="vads-u-margin-top--0">
                    We'll check your claim for basic information we need, like your name and Social Security number.
                  </p>
                  <p className="vads-u-margin-bottom--0">
                    If information is missing, we'll contact you.
                  </p>
                </span>
              </va-accordion-item>
              <va-accordion-item header="Step 3: Evidence gathering" id="phase3" open={false}>
                <div className="repeat-phase">
                  <va-icon icon="autorenew" size={3}></va-icon>
                  <span>Step may repeat if we need more information.</span>
                </div>
                <span className="vads-u-margin-y--0">
                  <p>
                    We'll review your claim and make sure we have all the evidence and information we need. If we need more evidence to decide your claim, we may gather it in these ways:
                  </p>
                  <ul>
                    <li>Ask you to submit evidence </li>
                    <li>Ask you to have a claim exam</li>
                    <li>Request medical records from your private health care provider</li>
                    <li>Gather evidence from our VA records</li>
                  </ul>
                  <p>This is usually the longest step in the process.</p>
                  <p>Note: You can submit evidence at any time. But if you submit evidence after this step, your claim will go back to this step for review.</p>
                </span>
              </va-accordion-item>
              <va-accordion-item header="Step 4: Evidence review" id="phase4" open={false}>
                <div className="repeat-phase">
                  <va-icon icon="autorenew" size={3}></va-icon>
                  <span>Step may repeat if we need more information.</span>
                </div>
                <span className="vads-u-margin-y--0">
                  <p>We'll review all the evidence for your claim.</p>
                  <p>If we need more evidence or you submit more evidence, your claim will go back to Step 3: Evidence gathering.</p>
                </span>
              </va-accordion-item>
              <va-accordion-item header="Step 5: Rating" id="phase5" open={false}>
                <div className="repeat-phase">
                  <va-icon icon="autorenew" size={3}></va-icon>
                  <span>Step may repeat if we need more information.</span>
                </div>
                <span className="vads-u-margin-y--0">
                  <p>We'll decide your claim and determine your disability rating.</p>
                  <p>If we need more evidence or you submit more evidence, your claim will go back to Step 3: Evidence gathering.</p>
                </span>
              </va-accordion-item>
              <va-accordion-item header="Step 6: Preparing decision letter" id="phase6" open={false}>
                <div className="repeat-phase">
                  <va-icon icon="autorenew" size={3}></va-icon>
                  <span>Step may repeat if we need more information.</span>
                </div>
                <span className="vads-u-margin-y--0">
                  <p>We'll prepare your decision letter.</p>
                  <p>If you're eligible for disability benefits, this letter will include your disability rating, the amount of your monthly payments, and the date your payments will start.</p>
                  <p>If we need more evidence or you submit more evidence, your claim will go back to Step 3: Evidence gathering.</p>
                </span>
              </va-accordion-item>
              <va-accordion-item header="Step 7: Final review" id="phase7" open={false}>
                <span className="vads-u-margin-y--0">
                  <p>A senior reviewer will do a final review of your claim and the decision letter.</p>
                </span>
              </va-accordion-item>
              <va-accordion-item header="Step 8: Claim decided" id="phase8" open={false}>
                <span className="vads-u-margin-y--0">
                  <p>You'll be able to view and download your decision letter on the status page for this claim.</p>
                  <p>We'll also send you a copy of your decision letter by mail. It should arrive within 10 business days, but it may take longer.</p>
                </span>
              </va-accordion-item>
            </va-accordion>
          </div>
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

export const WithMeaningfulContent = TemplateWithMeaningfulContent.bind(null);
WithMeaningfulContent.args = {
  ...Default.args,
  label: 'Claim details',
  selected: 0,
  templateKey: 5,
};
WithMeaningfulContent.argTypes = propStructure(tabsDocs);