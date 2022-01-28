import React, { useState } from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';
import { VaPagination } from '@department-of-veterans-affairs/web-components/react-bindings';

VaPagination.displayName = 'VaPagination';
const paginationDocs = getWebComponentDocs('va-pagination');

export default {
  title: 'Components/va-pagination',
};

const defaultArgs = {
  'disable-border': false,
  'page': 3,
  'pages': 5,
  'show-last-page': false,
};

const Template = ({
  'disable-border': disableBorder,
  'page': currentPage,
  pages,
  'show-last-page': showLastPage,
}) => {
  const [page, setPage] = useState(currentPage);
  const handlePageSelect = pageNumber => {
    setPage(pageNumber);
  };
  return (
    <VaPagination
      disableBorder={disableBorder}
      page={page}
      pages={pages}
      pageSelect={handlePageSelect}
      showLastPage={showLastPage}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(paginationDocs);

export const Borderless = Template.bind({});
Borderless.args = {
  ...defaultArgs,
  'disable-border': true,
};
