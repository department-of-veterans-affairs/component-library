import React, { useState } from 'react';
import { VaPagination } from "@department-of-veterans-affairs/component-library/dist/react-bindings";
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const tableDocs = getWebComponentDocs('va-table');

export default {
  title: `Components/Table`,
  id: 'components/va-table',
  parameters: {
    componentSubtitle: 'va-table web component',
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
          {columns.map((col, i) => (
            <span key={`header-default-${i}`}>{col}</span>
          ))}
        </va-table-row>

        {rows.map((row, index) => (
          <va-table-row key={`row-default-${index}`}>
            {row.map((item, index2) => (
              <span key={`row-item-default-${index2}`}>{item}</span>
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
  const {
    'table-title': tableTitle,
    'sort-column': sortColumn,
    descending,
    rows = paginationData,
  } = args;

  const columns = ['Date', 'Amount', 'Type', 'Method', 'Bank', 'Account'];

  const MAX_PAGE_LIST_LENGTH = 10; // The maximum number of pages to show at once
  const MAX_ROWS = 5;

  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  const [currentData, setCurrentData] = useState(paginate(rows, MAX_ROWS, 1));
  const [currentPage, setCurrentPage] = useState(1);


  function onPageChange (page) {
    setCurrentData(paginate(rows, MAX_ROWS, page));
    setCurrentPage(page);
  }

  const numPages = Math.ceil(rows.length / MAX_ROWS);

  return (
    <main>
      <va-table
        table-title={tableTitle}
        descending={descending}
      >
        <va-table-row slot="headers">
          {columns.map((col, index) => (
            <span key={`table-example-${index}`}>{col}</span>
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
        onPageSelect={(e) => onPageChange(e.detail.page)}
        page={currentPage}
        pages={numPages}
        maxPageListLength={MAX_PAGE_LIST_LENGTH}
        showLastPage
      />
    </main>
  );
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

export const WithPagination = Pagination.bind(null);
Default.args = {
  ...defaultArgs,
};