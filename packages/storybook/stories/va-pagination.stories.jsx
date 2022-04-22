import React, { useState } from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';
import { VaPagination } from '@department-of-veterans-affairs/web-components/react-bindings';
import { generateEventsDescription } from './events';

VaPagination.displayName = 'VaPagination';
const paginationDocs = getWebComponentDocs('va-pagination');

export default {
  title: 'Components/va-pagination',
  parameters: {
    componentSubtitle: `Pagination web component`,
    docs: {
      description: {
        component:
          `<a className="vads-c-action-link--blue" href="https://design.va.gov/components/pagination">View guidance for the Pagination component in the Design System</a>` +
          '\n' +
          generateEventsDescription(paginationDocs),
      },
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

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(paginationDocs);
