import React, { useState } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { VaBreadcrumbs } from '@department-of-veterans-affairs/web-components/react-bindings';

const breadcrumbsDocs = getWebComponentDocs('va-breadcrumbs');
VaBreadcrumbs.displayName = 'VaBreadcrumbs';

export default {
  title: 'USWDS/Breadcrumbs USWDS',
  id: 'uswds/va-breadcrumbs',
  parameters: {
    componentSubtitle: 'va-breadcrumbs web component',
    docs: {
      page: () => <StoryDocs data={breadcrumbsDocs} />,
    },
  },
};
const dataArray = [
  { label: 'Level one', href: '#one' },
  { label: 'Level two', href: '#two' },
  { label: 'Level three', href: '#three' },
];

const Template = ({ label, 'disable-analytics': disableAnalytics, uswds }) => (
  <VaBreadcrumbs
    uswds={uswds}
    label={label}
    disableAnalytics={disableAnalytics}
    breadcrumbList={dataArray}
  ></VaBreadcrumbs>
);

const DynamicCrumbsTemplate = ({
  label,
  'disable-analytics': disableAnalytics,
}) => {
  const breadcrumbs = [
    { label: 'Level 1', href: '/#1' },
    { label: 'Level 2', href: '/#2' },
    { label: 'Level 3', href: '/#3' },
  ];

  const breadcrumbs2 = [
    { label: 'First Link', href: '#example1' },
    { label: 'Second Link', href: '#example2' },
    { label: 'Third Link', href: '#example3' },
    { label: 'Fourth Link', href: '#example4' },
  ];
  const [crumbs, setCrumbs] = useState(breadcrumbs);
  const addCrumb = () =>
    setCrumbs(arr => [
      ...arr,
      { label: `Level ${arr.length + 1}`, href: `/#${arr.length + 1}` },
    ]);
  const replaceCrumbs = () => setCrumbs(breadcrumbs2);
  const resetCrumbs = () => setCrumbs(breadcrumbs);
  const removeCrumb = () =>
    setCrumbs(arr => {
      const newArr = [...arr];
      newArr.pop();
      return newArr;
    });

  return (
    <div>
      <va-button uswds onClick={e => addCrumb()} text="Add Crumb"/>
      <va-button uswds onClick={e => removeCrumb()} text="Remove Crumb"/>
      <va-button uswds onClick={e => replaceCrumbs()} text="Replace Crumbs"/>
      <va-button uswds onClick={e => resetCrumbs()} text="Reset Crumbs"/>
      <br />
      {crumbs.length > 0 && (
        <VaBreadcrumbs
          label={label}
          disableAnalytics={disableAnalytics}
          breadcrumbList={crumbs}
          uswds
        ></VaBreadcrumbs>
      )}
    </div>
  );
};

const WrappingCrumbsTemplate = ({
  label,
  'disable-analytics': disableAnalytics,
  uswds,
  wrapping,
}) => {
  const breadcrumbs = [
    { label: 'Home', href: '/#1' },
    { label: 'Federal Contracting', href: '/#2' },
    { label: 'Contracting assistance programs', href: '/#3' },
    {
      label: 'Women-owned small business federal contracting program',
      href: '/#4',
    },
  ];
  return (
    <div>
      <VaBreadcrumbs
        label={label}
        disableAnalytics={disableAnalytics}
        uswds={uswds}
        breadcrumbList={breadcrumbs}
        wrapping={wrapping}
      ></VaBreadcrumbs>
    </div>
  );
};


const WithRouterTemplate = ({
  label,
  'disable-analytics': disableAnalytics,
  uswds,
  wrapping
}) => {
  const breadcrumbs = [
    { label: 'Home', href: '/#1' },
    { label: 'Federal Contracting', href: '/#2', isRouterLink: true },
    { label: 'Contracting assistance programs', href: '/#3', isRouterLink: true },
    {
      label: 'Women-owned small business federal contracting program',
      href: '/#4',
      isRouterLink: true
    },
  ];

  function handleRouteChange({detail}) {
    const { href } = detail;
    console.log(`the href is: ${href}`)
  }

  return (
    <div>
      <p>Some of the breadcrumbs in this example have an <code>isRouterLink:true</code> property.
        When the corresponding anchor tag is clicked these links emit a <code>route-change</code> event.
        This event can be handled in a React component where utilities provided 
        by React Router can be used to change the page under view, as in the example below:
      </p>
      <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
        <code>
import React from 'react';<br/>
import &#x7b; useHistory &#x7d; from 'react-router-dom';<br/>
<br/>
const YourComponent &#61; (&#x7b; label, disableAnalytics, uswds, breadcrumbList, wrapping &#x7d;) &#61;&#62;  &#x7b;<br/>
&nbsp;const history &#61; useHistory();<br/>
<br/>
&nbsp;function handleRouteChange(&#x7b; detail &#x7d;) &#x7b;<br/>
&nbsp;&nbsp;&nbsp;const &#x7b; href &#x7d; &#61; detail;<br/>
&nbsp;&nbsp;&nbsp;history.push(href);<br/>
&nbsp;&#x7d;<br/>
  <br/>

  &nbsp;return (<br/>
  &nbsp;&nbsp;&#60;VaBreadcrumbs<br/>
  &nbsp;&nbsp;&nbsp;label=&#x7b;label&#x7d;<br/>
  &nbsp;&nbsp;&nbsp;disableAnalytics=&#x7b;disableAnalytics&#x7d;<br/>
  &nbsp;&nbsp;&nbsp;uswds=&#x7b;uswds&#x7d;<br/>
  &nbsp;&nbsp;&nbsp;breadcrumbList=&#x7b;breadcrumbs&#x7d;<br/>
  &nbsp;&nbsp;&nbsp;wrapping=&#x7b;wrapping&#x7d;<br/>
  &nbsp;&nbsp;&nbsp;onRouteChange=&#x7b;handleRouteChange&#x7d;<br/>
  &nbsp;&nbsp;&#62;&#60;/VaBreadcrumbs&#62;<br/>
  &nbsp;);<br/>
&#x7d;;

        </code>
      </pre>
      <VaBreadcrumbs
        label={label}
        disableAnalytics={disableAnalytics}
        uswds={uswds}
        breadcrumbList={breadcrumbs}
        wrapping={wrapping}
        onRouteChange={handleRouteChange}
      ></VaBreadcrumbs>
    </div>
  );
};


const defaultArgs = {
  'uswds': true,
  'label': 'Breadcrumb',
  'breadcrumb-list':
    '[{ "label": "Level One", "href": "#one" }, { "label": "Level two", "href": "#two" }, { "label": "Current", "href": "#current" }]',
  'disable-analytics': false,
  'wrapping': false,
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(breadcrumbsDocs);

export const RerenderState = DynamicCrumbsTemplate.bind(null);
RerenderState.args = { ...defaultArgs };

export const WrappingState = WrappingCrumbsTemplate.bind(null);
WrappingState.args = { ...defaultArgs, wrapping: true };

export const WithRouterLinkSupport = WithRouterTemplate.bind(null);
WithRouterLinkSupport.args = { ...defaultArgs }