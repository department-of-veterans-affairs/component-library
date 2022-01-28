import React, { useState } from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';
import { VaPagination } from '@department-of-veterans-affairs/web-components/react-bindings';

const paginationDocs = getWebComponentDocs('va-pagination');

export default {
  title: 'Components/va-pagination',
};

const Template = args => {
  const [page, setPage] = useState(args.page);
  const handlePageSelect = pageNumber => {
    setPage(pageNumber);
  };
  return (
    <VaPagination
      page={page}
      pages={args.pages}
      pageSelect={handlePageSelect}
    />
  );
};
const defaultArgs = {
  page: 3,
  pages: 20,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(paginationDocs);
