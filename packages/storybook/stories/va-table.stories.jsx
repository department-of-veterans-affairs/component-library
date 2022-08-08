import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const tableDocs = getWebComponentDocs('va-table');

export default {
  title: 'Components/va-table',
  parameters: {
    componentSubtitle: 'Table web component',
    docs: {
      page: () => <StoryDocs data={tableDocs} />,
    },
  },
};
const data = [
  [
    'Declaration of Independence',
    'Statement adopted by the Continental Congress declaring independence from the British Empire',
    '1776',
  ],
  [
    'Bill of Rights',
    'The first ten ammendements of the U.S. Constitution guaranteeing rights and freedoms',
    '1791',
  ],
  [
    'Declaration of Sentiments',
    'A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.',
    '1848',
  ],
  [
    'Emancipation Proclamation',
    'An executive order granting freedom to slaves in designated southern states.',
    '1863',
  ],
];

const Template = args => {
  const {
    'table-title': tableTitle,
    'sort-column': sortColumn,
    descending,
    rows = data,
  } = args;
  const columns = ['Document title', 'Description', 'Year'];
  return (
    <main>
      <va-table
        table-title={tableTitle}
        sort-column={sortColumn}
        descending={descending}
      >
        <va-table-row slot="headers">
          {columns.map(col => (
            <span>{col}</span>
          ))}
        </va-table-row>

        {rows.map(row => (
          <va-table-row>
            {row.map(item => (
              <span>{item}</span>
            ))}
          </va-table-row>
        ))}
      </va-table>
    </main>
  );
};

const defaultArgs = {
  'table-title': 'My table',
  'sort-column': undefined,
  'descending': false,
};

export const Default = Template.bind({ data });
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(tableDocs);

export const Sortable = Template.bind({ data });
Sortable.args = {
  ...defaultArgs,
  'sort-column': 2,
};

export const MissingData = Template.bind(null);
MissingData.args = {
  ...defaultArgs,
  rows: [
    ['A document', '', ''],
    [
      'Bill of Rights',
      'The first ten ammendements of the U.S. Constitution guaranteeing rights and freedoms',
      '1791',
    ],
  ],
};

export const CustomComponents = Template.bind(null);
CustomComponents.args = {
  ...defaultArgs,
  rows: [
    ...data,
    [
      'Social Security Act',
      <div>
        <div>
          An act to provide for the general welfare by establishing a system of
          Federal old-age benefits. Enables provisions for:
        </div>
        <ul>
          <li>aged persons</li>
          <li>blind persons</li>
          <li>dependent and crippled children</li>
          <li>maternal and child welfare</li>
          <li>public health</li>
          <li>unemployment compensation</li>
        </ul>
      </div>,
      '1935',
    ],
  ],
};
