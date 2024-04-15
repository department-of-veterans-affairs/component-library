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
  borderless: true
}

const tableDataNoLinks = [
  ["Document title", "Description", "Year"],
  ["Declaration of Independence", "Statement adopted by the Continental Congress declaring independence from the British Empire.", "1776"],
  ["Bill of Rights", "The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.", "1791"],
  ["Declaration of Sentiments", "A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.", "1848"],
  ["Emancipation Proclamation", "An executive order granting freedom to slaves in designated southern states.", "1863"]
];

const tableDataWithLinks = [
  ["Document title", "Description", "Year"],
  [{
    text: "Declaration of Independence",
    href: "https://www.archives.gov/founding-docs/declaration-transcript"
  }, "Statement adopted by the Continental Congress declaring independence from the British Empire.", "1776"],
  [{
    text: "Bill of Rights",
    href: "https://www.archives.gov/founding-docs/bill-of-rights-transcript"
  }, "The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.", "1791"],
  [{
    text: "Declaration of Sentiments",
    href: "https://www.nps.gov/wori/learn/historyculture/declaration-of-sentiments.htm"
  }, "A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.", "1848"],
  [{
    text: "Emancipation Proclamation",
    href: "https://www.archives.gov/exhibits/featured-documents/emancipation-proclamation?_ga=2.100862977.1665893808.1712776954-1250436154.1712776953"
  }, "An executive order granting freedom to slaves in designated southern states.", "1863"]
];

const tableDataWithRouterLinks = [
  ["Document title", "Description", "Year"],
  [{
    text: "Declaration of Independence",
    href: "https://www.archives.gov/founding-docs/declaration-transcript",
    isRouterLink: true
  }, "Statement adopted by the Continental Congress declaring independence from the British Empire.", "1776"],
  [{
    text: "Bill of Rights",
    href: "https://www.archives.gov/founding-docs/bill-of-rights-transcript",
    isRouterLink: true
  }, "The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.", "1791"],
  [{
    text: "Declaration of Sentiments",
    href: "https://www.nps.gov/wori/learn/historyculture/declaration-of-sentiments.htm",
    isRouterLink: true
  }, "A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.", "1848"],
  [{
    text: "Emancipation Proclamation",
    href: "https://www.archives.gov/exhibits/featured-documents/emancipation-proclamation?_ga=2.100862977.1665893808.1712776954-1250436154.1712776953",
    isRouterLink: true
  }, "An executive order granting freedom to slaves in designated southern states.", "1863"]
];

const tableDataWithTestIds = [
  ["Document title", "Description", "Year"],
  [{ text: "Declaration of Independence", testId: "this-is-a-test-id"}, "Statement adopted by the Continental Congress declaring independence from the British Empire.", "1776"],
  [{ text: "Bill of Rights", testId: "this-is-another-test-id" }, "The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.", "1791"],
  ["Declaration of Sentiments", "A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.", "1848"],
  ["Emancipation Proclamation", "An executive order granting freedom to slaves in designated southern states.", "1863"]
];

const Template = ({ tableData, uswds, borderless }) => {
  return (
    <VaTable uswds={uswds} borderless={borderless} tableData={tableData} >
      Borderless table: A borderless table can be useful when you want the information to feel more a part of the text it accompanies and extends.
    </VaTable>
  );
};

const WithLinks = ({ tableData, uswds, borderless }) => {
  return (
    <VaTable uswds={uswds} borderless={borderless} tableData={tableData} >
      This is a borderless table with links in some of its cells.
    </VaTable>
  );
};

const RouterLinks = ({ tableData, uswds, borderless }) => {
  function handleEvent({ detail }) {
    const { href } = detail;
    console.log(`Route changed for ${href}`);
  }

  return (
    <>
      <p>The cells with links in this table have React Router links. The objects in the table data array that represents these cells have an <code>isRouterLink:true</code> property.
        When the corresponding anchor tag is clicked these links emit a <code>route-change</code> event.
        This event can be handled in a React component where utilities provided 
        by React Router can be used to change the page under view, as in the example below:
      </p>
      <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
        <code>
import React from 'react';<br/>
import &#x7b; useHistory &#x7d; from 'react-router-dom';<br/>
<br/>
const YourComponent &#61; (&#x7b; uswds, borderless, tableData &#x7d;) &#61;&#62;  &#x7b;<br/>
&nbsp;const history &#61; useHistory();<br/>
<br/>
&nbsp;function handleRouteChange(&#x7b; detail &#x7d;) &#x7b;<br/>
&nbsp;&nbsp;&nbsp;const &#x7b; href &#x7d; &#61; detail;<br/>
&nbsp;&nbsp;&nbsp;history.push(href);<br/>
&nbsp;&#x7d;<br/>
  <br/>

  &nbsp;return (<br/>
  &nbsp;&nbsp;&#60;VaTable<br/>
  &nbsp;&nbsp;&nbsp;uswds=&#x7b;uswds&#x7d;<br />
  &nbsp;&nbsp;&nbsp;borderless=&#x7b;borderless&#x7d;<br/>        
  &nbsp;&nbsp;&nbsp;tableData=&#x7b;tableData&#x7d;<br/>
  &nbsp;&nbsp;&nbsp;onRouteChange=&#x7b;handleRouteChange&#x7d;<br/>
  &nbsp;&nbsp;&#62;<br />
  &nbsp;&nbsp;&nbsp;This is a borderless table with React Router links in some of its cells.<br/>
  &nbsp;&nbsp;&#60;/VaTable&#62;<br />
  &nbsp;);<br/>
&#x7d;;
        </code>
      </pre>
      <VaTable
        uswds={uswds}
        borderless={borderless}
        tableData={tableData}
        onRouteChange={handleEvent}
      >
        This is a borderless table with React Router links in some of its cells.
      </VaTable>
    </>
  );
}

const WithTestId = ({ tableData, uswds, borderless }) => {
  return (
    <VaTable uswds={uswds} borderless={borderless} tableData={tableData} >
      This is a borderless table with test ids in some of its cells.
    </VaTable>
  );
};

export const Default = Template.bind(null);

Default.args = {
  tableData: tableDataNoLinks,
  ...defaultArgs
}

export const BorderlessWithLinks = WithLinks.bind(null);

BorderlessWithLinks.args = {
  tableData: tableDataWithLinks,
  ...defaultArgs
}

export const BorderlessWithRouterLinks = RouterLinks.bind(null);
BorderlessWithRouterLinks.args = {
  tableData: tableDataWithRouterLinks,
  ...defaultArgs
}

export const BorderlessWithTestId = WithTestId.bind(null);
BorderlessWithTestId.args = {
  tableData: tableDataWithTestIds,
  ...defaultArgs
}