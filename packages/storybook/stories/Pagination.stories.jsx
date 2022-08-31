import React, { useState } from 'react';
import Pagination from '../../react-components/src/components/Pagination/Pagination';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Deprecated/Pagination - React',
  component: Pagination,
  parameters: {
    componentSubtitle: 'Pagination React component',
    docs: {
      page: () => <StoryDocs componentName="Pagination - React" />,
    },
  },
};

const Template = args => {
  const [page, setPage] = useState(args.page);
  const onPageSelect = pageNumber => setPage(pageNumber);
  return <Pagination {...args} page={page} onPageSelect={onPageSelect} />;
};

const defaultArgs = {
  page: 3,
  pages: 5,
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };

export const ShowLastPage = Template.bind(null);
ShowLastPage.args = { ...defaultArgs, pages: 100, showLastPage: true };
