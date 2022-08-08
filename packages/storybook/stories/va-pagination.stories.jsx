import React, { useState } from 'react';
import { VaPagination } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaPagination.displayName = 'VaPagination';
const paginationDocs = getWebComponentDocs('va-pagination');

export default {
  title: 'Components/va-pagination',
  parameters: {
    componentSubtitle: `Pagination web component`,
    docs: {
      page: () => <StoryDocs data={paginationDocs} />,
    },
  },
};

const defaultArgs = {
  'page': 3,
  'pages': 5,
  'show-last-page': false,
};

const Template = ({
  'page': currentPage,
  pages,
  'show-last-page': showLastPage,
}) => {
  const [page, setPage] = useState(currentPage);
  const handlePageSelect = event => {
    setPage(event.detail.page);
  };
  return (
    <VaPagination
      page={page}
      pages={pages}
      onPageSelect={handlePageSelect}
      showLastPage={showLastPage}
    />
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(paginationDocs);
