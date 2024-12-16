import React, { useState } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { VaPagination } from '@department-of-veterans-affairs/component-library/dist/react-bindings';

const vaTableDocs = getWebComponentDocs('va-table');

export default {
  title: 'Components/Table USWDS',
  id: 'uswds/va-table',
  parameters: {
    componentSubtitle: 'va-table web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={vaTableDocs} />,
    },
  },
};

const defaultColumns = ['Document title', 'Description', 'Year'];
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
    'table-type': tableType,
    rows = data,
    sortable,
    columns,
    scrollable,
    striped,
  } = args;

  return (
    <va-table
      scrollable={scrollable}
      table-title={tableTitle}
      stacked={args.stacked}
      table-type={tableType}
      sortable={!!sortable}
      striped={striped}
    >
      <va-table-row>
        {columns.map((col, i) => (
          <span key={`header-default-${i}`}>{col}</span>
        ))}
      </va-table-row>

      {rows.map((row, index) => (
        <va-table-row key={`row-default-${index}`}>
          {row.map((item, index2) => (
            <span key={`cell-default-${index2}`}>{item}</span>
          ))}
        </va-table-row>
      ))}
    </va-table>
  );
};

const CustomComponentsTemplate = args => {
  const { 'table-title': tableTitle, rows, columns } = args;
  return (
    <va-table table-title={tableTitle}>
      <va-table-row>
        {columns.map((col, i) => (
          <span key={`header-default-${i}`}>{col}</span>
        ))}
      </va-table-row>

      {rows.map((row, index) => (
        <va-table-row key={`row-default-${index}`}>
          {row.map((item, index2) => (
            <span key={`cell-default-${index2}`}>{item}</span>
          ))}
        </va-table-row>
      ))}

      <va-table-row>
        <span>
          <va-link
            text="Social Security"
            href="https://www.ssa.gov/history/35act.html"
          />
        </span>
        <span>
          <div>
            <div>
              An act to provide for the general welfare by establishing a system
              of Federal old-age benefits. Enables provisions for:
            </div>
            <ul>
              <li>aged persons</li>
              <li>blind persons</li>
              <li>dependent and crippled children</li>
              <li>maternal and child welfare</li>
              <li>public health</li>
              <li>unemployment compensation</li>
            </ul>
          </div>
        </span>
        <span>1935</span>
      </va-table-row>
    </va-table>
  );
};

const paginationData = [
  [
    '04/05/2019',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
  [
    '03/05/2019',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
  [
    '02/05/2019',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
  [
    '01/05/2019',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
  [
    '12/05/2018',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
  [
    '11/05/2018',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
  [
    '10/05/2018',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
  [
    '09/05/2018',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
  [
    '08/05/2018',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
  [
    '07/05/2018',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
  [
    '06/05/2018',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
  [
    '05/05/2018',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
  [
    '04/05/2018',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
  [
    '03/05/2018',
    '$3,261.10',
    'Compensation & Pension - Recurring',
    'Direct Deposit',
    'BANK OF AMERICA, N.A.',
    '**3456',
  ],
];

const Pagination = args => {
  const { 'table-title': tableTitle, rows, scrollable } = args;

  const columns = ['Date', 'Amount', 'Type', 'Method', 'Bank', 'Account'];

  const MAX_PAGE_LIST_LENGTH = 10; // The maximum number of pages to show at once
  const MAX_ROWS = 5;

  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  const [currentData, setCurrentData] = useState(paginate(rows, MAX_ROWS, 1));
  const [currentPage, setCurrentPage] = useState(1);

  function onPageChange(page) {
    setCurrentData(paginate(rows, MAX_ROWS, page));
    setCurrentPage(page);
  }

  const numPages = Math.ceil(rows.length / MAX_ROWS);

  return (
    <main>
      <va-table table-title={tableTitle} scrollable={scrollable}>
        <va-table-row>
          {columns.map((col, index) => (
            <span key={`table-header-${index}`}>{col}</span>
          ))}
        </va-table-row>

        {currentData.map((row, i) => (
          <va-table-row key={`table-example-${i}`}>
            {row.map(item => (
              <span key={`${item}-${i}`}>{item}</span>
            ))}
          </va-table-row>
        ))}
      </va-table>
      <VaPagination
        onPageSelect={e => onPageChange(e.detail.page)}
        page={currentPage}
        pages={numPages}
        maxPageListLength={MAX_PAGE_LIST_LENGTH}
        showLastPage
      />
    </main>
  );
};

const missingData = [
  ['A document', '', ''],
  [
    'Bill of Rights',
    'The first ten ammendements of the U.S. Constitution guaranteeing rights and freedoms',
    '1791',
  ],
];

export const Default = Template.bind(null);
Default.args = {
  'table-title': 'This is a borderless table.',
  'rows': data,
  'columns': defaultColumns,
};
Default.argTypes = propStructure(vaTableDocs);

export const Bordered = Template.bind(null);
Bordered.args = {
  'table-title': 'This is a stacked bordered table.',
  'table-type': 'bordered',
  'rows': data,
  'columns': defaultColumns,
};
Bordered.argTypes = propStructure(vaTableDocs);

export const NonStacked = Template.bind(null);
NonStacked.args = {
  'table-title':
    'This table is not stacked. It will not change on a mobile screen.',
  'stacked': false,
  'rows': data,
  'columns': defaultColumns,
};
NonStacked.argTypes = propStructure(vaTableDocs);

export const WithCustomMarkup = CustomComponentsTemplate.bind(null);
WithCustomMarkup.args = {
  'table-title': 'This table has custom markup in some of its cells.',
  'rows': data,
  'columns': defaultColumns,
};

export const WithPagination = Pagination.bind(null);
WithPagination.args = {
  'table-title': 'This table uses pagination.',
  'rows': paginationData,
  'scrollable': true,
};

export const WithMissingData = Template.bind(null);
WithMissingData.args = {
  'table-title': 'This table has some cells without data',
  'rows': missingData,
  'columns': defaultColumns,
};

const sortColumns = [
  'Integer/Float',
  'Percent',
  'Currency',
  'Ordinal mixed',
  'Ordinal',
  'Month only',
  'Full date',
  'Alphabetical',
];

const sortData = [
  [
    '3',
    '60%',
    '$2,500',
    '4th',
    'Ninth',
    'August',
    'June 3, 1903',
    'Lorem ipsum dolor sit,',
  ],
  [
    '8.9',
    '1%',
    '$17,000',
    '3rd',
    'Second',
    'February',
    'October 25, 1415',
    'amet consectetur adipisicing elit.',
  ],
  [
    '-5',
    '60.01%',
    '$100,000',
    '8th',
    'Fifth',
    'November',
    'December 10, 1621',
    'Alias nam eum minima',
  ],
  [
    '99',
    '44%',
    '$1,100',
    '5th',
    'First',
    'April',
    'September 30, 1885',
    'delectus explicabo',
  ],
];

export const Sortable = Template.bind(null);
Sortable.args = {
  'table-title': 'This is a sortable table',
  'rows': sortData,
  'columns': sortColumns,
  'sortable': true,
  'scrollable': true,
};

export const Striped = Template.bind(null);
Striped.args = {
  'table-title': 'This is a striped table.',
  'rows': data,
  'columns': defaultColumns,
  'striped': true,
  'table-type': 'bordered',
};

export const Scrollable = Template.bind(null);
Scrollable.args = {
  'table-title': 'This is a scrollable table.',
  'rows': data,
  'columns': defaultColumns,
  'scrollable': true,
  'stacked': false,
};

export const ScrollableWithStripes = Template.bind(null);
ScrollableWithStripes.args = {
  'table-title': 'This is a striped table.',
  'rows': data,
  'columns': defaultColumns,
  'striped': true,
  'table-type': 'bordered',
  'scrollable': true,
};

Default.argTypes = propStructure(vaTableDocs);
