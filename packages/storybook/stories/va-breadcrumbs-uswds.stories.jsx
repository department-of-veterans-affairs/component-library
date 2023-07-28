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
      <button onClick={e => addCrumb()}>Add Crumb</button>
      <button onClick={e => removeCrumb()}>Remove Crumb</button>
      <button onClick={e => replaceCrumbs()}>Replace Crumbs</button>
      <button onClick={e => resetCrumbs()}>Reset Crumbs</button>
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
