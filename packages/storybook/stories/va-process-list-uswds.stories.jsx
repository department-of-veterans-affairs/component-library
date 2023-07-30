/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const processListDocs = getWebComponentDocs('va-process-list');

export default {
  title: 'USWDS/Process list USWDS',
  id: 'uswds/va-process-list',
  parameters: {
    componentSubtitle: `va-process-list web component`,
    docs: {
      page: () => <StoryDocs data={processListDocs} />,
    },
  },
};

const defaultArgs = {uswds: true};

const Template = ({uswds}) => {
  return (
    <va-process-list uswds={uswds}>
      <li class="usa-process-list__item">
        <h3 className='usa-process-list__heading'>Check to be sure you can request a Board Appeal</h3>
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
      </li>
      <li class="usa-process-list__item">
        <h3 className='usa-process-list__heading'>Gather your information</h3>
        <p>Here’s what you’ll need to apply:</p>
        <ul>
          <li>Your mailing address</li>
          <li>
            The VA decision date for each issue you’d like us to review (this is
            the date on the decision notice you got in the mail)
          </li>
        </ul>
      </li>
      <li class="usa-process-list__item">
        <h3 className='usa-process-list__heading'>Start your request</h3>
        <p>
          We’ll take you through each step of the process. It should take about
          30 minutes.
        </p>
      </li>
    </va-process-list>
  );
};


const StatusTemplate = ({uswds}) => {
    return (
      <va-process-list uswds={uswds}>
        <li className='activeIcon usa-process-list__item'>
          <h3 className='usa-process-list__heading'>Active Icon</h3>
          <p>Add the class <code>activeIcon</code> to the <code>li</code> element make the list icon blue.</p>
        </li>
        <li className='checkIcon usa-process-list__item'>
          <h3 className='usa-process-list__heading'>Checkmark Icon</h3>
          <p>Add the class <code>checkIcon</code> to the <code>li</code> element make the list icon a checkmark.</p>
        </li>
        <li className='pendingIcon usa-process-list__item'>
          <h3 className='usa-process-list__heading'>Pending Icon</h3>
          <p>Add the class <code>pendingIcon</code> to the <code>li</code> element make the list item grayed out.</p>
        </li>
        <li class="usa-process-list__item">
          <h3 className='usa-process-list__heading'>Default Icon</h3>
        </li>
      </va-process-list>
    );
  };

const UtilityStyling = ({uswds}) => {
  return (
    <va-process-list uswds={uswds}>
      <li class="usa-process-list__item">
        <p>Look at me in mobile view</p>
        <va-additional-info
          trigger="Show more"
          class="medium-screen:vads-u-display--none"
        >
          <img src="https://via.placeholder.com/350" />
        </va-additional-info>
      </li>
      <li class="usa-process-list__item">
        <p className="vads-u-margin-top--0">Look at me in desktop view</p>
        <p className="vads-u-display--none medium-screen:vads-u-display--block vads-u-background-color--gray-cool-light">
          I'm only visible on desktop.
          <br />
          <span className="vads-u-font-style--italic">
            And any global utility style will work.
          </span>
        </p>
      </li>
    </va-process-list>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(processListDocs);

export const Status = StatusTemplate.bind(null);
Status.args = { ...defaultArgs };

export const AdditionalStyling = UtilityStyling.bind(null);
AdditionalStyling.args = { ...defaultArgs };