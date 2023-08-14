import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const paginationDocs = getWebComponentDocs('va-pagination');

export default {
  title: 'USWDS/Pagination USWDS',
  id: 'uswds/va-pagination',
  parameters: {
    componentSubtitle: 'va-pagination web component',
    docs: {
      page: () => <StoryDocs data={paginationDocs} />,
    }
  }
}

const defaultArgs = {
  page: 1,
  pages: 24,
  'max-page-list-length': 7,
  unbounded: false
}

const Template = ({
  page,
  pages,
  'max-page-list-length': maxPageListLength,
  unbounded
}) => {
  return (
    <va-pagination
      page={page}
      pages={pages}
      max-page-list-length={maxPageListLength}
      uswds
      unbounded={unbounded} />
  );
}

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(paginationDocs);

