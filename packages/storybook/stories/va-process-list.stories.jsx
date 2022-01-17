/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const processListDocs = getWebComponentDocs('va-process-list');

export default {
  title: 'Components/va-process-list',
};

const defaultArgs = {};

const Template = ({}) => {
  return (
    <va-process-list>
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

const UtilityStyling = ({}) => {
  return (
    <va-process-list>
      <li>
        <h3>First step</h3>
        <p>Look at me in mobile view</p>
        <va-additional-info
          trigger="Show more"
          class="medium-screen:vads-u-display--none"
        >
          <img src="https://via.placeholder.com/350" />
        </va-additional-info>
      </li>
      <li>
        <h3>Next step</h3>
        <p>Look at me in desktop view</p>
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

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(processListDocs);

export const AdditionalStyling = UtilityStyling.bind({});
