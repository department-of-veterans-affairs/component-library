import React, { useState } from 'react';
import Pagination from './Pagination';

export default {
  title: 'Library/Pagination',
  component: Pagination,
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

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

export const ShowLastPage = Template.bind({});
ShowLastPage.args = { ...defaultArgs, pages: 100, showLastPage: true };
