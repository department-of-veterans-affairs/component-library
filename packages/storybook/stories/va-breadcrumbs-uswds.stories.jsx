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
  <va-breadcrumbs
    uswds={uswds}
    label={label}
    disable-analytics={disableAnalytics}
  >
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
    { label: 'Level 1', path: '/#1' },
    { label: 'Level 2', path: '/#2' },
    { label: 'Level 3', path: '/#3' },
  ];

  const breadcrumbs2 = [
    { label: 'First Link', path: '#example1' },
    { label: 'Second Link', path: '#example2' },
    { label: 'Third Link', path: '#example3' },
    { label: 'Fourth Link', path: '#example4' },
  ];
  const [crumbs, setCrumbs] = useState(breadcrumbs);
  const addCrumb = () =>
    setCrumbs(arr => [
      ...arr,
      { label: `Level ${arr.length + 1}`, path: `/#${arr.length + 1}` },
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
      <p>
        Note: To rerender the breadcrumbs dynamically, the anchor links must be
        wrapped in list tags.
      </p>
      {crumbs.length > 0 && (
        <va-breadcrumbs
          label={label}
          disable-analytics={disableAnalytics}
          uswds
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

const RDFATemplate = ({
  label,
  'disable-analytics': disableAnalytics,
  uswds,
}) => {
  return (
    <div>
      <va-breadcrumbs
        label={label}
        disable-analytics={disableAnalytics}
        uswds={uswds}
      >
        <li
          property="itemListElement"
          typeof="ListItem"
          class="usa-breadcrumb__list-item"
        >
          <a
            property="item"
            typeof="WebPage"
            href="javascript:void(0);"
            class="usa-breadcrumb__link"
          >
            <span property="name">Home</span>
          </a>
          <meta property="position" content="1" />
        </li>
        <li
          property="itemListElement"
          typeof="ListItem"
          class="usa-breadcrumb__list-item"
        >
          <a
            property="item"
            typeof="WebPage"
            href="javascript:void(0);"
            class="usa-breadcrumb__link"
          >
            <span property="name">Federal Contracting</span>
          </a>
          <meta property="position" content="2" />
        </li>
        <li
          property="itemListElement"
          typeof="ListItem"
          class="usa-breadcrumb__list-item"
        >
          <a
            property="item"
            typeof="WebPage"
            href="javascript:void(0);"
            class="usa-breadcrumb__link"
          >
            <span property="name">Contracting assistance programs</span>
          </a>
          <meta property="position" content="3" />
        </li>
        <li
          property="itemListElement"
          typeof="ListItem"
          class="usa-breadcrumb__list-item usa-current"
          aria-current="page"
        >
          <span property="name">
            Women-owned small business federal contracting program
          </span>
          <meta property="position" content="4" />
        </li>
      </va-breadcrumbs>
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
        label={label}
        disable-analytics={disableAnalytics}
        uswds={uswds}
        wrapping={wrapping}
      >
        <li class="usa-breadcrumb__list-item">
          <a href="" class="usa-breadcrumb__link">
            <span>Home</span>
          </a>
        </li>
        <li class="usa-breadcrumb__list-item">
          <a href="" class="usa-breadcrumb__link">
            <span>Federal Contracting</span>
          </a>
        </li>
        <li class="usa-breadcrumb__list-item">
          <a href="" class="usa-breadcrumb__link">
            <span>Contracting assistance programs</span>
          </a>
        </li>
        <li class="usa-breadcrumb__list-item usa-current" aria-current="page">
          <span>Women-owned small business federal contracting program</span>
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

export const RDFAState = RDFATemplate.bind(null);
RDFAState.args = { ...defaultArgs };

export const WrappingState = WrappingCrumbsTemplate.bind(null);
WrappingState.args = { ...defaultArgs, wrapping: true };
