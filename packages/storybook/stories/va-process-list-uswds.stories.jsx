/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs, componentStructure } from './wc-helpers';

const processListDocs = getWebComponentDocs('va-process-list');
const processListItemDocs = getWebComponentDocs('va-process-list-item');

export default {
  title: 'Components/Process list USWDS',
  id: 'uswds/va-process-list',
  subcomponents: componentStructure(processListItemDocs),
  argTypes: propStructure(processListItemDocs),
  parameters: {
    componentSubtitle: 'va-process-list web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={processListDocs} />,
    },
  },
};

const defaultArgs = {};

const Template = ({}) => {
  return (
    <va-process-list>
      <va-process-list-item header="Check to be sure you can request a Board Appeal">
        <p>
          You can request a Board Appeal up to 1 year from the date on your
          decision notice. (Exception: if you have a contested claim, you have
          only 60 days from the date on your decision notice to request a Board
          Appeal.)
        </p>
        <p>You can request a Board Appeal for these claim decisions:</p>
        <ul>
          <li>An initial claim</li>
          <li>A Supplemental Claim</li>
          <li>A Higher-Level Review</li>
        </ul>
        <p>
          <strong>Note: </strong>
          You can’t request a Board Appeal if you’ve already requested one for
          this same claim.
        </p>
      </va-process-list-item>
      <va-process-list-item header='Gather your information'>
        <p>Here’s what you’ll need to apply:</p>
        <ul>
          <li>Your mailing address</li>
          <li>
            The VA decision date for each issue you’d like us to review (this is
            the date on the decision notice you got in the mail)
          </li>
        </ul>
      </va-process-list-item>
      <va-process-list-item header='Start your request'>
        <p>
          We’ll take you through each step of the process. It should take about
          30 minutes.
        </p>
      </va-process-list-item>
    </va-process-list>
  );
};


const StatusTemplate = (defaultArgs) => {
  return (
    <va-process-list>
      <va-process-list-item checkmark header='Checkmark Icon'>  
        <p>Add the prop <code>checkmark</code> to make the list icon a checkmark.</p>
      </va-process-list-item>
      <va-process-list-item active header='Active Icon'>
        <p>Add the prop <code>active</code> to make the list icon and header blue.</p>
      </va-process-list-item>
      <va-process-list-item pending header='Pending Icon'>
        <p>Add the prop <code>pending</code> to make the list item and icon grayed out.</p>
      </va-process-list-item>
      <va-process-list-item header='Default Icon' />
    </va-process-list>
  );
};


const HeaderSizeTemplate = (defaultArgs) => {
  return (
    <va-process-list>
      <va-process-list-item header='Size h1' level='1'/>
      <va-process-list-item header='Size h2' level='2'/>
      <va-process-list-item header='Size h3' level='3'/>
      <va-process-list-item header='Size h4' level='4'/>
      <va-process-list-item header='Size h5' level='5'/>
      <va-process-list-item header='Size h6' level='6'/>
    </va-process-list>
  );
};

const CustomSizingTemplate = (defaultArgs) => {
  return (
    <va-process-list>
      
      <va-process-list-item header='Step One' level='2'>
        <p class="vads-u-font-size--lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
      </va-process-list-item>
      <va-process-list-item header='Step Two' level='2'>
        <p class="vads-u-font-size--lg">Aliquam id felis pulvinar ligula ultricies sollicitudin eget nec dui.</p>
      </va-process-list-item>
      <va-process-list-item header='Step Three' level='2'>
        <p class="vads-u-font-size--lg">Cras augue velit, pellentesque sit amet nisl ut, tristique suscipit sem. Cras sollicitudin auctor mattis.</p>
      </va-process-list-item>
      
    </va-process-list>
  );
};

const UtilityStyling = (defaultArgs) => {
  return (
    <va-process-list>
      <va-process-list-item>
        <p>Look at me in mobile view</p>
        <va-additional-info
          trigger="Show more"
          class="medium-screen:vads-u-display--none"
        >
          <img src="https://via.placeholder.com/350" alt="a placeholder image that displays the text 350 x 350" />
        </va-additional-info>
      </va-process-list-item>
      <va-process-list-item>
        <p className="vads-u-margin-top--0">Look at me in desktop view</p>
        <p className="vads-u-display--none medium-screen:vads-u-display--block vads-u-background-color--gray-cool-light">
          I'm only visible on desktop.
          <br />
          <span className="vads-u-font-style--italic">
            And any global utility style will work.
          </span>
        </p>
      </va-process-list-item>
    </va-process-list>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(processListDocs);

export const Status = StatusTemplate.bind(null);
Status.args = { ...defaultArgs };

export const HeaderSize = HeaderSizeTemplate.bind(null);
HeaderSize.args = { ...defaultArgs };

export const CustomSizing = CustomSizingTemplate.bind(null);
CustomSizing.args = { ...defaultArgs };

export const AdditionalStyling = UtilityStyling.bind(null);
AdditionalStyling.args = { ...defaultArgs };