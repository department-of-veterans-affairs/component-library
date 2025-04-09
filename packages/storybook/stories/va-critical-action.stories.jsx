import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const criticalActionDocs = getWebComponentDocs('va-critical-action');

export default {
  title: 'Components/Critical Action',
  id: 'components/va-critical-action',
  parameters: {
    componentSubtitle: 'va-critical-action web component',
    docs: {
      page: () => (
        <StoryDocs storyDefault={Default} data={criticalActionDocs} />
      ),
    },
  },
};

const Template = args => {
  const { link, text } = args;

  return <va-critical-action link={link} text={text} />;
};

export const Default = Template.bind({});
Default.args = {
  link: 'https://www.va.gov/disability',
  text: 'Add evidence by July 23, 2025',
};

Default.argTypes = {
  ...propStructure(criticalActionDocs),
};

export const CardWithCriticalAction = ({}) => {
  return (
    <va-card>
      <h3 className="claim-list-item-header vads-u-margin-bottom--2">
        <div>
          <span
            className="usa-label vads-u-font-weight--normal vads-u-font-size--md vads-u-margin-bottom--2 vads-u-display--block vads-u-font-family--sans"
            style={{ width: 'fit-content' }}
          >
            IN PROGRESS
          </span>
          Claim for compensation
          <span className="vads-u-font-family--sans vads-u-margin-top--0p5 vads-u-font-weight--normal vads-u-font-size--md vads-u-display--block">
            Received on June 15, 2023
          </span>
        </div>
      </h3>
      <va-critical-action
        link="https://www.va.gov/claim-or-appeal-status/"
        text="We requested more information from you. Submit by May 21, 2025."
      />
      <ul
        className="details vads-u-padding-left--0"
        style={{ listStyle: 'none' }}
      >
        <li className="vads-u-margin--0">
          <va-icon
            icon="mail"
            size={3}
            class="vads-u-margin-right--1"
            aria-hidden="true"
          />
          We sent you a development letter
        </li>
        <li className="vads-u-margin--0">Step 3 of 8: Evidence gathering</li>
        <li>Moved to this step on June 18, 2023</li>
      </ul>
      <va-link
        href="https://www.va.gov/claim-or-appeal-status/"
        text="Details"
        active="true"
      />
    </va-card>
  );
};
