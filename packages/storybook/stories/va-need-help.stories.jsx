/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const needHelpDocs = getWebComponentDocs('va-need-help');

export default {
  title: 'Components/Need help?',
  id: 'components/va-need-help',
  parameters: {
    componentSubtitle: `va-need-help web component`,
    docs: {
      page: () => <StoryDocs data={needHelpDocs} />,
    },
  },
};

const defaultArgs = {};

const Template = ({}) => (
  <va-need-help>
    <div slot="content">
      <p>
        Call us at <va-telephone contact="8008271000"></va-telephone>. We're here Monday through Friday, 8:00 a.m to 9:00 p.m ET. If you have hearing loss, call <va-telephone contact="711" tty="true"></va-telephone>.
      </p>
    </div>
  </va-need-help>
);

export const Default = Template.bind(null);
Default.argTypes = propStructure(needHelpDocs);
