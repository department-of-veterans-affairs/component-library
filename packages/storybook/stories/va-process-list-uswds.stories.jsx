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
      <li>
        <h3>Check to be sure you can request a Board Appeal</h3>
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
      <li>
        <h3>Gather your information</h3>
        <p>Here’s what you’ll need to apply:</p>
        <ul>
          <li>Your mailing address</li>
          <li>
            The VA decision date for each issue you’d like us to review (this is
            the date on the decision notice you got in the mail)
          </li>
        </ul>
      </li>
      <li>
        <h3>Start your request</h3>
        <p>
          We’ll take you through each step of the process. It should take about
          30 minutes.
        </p>
      </li>
    </va-process-list>
  );
};


const AlternateIconsTemplate = ({uswds}) => {
    return (
      <va-process-list uswds={uswds}>
        <li className='activeIcon'>
          <h3>Active Icon</h3>
          <p>Add the class activeIcon to the li element make the list icon active.</p>
        </li>
        <li className='checkIcon'>
          <h3>Checkmark Icon</h3>
          <p>Add the class checkIcon to the li element make the list icon a checkmark.</p>
        </li>
        <li>
          <h3>Default Icon</h3>
        </li>
      </va-process-list>
    );
  };

const UtilityStyling = ({uswds}) => {
  return (
    <va-process-list uswds={uswds}>
      <li>
        <p>Look at me in mobile view</p>
        <va-additional-info
          trigger="Show more"
          class="medium-screen:vads-u-display--none"
        >
          <img src="https://via.placeholder.com/350" />
        </va-additional-info>
      </li>
      <li>
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

export const AlternateIcons = AlternateIconsTemplate.bind(null);
AlternateIcons.args = { ...defaultArgs };

export const AdditionalStyling = UtilityStyling.bind(null);
AdditionalStyling.args = { ...defaultArgs };