import React, { useState } from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';
import { VaPagination } from '@department-of-veterans-affairs/web-components/react-bindings';

const paginationDocs = getWebComponentDocs('va-pagination');

export default {
  title: 'Components/va-pagination',
};

const Template = ({ page: currentPage, pages, showLastPage }) => {
  const [page, setPage] = useState(currentPage);
  const handlePageSelect = pageNumber => {
    setPage(pageNumber);
  };
  return (
    <VaPagination
      page={page}
      pages={pages}
      pageSelect={handlePageSelect}
      showLastPage={showLastPage}
    />
  );
};
const defaultArgs = {
  page: 3,
  pages: 5,
  showLastPage: true,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(paginationDocs);
