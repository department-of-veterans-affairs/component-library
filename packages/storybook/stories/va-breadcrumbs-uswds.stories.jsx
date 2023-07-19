import React, { useState } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const breadcrumbsDocs = getWebComponentDocs('va-breadcrumbs');

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

const Template = ({ label, 'disable-analytics': disableAnalytics, uswds }) => (
  <va-breadcrumbs uswds label={label} disable-analytics={disableAnalytics}>
    <a href="#home">Home</a>
    <a href="#one">Level one</a>
    <a href="#two">Level two</a>
  </va-breadcrumbs>
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
        <va-breadcrumbs
          uswds
          label={label}
          disable-analytics={disableAnalytics}
        >
          {crumbs?.map((crumb, i) => {
            return (
              <li key={i}>
                <a href={crumb.path}>{crumb.label}</a>
              </li>
            );
          })}
        </va-breadcrumbs>
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
  return (
    <div>
      <va-breadcrumbs
        uswds
        label={label}
        disable-analytics={disableAnalytics}
        wrapping
      >
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#one">Federal Contracting</a>
        </li>
        <li>
          <a href="#two">Contracting assistance programs</a>
        </li>
        <li>
          <a href="#two">
            Women-owned small business federal contracting program
          </a>
        </li>
      </va-breadcrumbs>
    </div>
  );
};

const defaultArgs = {
  'uswds': true,
  'label': 'Breadcrumb',
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
