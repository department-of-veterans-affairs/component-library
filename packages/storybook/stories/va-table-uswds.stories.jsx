import React from 'react';
import { getWebComponentDocs, StoryDocs } from './wc-helpers';
import { VaTable } from '@department-of-veterans-affairs/web-components/react-bindings';

const tableDocs = getWebComponentDocs('va-table');
VaTable.displayName = 'VaTable';

export default {
  title: 'Components/Table USWDS',
  id: 'uswds/va-table',
  parameters: {
    componentSubtitle: 'va-table web component',
    docs: {
      page: () => <StoryDocs data={tableDocs} />,
    },
  },
};

const defaultArgs = {
  uswds: true,
  tableData: [
    ["Document title", "Description", "Year"],
    ["Declaration of Independence", "Statement adopted by the Continental Congress declaring independence from the British Empire.", "1776"],
    ["Bill of Rights", "The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.", "1791"],
    ["Declaration of Sentiments", "A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.", "1848"],
    ["Emancipation Proclamation", "An executive order granting freedom to slaves in designated southern states.", "1863"]
  ]
};

const Template = ({
uswds, tableData
}) => {
  return (
    <VaTable uswds={uswds} tableData={tableData}>
      Borderless table: A borderless table can be useful when you want the information to feel more a part of the text it accompanies and extends.
    </VaTable>
  );
};

export const BorderlessTable = Template.bind(null);
BorderlessTable.args = {
  ...defaultArgs,
};
